import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface FileNode {
  id: string
  name: string
  path: string
  type: 'file' | 'directory'
  children?: string[]
  parentId: string | null
  isExpanded?: boolean
  isModified?: boolean
}

export const useFileExplorerStore = defineStore('fileExplorer', () => {
  // 扁平化存储文件节点
  const files = ref<Map<string, FileNode>>(new Map())
  const selectedFileId = ref<string | null>(null)
  const searchKeyword = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性：构建树形结构
  const fileTree = computed(() => {
    const rootNodes: FileNode[] = []
    const nodeMap = new Map(files.value)

    for (const [, node] of nodeMap) {
      if (node.parentId === null) {
        rootNodes.push(buildTreeNode(node, nodeMap))
      }
    }

    return rootNodes.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name)
      }
      return a.type === 'directory' ? -1 : 1
    })
  })

  // 过滤后的文件树
  const filteredFileTree = computed(() => {
    if (!searchKeyword.value) return fileTree.value
    return filterTree(fileTree.value, searchKeyword.value.toLowerCase())
  })

  function buildTreeNode(node: FileNode, nodeMap: Map<string, FileNode>): FileNode {
    if (node.type === 'file' || !node.children) {
      return { ...node }
    }

    const children = node.children
      .map(childId => nodeMap.get(childId))
      .filter((child): child is FileNode => child !== undefined)
      .map(child => buildTreeNode(child, nodeMap))
      .sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name)
        }
        return a.type === 'directory' ? -1 : 1
      })

    return { ...node, children: children.map(c => c.id) }
  }

  function filterTree(nodes: FileNode[], keyword: string): FileNode[] {
    const result: FileNode[] = []

    for (const node of nodes) {
      const matches = node.name.toLowerCase().includes(keyword)

      if (node.type === 'directory' && node.children) {
        const nodeMap = new Map(files.value)
        const childNodes = node.children
          .map(id => nodeMap.get(id))
          .filter((n): n is FileNode => n !== undefined)
        const filteredChildren = filterTree(childNodes, keyword)

        if (matches || filteredChildren.length > 0) {
          result.push({
            ...node,
            children: filteredChildren.map(c => c.id),
            isExpanded: true,
          })
        }
      } else if (matches) {
        result.push(node)
      }
    }

    return result
  }

  // Actions
  function setFiles(fileList: FileNode[]) {
    files.value = new Map(fileList.map(f => [f.id, f]))
  }

  function selectFile(id: string | null) {
    selectedFileId.value = id
  }

  function toggleExpand(id: string) {
    const node = files.value.get(id)
    if (node && node.type === 'directory') {
      files.value.set(id, { ...node, isExpanded: !node.isExpanded })
    }
  }

  function setSearchKeyword(keyword: string) {
    searchKeyword.value = keyword
  }

  async function fetchFileTree() {
    isLoading.value = true
    error.value = null
    try {
      // TODO: 集成后端 API
      // const res = await fetch('/api/config/files')
      // const data = await res.json()
      // setFiles(data)

      // 模拟数据
      const mockData: FileNode[] = [
        {
          id: 'root',
          name: 'openclaw',
          path: '/',
          type: 'directory',
          parentId: null,
          isExpanded: true,
          children: ['agent', 'spark', 'state'],
        },
        {
          id: 'agent',
          name: '.agent',
          path: '/.agent',
          type: 'directory',
          parentId: 'root',
          children: [],
        },
        {
          id: 'spark',
          name: '.spark',
          path: '/.spark',
          type: 'directory',
          parentId: 'root',
          children: [],
        },
        {
          id: 'state',
          name: '.state',
          path: '/.state',
          type: 'directory',
          parentId: 'root',
          children: [],
        },
        {
          id: 'openclaw.json',
          name: 'openclaw.json',
          path: '/openclaw.json',
          type: 'file',
          parentId: 'root',
        },
        {
          id: 'package.json',
          name: 'package.json',
          path: '/package.json',
          type: 'file',
          parentId: 'root',
        },
        {
          id: 'README.md',
          name: 'README.md',
          path: '/README.md',
          type: 'file',
          parentId: 'root',
        },
      ]
      setFiles(mockData)
    } catch (e) {
      error.value = e instanceof Error ? e.message : '加载文件树失败'
    } finally {
      isLoading.value = false
    }
  }

  async function createFile(parentId: string, name: string, type: 'file' | 'directory') {
    // TODO: 集成后端 API
    const newId = `${Date.now()}`
    const parent = files.value.get(parentId)
    if (!parent) return

    const newNode: FileNode = {
      id: newId,
      name,
      path: `${parent.path}/${name}`,
      type,
      parentId,
      children: type === 'directory' ? [] : undefined,
    }

    files.value.set(newId, newNode)

    if (parent.children) {
      parent.children.push(newId)
      files.value.set(parentId, { ...parent })
    }

    return newNode
  }

  async function renameFile(id: string, newName: string) {
    const node = files.value.get(id)
    if (!node) return

    // TODO: 集成后端 API
    const parent = node.parentId ? files.value.get(node.parentId) : null
    const newPath = parent ? `${parent.path}/${newName}` : `/${newName}`

    files.value.set(id, { ...node, name: newName, path: newPath })
  }

  async function deleteFile(id: string) {
    const node = files.value.get(id)
    if (!node) return

    // TODO: 集成后端 API
    if (node.parentId) {
      const parent = files.value.get(node.parentId)
      if (parent && parent.children) {
        parent.children = parent.children.filter(childId => childId !== id)
        files.value.set(node.parentId, { ...parent })
      }
    }

    files.value.delete(id)
  }

  function setFileModified(id: string, isModified: boolean) {
    const node = files.value.get(id)
    if (node && node.type === 'file') {
      files.value.set(id, { ...node, isModified })
    }
  }

  return {
    files,
    selectedFileId,
    searchKeyword,
    isLoading,
    error,
    fileTree,
    filteredFileTree,
    selectFile,
    toggleExpand,
    setSearchKeyword,
    fetchFileTree,
    createFile,
    renameFile,
    deleteFile,
    setFileModified,
  }
})

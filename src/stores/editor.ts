import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import type { editor } from 'monaco-editor'

export interface Tab {
  id: string
  name: string
  path: string
  content: string
  originalContent: string
  isModified: boolean
  isLoading?: boolean
  language?: string
}

export const useEditorStore = defineStore('editor', () => {
  const tabs = ref<Tab[]>([])
  const activeTabId = ref<string | null>(null)
  const isSaving = ref(false)
  const saveError = ref<string | null>(null)

  const activeTab = computed(() => {
    return tabs.value.find(tab => tab.id === activeTabId.value) || null
  })

  const hasUnsavedChanges = computed(() => {
    return tabs.value.some(tab => tab.isModified)
  })

  const MAX_TABS = 10

  // Actions
  function openTab(fileId: string, fileName: string, filePath: string, content: string, language?: string) {
    const existingTab = tabs.value.find(tab => tab.id === fileId)

    if (existingTab) {
      activeTabId.value = fileId
      return
    }

    if (tabs.value.length >= MAX_TABS) {
      throw new Error(`最多同时打开 ${MAX_TABS} 个文件`)
    }

    const newTab: Tab = {
      id: fileId,
      name: fileName,
      path: filePath,
      content,
      originalContent: content,
      isModified: false,
      language: language || detectLanguage(fileName),
    }

    tabs.value.push(newTab)
    activeTabId.value = fileId
    persistTabs()
  }

  function closeTab(tabId: string) {
    const index = tabs.value.findIndex(tab => tab.id === tabId)
    if (index === -1) return

    tabs.value.splice(index, 1)

    if (activeTabId.value === tabId) {
      if (tabs.value.length > 0) {
        const newIndex = Math.min(index, tabs.value.length - 1)
        activeTabId.value = tabs.value[newIndex].id
      } else {
        activeTabId.value = null
      }
    }

    persistTabs()
  }

  function closeOtherTabs(keepTabId: string) {
    tabs.value = tabs.value.filter(tab => tab.id === keepTabId)
    activeTabId.value = keepTabId
    persistTabs()
  }

  function closeTabsToRight(tabId: string) {
    const index = tabs.value.findIndex(tab => tab.id === tabId)
    if (index === -1) return

    const removedTabs = tabs.value.splice(index + 1)

    if (activeTabId.value && removedTabs.some(tab => tab.id === activeTabId.value)) {
      activeTabId.value = tabId
    }

    persistTabs()
  }

  function closeAllTabs() {
    tabs.value = []
    activeTabId.value = null
    persistTabs()
  }

  function setActiveTab(tabId: string) {
    if (tabs.value.some(tab => tab.id === tabId)) {
      activeTabId.value = tabId
      persistTabs()
    }
  }

  function updateTabContent(tabId: string, content: string) {
    const tab = tabs.value.find(t => t.id === tabId)
    if (!tab) return

    tab.content = content
    tab.isModified = content !== tab.originalContent
  }

  function markTabSaved(tabId: string) {
    const tab = tabs.value.find(t => t.id === tabId)
    if (!tab) return

    tab.originalContent = tab.content
    tab.isModified = false
  }

  async function saveActiveTab(): Promise<boolean> {
    const tab = activeTab.value
    if (!tab || !tab.isModified) return true

    isSaving.value = true
    saveError.value = null

    try {
      // TODO: 集成后端 API
      // const res = await fetch(`/api/config/files${tab.path}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ content: tab.content }),
      // })
      // if (!res.ok) throw new Error('保存失败')

      // 模拟保存延迟
      await new Promise(resolve => setTimeout(resolve, 300))

      markTabSaved(tab.id)
      return true
    } catch (e) {
      saveError.value = e instanceof Error ? e.message : '保存失败'
      return false
    } finally {
      isSaving.value = false
    }
  }

  function persistTabs() {
    const data = {
      tabs: tabs.value.map(tab => ({
        id: tab.id,
        name: tab.name,
        path: tab.path,
        language: tab.language,
      })),
      activeTabId: activeTabId.value,
    }
    localStorage.setItem('openclaw_config_tabs', JSON.stringify(data))
  }

  function restoreTabs() {
    try {
      const data = localStorage.getItem('openclaw_config_tabs')
      if (!data) return

      const parsed = JSON.parse(data)
      // 只恢复标签列表，不恢复内容，需要重新加载
      tabs.value = parsed.tabs.map((t: any) => ({
        ...t,
        content: '',
        originalContent: '',
        isModified: false,
        isLoading: true,
      }))
      activeTabId.value = parsed.activeTabId
    } catch {
      // 忽略解析错误
    }
  }

  function detectLanguage(fileName: string): string {
    if (fileName.endsWith('.json')) return 'json'
    if (fileName.endsWith('.yaml') || fileName.endsWith('.yml')) return 'yaml'
    if (fileName.endsWith('.md')) return 'markdown'
    if (fileName.endsWith('.ts')) return 'typescript'
    if (fileName.endsWith('.js')) return 'javascript'
    return 'plaintext'
  }

  return {
    tabs,
    activeTabId,
    activeTab,
    isSaving,
    saveError,
    hasUnsavedChanges,
    openTab,
    closeTab,
    closeOtherTabs,
    closeTabsToRight,
    closeAllTabs,
    setActiveTab,
    updateTabContent,
    saveActiveTab,
    restoreTabs,
  }
})

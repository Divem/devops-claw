import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProjectStore } from '@/stores/project'

const mockProject = {
  id: '1',
  name: '测试项目',
  botName: '测试机器人',
  avatarUrl: '/avatars/avatar-1.png',
  status: 'deployed' as const,
  createdAt: '2026-03-26',
  botConfigured: true,
}

describe('useProjectStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('初始状态为 loading', () => {
    const store = useProjectStore()
    expect(store.pageState).toBe('loading')
    expect(store.modalState).toBe('none')
    expect(store.project).toBeNull()
  })

  it('setProject 设置项目后 pageState 变为 has_project', () => {
    const store = useProjectStore()
    store.setProject(mockProject)
    expect(store.pageState).toBe('has_project')
    expect(store.project?.name).toBe('测试项目')
  })

  it('setEmpty 清空项目后 pageState 变为 empty', () => {
    const store = useProjectStore()
    store.setProject(mockProject)
    store.setEmpty()
    expect(store.pageState).toBe('empty')
    expect(store.project).toBeNull()
  })

  it('openCreateModal 打开创建弹窗', () => {
    const store = useProjectStore()
    store.openCreateModal()
    expect(store.modalState).toBe('create')
  })

  it('startProgress 切换到进度弹窗并初始化步骤', () => {
    const store = useProjectStore()
    store.startProgress()
    expect(store.modalState).toBe('progress')
    expect(store.steps).toHaveLength(3)
    expect(store.steps[0].status).toBe('pending')
  })

  it('updateStep 更新步骤状态', () => {
    const store = useProjectStore()
    store.startProgress()
    store.updateStep('vm', 'running')
    expect(store.steps[0].status).toBe('running')
  })

  it('updateStep 更新步骤耗时', () => {
    const store = useProjectStore()
    store.startProgress()
    store.updateStep('vm', 'done', 2)
    expect(store.steps[0].status).toBe('done')
    expect(store.steps[0].elapsed).toBe(2)
  })

  it('showComplete 切换到完成弹窗', () => {
    const store = useProjectStore()
    store.showComplete()
    expect(store.modalState).toBe('complete')
  })

  it('openDeleteModal 打开删除弹窗', () => {
    const store = useProjectStore()
    store.openDeleteModal()
    expect(store.modalState).toBe('delete')
  })

  it('closeModal 关闭弹窗', () => {
    const store = useProjectStore()
    store.openCreateModal()
    store.closeModal()
    expect(store.modalState).toBe('none')
  })

  it('updateBotConfig 成功时更新 appId', async () => {
    const store = useProjectStore()
    store.setProject(mockProject)

    const mockResponse = { appId: 'cli_xxx', appSecret: undefined }
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })
    vi.stubGlobal('fetch', fetchMock)

    const result = await store.updateBotConfig({ appId: 'cli_xxx', appSecret: 'secret123' })
    expect(result).toBe(true)
    expect(store.project?.appId).toBe('cli_xxx')
  })

  it('updateBotConfig 失败时返回 false', async () => {
    const store = useProjectStore()
    store.setProject(mockProject)

    const fetchMock = vi.fn().mockResolvedValue({ ok: false })
    vi.stubGlobal('fetch', fetchMock)

    const result = await store.updateBotConfig({ appId: 'cli_xxx', appSecret: 'secret123' })
    expect(result).toBe(false)
  })

  it('updateBotConfig 无项目时返回 false', async () => {
    const store = useProjectStore()
    const result = await store.updateBotConfig({ appId: 'cli_xxx', appSecret: 'secret123' })
    expect(result).toBe(false)
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProjectStore } from '@/stores/project'

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
    store.setProject({
      id: '1',
      name: '测试项目',
      botName: '测试机器人',
      avatarUrl: '/avatars/avatar-1.png',
      status: 'deployed',
      createdAt: '2026-03-26',
    })
    expect(store.pageState).toBe('has_project')
    expect(store.project?.name).toBe('测试项目')
  })

  it('setEmpty 清空项目后 pageState 变为 empty', () => {
    const store = useProjectStore()
    store.setProject({
      id: '1',
      name: '测试项目',
      botName: '测试机器人',
      avatarUrl: '/avatars/avatar-1.png',
      status: 'deployed',
      createdAt: '2026-03-26',
    })
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
})

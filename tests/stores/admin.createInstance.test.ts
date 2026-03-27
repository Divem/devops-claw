import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAdminStore } from '@/stores/admin'

describe('useAdminStore.createInstance', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('创建成功时返回 ok:true 并刷新列表', async () => {
    const mockFetch = vi.mocked(fetch)
    // POST /api/admin/instances 成功
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'inst-new', name: '测试实例', ownerId: 'u-001' }),
    } as Response)
    // fetchInstances 刷新
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [], total: 0, page: 1, pageSize: 10 }),
    } as Response)

    const store = useAdminStore()
    const result = await store.createInstance({ name: '测试实例', ownerId: 'u-001' })

    expect(result.ok).toBe(true)
    expect(mockFetch).toHaveBeenCalledWith('/api/admin/instances', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ name: '测试实例', ownerId: 'u-001' }),
    }))
  })

  it('创建失败时返回 ok:false 和错误信息', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: '实例名称已存在' }),
    } as Response)

    const store = useAdminStore()
    const result = await store.createInstance({ name: '重复实例', ownerId: 'u-001' })

    expect(result.ok).toBe(false)
    expect(result.error).toBe('实例名称已存在')
  })

  it('网络异常时返回 ok:false 和默认错误信息', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const store = useAdminStore()
    const result = await store.createInstance({ name: '测试实例', ownerId: 'u-001' })

    expect(result.ok).toBe(false)
    expect(result.error).toBe('创建失败，请稍后重试')
  })
})

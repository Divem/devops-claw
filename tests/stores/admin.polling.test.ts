import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAdminStore } from '@/stores/admin'

describe('useAdminStore - progress polling', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('startProgressPolling 初始化三步骤，第一步为 running', () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValue({ ok: false } as Response)

    const store = useAdminStore()
    store.startProgressPolling('inst-123', true)

    expect(store.createProgress).toHaveLength(3)
    expect(store.createProgress[0].status).toBe('running')
    expect(store.createProgress[1].status).toBe('pending')
    expect(store.createProgress[2].status).toBe('pending')
    expect(store.createProgressDone).toBe(false)

    store.stopProgressPolling()
  })

  it('stopProgressPolling 停止轮询', () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValue({ ok: false } as Response)

    const store = useAdminStore()
    store.startProgressPolling('inst-123', true)
    store.stopProgressPolling()

    vi.advanceTimersByTime(5000)
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('轮询收到 done:true 后自动停止并更新 createProgressDone', async () => {
    const mockFetch = vi.mocked(fetch)
    // 第一次轮询返回未完成
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        steps: [
          { key: 'vm', label: '启动云端电脑', status: 'done', elapsed: 8 },
          { key: 'openclaw', label: '安装 OpenClaw', status: 'running' },
          { key: 'feishu', label: '配置飞书连接', status: 'pending' },
        ],
        done: false,
      }),
    } as Response)
    // 第二次轮询返回完成
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        steps: [
          { key: 'vm', label: '启动云端电脑', status: 'done', elapsed: 8 },
          { key: 'openclaw', label: '安装 OpenClaw', status: 'done', elapsed: 22 },
          { key: 'feishu', label: '配置飞书连接', status: 'done', elapsed: 6 },
        ],
        done: true,
      }),
    } as Response)
    // fetchInstances after done
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ items: [], total: 0, page: 1, pageSize: 10 }),
    } as Response)

    const store = useAdminStore()
    store.startProgressPolling('inst-123', true)

    // 触发第一次轮询
    await vi.advanceTimersByTimeAsync(1500)
    expect(store.createProgressDone).toBe(false)

    // 触发第二次轮询
    await vi.advanceTimersByTimeAsync(1500)
    expect(store.createProgressDone).toBe(true)
  })
})

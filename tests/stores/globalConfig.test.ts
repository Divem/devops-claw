import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGlobalConfigStore } from '@/stores/globalConfig'

vi.mock('@/stores/admin', () => ({
  useAdminStore: () => ({
    fetchInstances: vi.fn().mockResolvedValue(undefined),
  }),
}))

describe('useGlobalConfigStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('初始状态正确', () => {
    const store = useGlobalConfigStore()
    expect(store.isLoading).toBe(false)
    expect(store.isSaving).toBe(false)
    expect(store.isPublishing).toBe(false)
    expect(store.error).toBeNull()
    expect(store.lastSavedAt).toBeNull()
  })

  it('fetchGlobalConfig 加载期间 isLoading 为 true，完成后为 false', async () => {
    const store = useGlobalConfigStore()
    const promise = store.fetchGlobalConfig()
    expect(store.isLoading).toBe(true)
    await promise
    expect(store.isLoading).toBe(false)
  })

  it('fetchGlobalConfig 成功后填充配置数据', async () => {
    const store = useGlobalConfigStore()
    await store.fetchGlobalConfig()
    expect(store.config.model.provider).toBe('anthropic')
    expect(store.config.model.defaultModel).toBe('claude-sonnet-4-6')
    expect(store.config.files.length).toBeGreaterThan(0)
  })

  it('saveGlobalConfig 成功后更新 lastSavedAt', async () => {
    const store = useGlobalConfigStore()
    await store.fetchGlobalConfig()
    const newConfig = { ...store.config, model: { ...store.config.model, maxTokens: 4096 } }
    await store.saveGlobalConfig(newConfig)
    expect(store.lastSavedAt).not.toBeNull()
    expect(store.config.model.maxTokens).toBe(4096)
    expect(store.isSaving).toBe(false)
  })

  it('publishConfig 成功完成', async () => {
    const store = useGlobalConfigStore()
    await store.fetchGlobalConfig()
    await store.publishConfig({ strategy: 'force', scope: 'all' })
    expect(store.isPublishing).toBe(false)
    expect(store.error).toBeNull()
  })

  it('publishConfig 支持指定实例范围', async () => {
    const store = useGlobalConfigStore()
    await store.fetchGlobalConfig()
    await store.publishConfig({
      strategy: 'restart',
      scope: 'selected',
      selectedInstanceIds: ['inst-1', 'inst-2'],
    })
    expect(store.isPublishing).toBe(false)
  })
})

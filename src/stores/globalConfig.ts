import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GlobalConfig, GlobalConfigPublishRequest } from '@/types/admin'
import { useAdminStore } from './admin'

const defaultConfig: GlobalConfig = {
  model: {
    provider: 'anthropic',
    apiKey: '',
    baseUrl: '',
    defaultModel: 'claude-sonnet-4-6',
    maxTokens: 8192,
    temperature: 0.7,
  },
  files: [],
}

// Mock 已保存的配置
const mockSavedConfig: GlobalConfig = {
  model: {
    provider: 'anthropic',
    apiKey: 'sk-ant-api03-mock-key-1234567890abcdef',
    baseUrl: '',
    defaultModel: 'claude-sonnet-4-6',
    maxTokens: 8192,
    temperature: 0.7,
  },
  files: [
    {
      name: 'IDENTITY.md',
      content: '# Identity\n\n你是一个专业的 DevOps AI 助手，专注于帮助企业内部开发和运维。',
    },
    {
      name: 'USER.md',
      content: '# User Preferences\n\n- 语言偏好：中文\n- 时区：Asia/Shanghai',
    },
  ],
}

export const useGlobalConfigStore = defineStore('globalConfig', () => {
  const config = ref<GlobalConfig>({ ...defaultConfig, model: { ...defaultConfig.model }, files: [] })
  const isLoading = ref(false)
  const isSaving = ref(false)
  const isPublishing = ref(false)
  const error = ref<string | null>(null)
  const lastSavedAt = ref<string | null>(null)

  async function fetchGlobalConfig() {
    isLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      config.value = {
        model: { ...mockSavedConfig.model },
        files: mockSavedConfig.files.map(f => ({ ...f })),
      }
    } catch (e) {
      error.value = '获取全局配置失败，请稍后重试'
    } finally {
      isLoading.value = false
    }
  }

  async function saveGlobalConfig(newConfig: Partial<GlobalConfig>) {
    isSaving.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      if (newConfig.model) config.value.model = { ...newConfig.model }
      if (newConfig.files) config.value.files = newConfig.files.map(f => ({ ...f }))
      lastSavedAt.value = new Date().toISOString()
    } catch (e) {
      error.value = '保存配置失败，请稍后重试'
      throw e
    } finally {
      isSaving.value = false
    }
  }

  async function publishConfig(_request: GlobalConfigPublishRequest) {
    isPublishing.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      const adminStore = useAdminStore()
      await adminStore.fetchInstances()
    } catch (e) {
      error.value = '发布配置失败，请稍后重试'
      throw e
    } finally {
      isPublishing.value = false
    }
  }

  return {
    config,
    isLoading,
    isSaving,
    isPublishing,
    error,
    lastSavedAt,
    fetchGlobalConfig,
    saveGlobalConfig,
    publishConfig,
  }
})

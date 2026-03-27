import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const lastSavedAt = ref<Date | null>(null)

  async function fetchFileContent(path: string): Promise<string> {
    isLoading.value = true
    error.value = null

    try {
      // TODO: 集成后端 API
      // const res = await fetch(`/api/config/files${path}`)
      // if (!res.ok) throw new Error('加载失败')
      // const data = await res.json()
      // return data.content

      // 模拟数据
      await new Promise(resolve => setTimeout(resolve, 200))

      if (path.endsWith('openclaw.json')) {
        return JSON.stringify({
          meta: {
            lastTouchedVersion: '2026.3.8',
            lastTouchedAt: '2026-03-22T04:09:20.911Z',
          },
          wizard: {
            lastRunAt: '2026-03-05T11:15:21.053Z',
            lastRunVersion: '2026.3.2',
            lastRunCommand: 'onboard',
            lastRunMode: 'local',
          },
          update: {
            checkOnStart: false,
          },
          browser: {
            enabled: true,
            color: '#00AA00',
            executablePath: '/usr/bin/chromium-browser',
            headless: true,
            noSandbox: true,
          },
        }, null, 2)
      }

      if (path.endsWith('package.json')) {
        return JSON.stringify({
          name: 'openclaw-project',
          version: '1.0.0',
          description: 'OpenClaw configuration project',
        }, null, 2)
      }

      return ''
    } catch (e) {
      error.value = e instanceof Error ? e.message : '加载文件内容失败'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function saveFileContent(_path: string, _content: string): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      // TODO: 集成后端 API
      // const res = await fetch(`/api/config/files${path}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ content }),
      // })
      // if (!res.ok) throw new Error('保存失败')

      // 模拟保存延迟
      await new Promise(resolve => setTimeout(resolve, 300))

      lastSavedAt.value = new Date()
    } catch (e) {
      error.value = e instanceof Error ? e.message : '保存文件失败'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    lastSavedAt,
    fetchFileContent,
    saveFileContent,
  }
})

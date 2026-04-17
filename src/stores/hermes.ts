import { defineStore } from 'pinia'
import { ref } from 'vue'
import { updateHermesBotConfig as mockUpdateHermesBotConfig } from '@/mocks/hermesData'
import type {
  HermesPageState,
  HermesModalState,
  HermesProject,
  HermesStepInfo,
  HermesStepStatus,
  HermesProgressStep,
  UpdateHermesBotConfigPayload,
} from '@/types/hermes'

export const useHermesStore = defineStore('hermes', () => {
  const pageState = ref<HermesPageState>('loading')
  const modalState = ref<HermesModalState>('none')
  const project = ref<HermesProject | null>(null)
  const steps = ref<HermesStepInfo[]>([])
  const skippedBotConfig = ref(false)

  function initSteps(): HermesStepInfo[] {
    return [
      { key: 'vm', label: '启动云端电脑', status: 'pending' },
      { key: 'hermes', label: '部署 Hermes', status: 'pending' },
      { key: 'feishu', label: '连接飞书', status: 'pending' },
    ]
  }

  function setProject(p: HermesProject) {
    project.value = p
    pageState.value = 'has_project'
  }

  function setEmpty() {
    project.value = null
    pageState.value = 'empty'
  }

  function openCreateModal() {
    modalState.value = 'create'
  }

  function startProgress() {
    modalState.value = 'progress'
    steps.value = initSteps()
  }

  function updateStep(key: HermesProgressStep, status: HermesStepStatus, elapsed?: number) {
    const step = steps.value.find((s) => s.key === key)
    if (step) {
      step.status = status
      if (elapsed !== undefined) {
        step.elapsed = elapsed
      }
    }
  }

  function showComplete() {
    modalState.value = 'complete'
  }

  function openDeleteModal() {
    modalState.value = 'delete'
  }

  function closeModal() {
    modalState.value = 'none'
  }

  function setSkippedBotConfig(value: boolean) {
    skippedBotConfig.value = value
  }

  function showAdmin() {
    if (project.value) {
      pageState.value = 'admin'
    }
  }

  function goHome() {
    if (project.value) {
      pageState.value = 'has_project'
    } else {
      pageState.value = 'empty'
    }
  }

  async function updateBotConfig(payload: UpdateHermesBotConfigPayload): Promise<boolean> {
    if (!project.value) return false
    try {
      const data = mockUpdateHermesBotConfig(payload.appId, payload.appSecret)
      if (!data) return false
      project.value.appId = data.appId
      return true
    } catch {
      return false
    }
  }

  return {
    pageState,
    modalState,
    project,
    steps,
    skippedBotConfig,
    setProject,
    setEmpty,
    openCreateModal,
    startProgress,
    updateStep,
    showComplete,
    openDeleteModal,
    closeModal,
    showAdmin,
    goHome,
    updateBotConfig,
    setSkippedBotConfig,
  }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiFetch from '@/api/client'
import type {
  PageState,
  ModalState,
  Project,
  StepInfo,
  StepStatus,
  ProgressStep,
  UpdateBotConfigPayload,
} from '@/types/project'

export const useProjectStore = defineStore('project', () => {
  const pageState = ref<PageState>('loading')
  const modalState = ref<ModalState>('none')
  const project = ref<Project | null>(null)
  const steps = ref<StepInfo[]>([])
  const skippedBotConfig = ref(false)

  function initSteps(): StepInfo[] {
    return [
      { key: 'vm', label: '启动云端电脑', status: 'pending' },
      { key: 'openclaw', label: '启动 OpenClaw', status: 'pending' },
      { key: 'feishu', label: '连接飞书', status: 'pending' },
    ]
  }

  function setProject(p: Project) {
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

  function updateStep(key: ProgressStep, status: StepStatus, elapsed?: number) {
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

  async function updateBotConfig(payload: UpdateBotConfigPayload): Promise<boolean> {
    if (!project.value) return false
    try {
      const res = await apiFetch(`/api/project/${project.value.id}/bot-config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
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

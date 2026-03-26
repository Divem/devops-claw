import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  PageState,
  ModalState,
  Project,
  StepInfo,
  StepStatus,
  ProgressStep,
} from '@/types/project'

export const useProjectStore = defineStore('project', () => {
  const pageState = ref<PageState>('loading')
  const modalState = ref<ModalState>('none')
  const project = ref<Project | null>(null)
  const steps = ref<StepInfo[]>([])

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

  return {
    pageState,
    modalState,
    project,
    steps,
    setProject,
    setEmpty,
    openCreateModal,
    startProgress,
    updateStep,
    showComplete,
    openDeleteModal,
    closeModal,
  }
})

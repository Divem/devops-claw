import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type {
  Instance,
  InstanceDetail,
  InstanceFilters,
  InstanceAction,
  CreateInstanceRequest,
  InstanceCreateStep,
  Approval,
  ApprovalStatus,
} from '@/types/admin'
import {
  getInstances,
  getInstanceDetail,
  executeInstanceAction,
  createInstance as mockCreateInstance,
  getInstanceCreateProgress,
  getApprovals,
  approveApproval,
} from '@/mocks/adminData'

export const useAdminStore = defineStore('admin', () => {
  // --- 实例管理 ---
  const instances = ref<Instance[]>([])
  const instanceTotal = ref(0)
  const instancePage = ref(1)
  const instancePageSize = ref(10)
  const instanceLoading = ref(false)
  const selectedInstance = ref<InstanceDetail | null>(null)
  const drawerVisible = ref(false)

  const filters = reactive<InstanceFilters>({
    search: '',
    status: [],
    sort: 'createdAt',
    order: 'desc',
  })

  async function fetchInstances() {
    instanceLoading.value = true
    try {
      const data = getInstances({
        search: filters.search || undefined,
        status: filters.status.length ? filters.status.join(',') : undefined,
        sort: filters.sort,
        order: filters.order,
        page: instancePage.value,
        pageSize: instancePageSize.value,
      })
      instances.value = data.items
      instanceTotal.value = data.total
    } finally {
      instanceLoading.value = false
    }
  }

  async function fetchInstanceDetail(id: string) {
    try {
      const detail = getInstanceDetail(id)
      if (detail) {
        selectedInstance.value = detail
        drawerVisible.value = true
      }
    } catch {
      // 静默失败
    }
  }

  async function executeAction(id: string, action: InstanceAction) {
    try {
      const result = executeInstanceAction(id, action)
      if (result) {
        await fetchInstances()
        if (selectedInstance.value?.id === id) {
          if (action === 'delete') {
            closeDrawer()
          } else {
            await fetchInstanceDetail(id)
          }
        }
      }
      return !!result
    } catch {
      return false
    }
  }

  async function createInstance(req: CreateInstanceRequest): Promise<{ ok: boolean; id?: string; error?: string }> {
    try {
      const data = mockCreateInstance(req.name, req.avatarUrl, req.appId, req.appSecret)
      return { ok: true, id: data.id }
    } catch {
      return { ok: false, error: '创建失败，请稍后重试' }
    }
  }

  // --- 创建进度轮询 ---
  const createProgress = ref<InstanceCreateStep[]>([])
  const createProgressDone = ref(false)
  let pollingTimer: ReturnType<typeof setInterval> | null = null

  function startProgressPolling(id: string, hasAppId: boolean) {
    createProgress.value = [
      { key: 'vm', label: '启动云端电脑', status: 'running' },
      { key: 'openclaw', label: '安装 OpenClaw', status: 'pending' },
      { key: 'feishu', label: '配置飞书连接', status: 'pending' },
    ]
    createProgressDone.value = false

    pollingTimer = setInterval(async () => {
      try {
        const data = getInstanceCreateProgress(id, hasAppId)
        createProgress.value = data.steps
        if (data.done) {
          createProgressDone.value = true
          stopProgressPolling()
          await fetchInstances()
        }
      } catch {
        // 静默失败，继续轮询
      }
    }, 1500)
  }

  function stopProgressPolling() {
    if (pollingTimer) {
      clearInterval(pollingTimer)
      pollingTimer = null
    }
  }

  function closeDrawer() {
    drawerVisible.value = false
    selectedInstance.value = null
  }

  // --- 审批管理 ---
  const approvals = ref<Approval[]>([])
  const approvalLoading = ref(false)
  const approvalTab = ref<ApprovalStatus>('all')

  async function fetchApprovals(status?: ApprovalStatus) {
    approvalLoading.value = true
    try {
      const s = status ?? approvalTab.value
      approvals.value = getApprovals(s === 'all' ? undefined : s)
    } finally {
      approvalLoading.value = false
    }
  }

  async function approveInstance(id: string): Promise<boolean> {
    try {
      const result = approveApproval(id)
      if (result) {
        await fetchApprovals()
        return true
      }
      return false
    } catch {
      return false
    }
  }

  return {
    instances,
    instanceTotal,
    instancePage,
    instancePageSize,
    instanceLoading,
    selectedInstance,
    drawerVisible,
    filters,
    fetchInstances,
    fetchInstanceDetail,
    executeAction,
    createInstance,
    createProgress,
    createProgressDone,
    startProgressPolling,
    stopProgressPolling,
    closeDrawer,
    approvals,
    approvalLoading,
    approvalTab,
    fetchApprovals,
    approveInstance,
  }
})

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
import type {
  HermesInstance,
  HermesInstanceDetail,
  HermesInstanceFilters,
  HermesInstanceAction,
  CreateHermesInstanceRequest,
  HermesInstanceCreateStep,
} from '@/types/hermes'
import {
  getInstances,
  getInstanceDetail,
  executeInstanceAction,
  createInstance as mockCreateInstance,
  getInstanceCreateProgress,
  getApprovals,
  approveApproval,
} from '@/mocks/adminData'
import {
  getHermesInstances,
  getHermesInstanceDetail,
  executeHermesInstanceAction,
  createHermesInstance as mockCreateHermesInstance,
  getHermesInstanceCreateProgress,
} from '@/mocks/hermesData'

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

  // ==================== Hermes 实例管理 ====================
  const hermesInstances = ref<HermesInstance[]>([])
  const hermesInstanceTotal = ref(0)
  const hermesInstancePage = ref(1)
  const hermesInstancePageSize = ref(10)
  const hermesInstanceLoading = ref(false)
  const hermesSelectedInstance = ref<HermesInstanceDetail | null>(null)
  const hermesDrawerVisible = ref(false)

  const hermesFilters = reactive<HermesInstanceFilters>({
    search: '',
    status: [],
    sort: 'createdAt',
    order: 'desc',
  })

  async function fetchHermesInstances() {
    hermesInstanceLoading.value = true
    try {
      const data = getHermesInstances({
        search: hermesFilters.search || undefined,
        status: hermesFilters.status.length ? hermesFilters.status.join(',') : undefined,
        sort: hermesFilters.sort,
        order: hermesFilters.order,
        page: hermesInstancePage.value,
        pageSize: hermesInstancePageSize.value,
      })
      hermesInstances.value = data.items
      hermesInstanceTotal.value = data.total
    } finally {
      hermesInstanceLoading.value = false
    }
  }

  async function fetchHermesInstanceDetail(id: string) {
    try {
      const detail = getHermesInstanceDetail(id)
      if (detail) {
        hermesSelectedInstance.value = detail
        hermesDrawerVisible.value = true
      }
    } catch {
      // 静默失败
    }
  }

  async function executeHermesAction(id: string, action: HermesInstanceAction) {
    try {
      const result = executeHermesInstanceAction(id, action)
      if (result) {
        await fetchHermesInstances()
        if (hermesSelectedInstance.value?.id === id) {
          if (action === 'delete') {
            closeHermesDrawer()
          } else {
            await fetchHermesInstanceDetail(id)
          }
        }
      }
      return !!result
    } catch {
      return false
    }
  }

  async function createHermesInstanceAction(req: CreateHermesInstanceRequest): Promise<{ ok: boolean; id?: string; error?: string }> {
    try {
      const data = mockCreateHermesInstance(req.name, req.avatarUrl, req.appId, req.appSecret)
      return { ok: true, id: data.id }
    } catch {
      return { ok: false, error: '创建失败，请稍后重试' }
    }
  }

  const hermesCreateProgress = ref<HermesInstanceCreateStep[]>([])
  const hermesCreateProgressDone = ref(false)
  let hermesPollingTimer: ReturnType<typeof setInterval> | null = null

  function startHermesProgressPolling(id: string, hasAppId: boolean) {
    hermesCreateProgress.value = [
      { key: 'vm', label: '启动云端电脑', status: 'running' },
      { key: 'hermes', label: '部署 Hermes', status: 'pending' },
      { key: 'feishu', label: '配置飞书连接', status: 'pending' },
    ]
    hermesCreateProgressDone.value = false

    hermesPollingTimer = setInterval(async () => {
      try {
        const data = getHermesInstanceCreateProgress(id, hasAppId)
        hermesCreateProgress.value = data.steps
        if (data.done) {
          hermesCreateProgressDone.value = true
          stopHermesProgressPolling()
          await fetchHermesInstances()
        }
      } catch {
        // 静默失败，继续轮询
      }
    }, 1500)
  }

  function stopHermesProgressPolling() {
    if (hermesPollingTimer) {
      clearInterval(hermesPollingTimer)
      hermesPollingTimer = null
    }
  }

  function closeHermesDrawer() {
    hermesDrawerVisible.value = false
    hermesSelectedInstance.value = null
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
    // Hermes
    hermesInstances,
    hermesInstanceTotal,
    hermesInstancePage,
    hermesInstancePageSize,
    hermesInstanceLoading,
    hermesSelectedInstance,
    hermesDrawerVisible,
    hermesFilters,
    fetchHermesInstances,
    fetchHermesInstanceDetail,
    executeHermesAction,
    createHermesInstance: createHermesInstanceAction,
    hermesCreateProgress,
    hermesCreateProgressDone,
    startHermesProgressPolling,
    stopHermesProgressPolling,
    closeHermesDrawer,
  }
})

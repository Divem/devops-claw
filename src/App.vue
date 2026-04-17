<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-dialog-provider>
      <n-message-provider>
        <!-- Admin: handled by vue-router -->
        <router-view v-if="isAdminRoute" />

      <!-- Employee side: keep existing pageState logic -->
      <template v-else>
        <!-- 落地页 -->
        <LandingPage
          v-if="showLandingPage"
          @start-deploy="handleStartDeploy"
        />

        <!-- 员工 OpenClaw 配置页面 -->
        <OpenClawAdmin
          v-else-if="store.pageState === 'admin' && store.project"
          :project="store.project"
          @back="store.goHome()"
        />

        <!-- 员工 Hermes 配置页面 -->
        <HermesAgentAdmin
          v-else-if="hermesStore.pageState === 'admin' && hermesStore.project"
          :project="hermesStore.project"
          @back="hermesStore.goHome()"
        />

        <!-- 应用主界面 -->
        <div v-else class="app">
          <AppHeader />
          <main class="app-main">
            <HeroSection />
            <n-spin v-if="store.pageState === 'loading'" size="large" />
            <template v-else>
              <CreateGuide
                v-if="!store.project && !hermesStore.project"
                @create="openTypeSelect"
              />
              <template v-else>
                <ProjectCard
                  v-if="store.project"
                  :project="store.project"
                  @config-open-claw="handleConfigOpenClaw"
                  @delete="store.openDeleteModal()"
                />
                <HermesProjectCard
                  v-if="hermesStore.project"
                  :project="hermesStore.project"
                  @config-hermes="handleConfigHermes"
                  @delete="hermesStore.openDeleteModal()"
                />
                <div class="create-more-row">
                  <n-button size="small" @click="openTypeSelect">+ 创建另一个 Agent</n-button>
                </div>
              </template>
            </template>
            <FeatureList />
          </main>
          <footer class="app-footer"><span>企业内部 OpenClaw 托管平台</span></footer>

          <!-- Agent 类型选择 -->
          <AgentTypeSelectModal
            :show="typeSelectVisible"
            @close="typeSelectVisible = false"
            @select="handleTypeSelect"
          />

          <!-- OpenClaw 流程 -->
          <CreateModal
            :show="store.modalState === 'create'"
            agent-type="openclaw"
            @close="store.closeModal()"
            @submit="handleCreate"
          />
          <ProgressModal
            :show="store.modalState === 'progress'"
            :steps="store.steps"
            :skipped-bot-config="store.skippedBotConfig"
            agent-type="openclaw"
            @retry="handleRetry"
            @skip-to-step="handleSkipToStep"
          />
          <CompleteModal
            :show="store.modalState === 'complete'"
            agent-type="openclaw"
            @close="store.closeModal()"
            @config-open-claw="handleConfigOpenClaw"
          />
          <DeleteConfirm
            :show="store.modalState === 'delete'"
            @cancel="store.closeModal()"
            @confirm="handleDelete"
          />

          <!-- Hermes 流程 -->
          <CreateModal
            :show="hermesStore.modalState === 'create'"
            agent-type="hermes"
            @close="hermesStore.closeModal()"
            @submit="handleCreateHermes"
          />
          <ProgressModal
            :show="hermesStore.modalState === 'progress'"
            :steps="hermesStore.steps"
            :skipped-bot-config="hermesStore.skippedBotConfig"
            agent-type="hermes"
            @retry="handleRetryHermes"
            @skip-to-step="handleSkipToStepHermes"
          />
          <CompleteModal
            :show="hermesStore.modalState === 'complete'"
            agent-type="hermes"
            @close="hermesStore.closeModal()"
            @config-open-claw="handleConfigHermes"
          />
          <DeleteConfirm
            :show="hermesStore.modalState === 'delete'"
            @cancel="hermesStore.closeModal()"
            @confirm="handleDeleteHermes"
          />
        </div>
      </template>

      <!-- 登录弹窗：挂载在顶层，全局可用 -->
      <LoginModal :show="authStore.showLogin" @close="authStore.showLogin = false" />
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NConfigProvider, NMessageProvider, NSpin, NDialogProvider, NButton } from 'naive-ui'
import { themeOverrides } from './theme'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureList from './components/FeatureList.vue'
import { useProjectStore } from './stores/project'
import { useHermesStore } from './stores/hermes'
import CreateGuide from './components/CreateGuide.vue'
import ProjectCard from './components/ProjectCard.vue'
import HermesProjectCard from './components/HermesProjectCard.vue'
import CreateModal from './components/CreateModal.vue'
import ProgressModal from './components/ProgressModal.vue'
import CompleteModal from './components/CompleteModal.vue'
import DeleteConfirm from './components/DeleteConfirm.vue'
import AgentTypeSelectModal from './components/AgentTypeSelectModal.vue'
import LandingPage from './components/landing/LandingPage.vue'
import OpenClawAdmin from './components/OpenClawAdmin.vue'
import HermesAgentAdmin from './components/HermesAgentAdmin.vue'
import LoginModal from './components/LoginModal.vue'
import { useAuthStore } from './stores/auth'
import {
  getProject,
  createProject,
  getProgress,
  deleteProject,
} from './mocks/data'
import {
  getHermesProject,
  createHermesProject,
  getHermesProgress,
  deleteHermesProject,
} from './mocks/hermesData'
import type { ProgressResponse } from './types/project'
import type { HermesProgressResponse } from './types/hermes'

const route = useRoute()
const isAdminRoute = computed(() =>
  route.path.startsWith('/admin')
  || /^\/projects\/[^/]+\/admin$/.test(route.path)
  || /^\/hermes\/[^/]+\/admin$/.test(route.path),
)

const store = useProjectStore()
const hermesStore = useHermesStore()
const authStore = useAuthStore()

const typeSelectVisible = ref(false)

function openTypeSelect() {
  typeSelectVisible.value = true
}

function handleTypeSelect(type: 'openclaw' | 'hermes') {
  typeSelectVisible.value = false
  if (type === 'openclaw') {
    store.openCreateModal()
  } else {
    hermesStore.openCreateModal()
  }
}

// 控制是否显示落地页
const showLandingPage = ref(true)

// 处理从落地页开始部署
function handleStartDeploy() {
  if (!authStore.isAuthenticated) {
    authStore.showLogin = true
    // 登录成功后继续部署流程
    const unwatch = watch(
      () => authStore.isAuthenticated,
      (authenticated) => {
        if (authenticated) {
          unwatch()
          showLandingPage.value = false
        }
      },
    )
    return
  }
  showLandingPage.value = false
}

onMounted(async () => {
  // 恢复登录态
  await authStore.checkAuth()

  try {
    const project = getProject()
    if (project) {
      store.setProject(project)
      showLandingPage.value = false
    } else {
      store.setEmpty()
    }
  } catch {
    store.setEmpty()
  }

  try {
    const hp = getHermesProject()
    if (hp) {
      hermesStore.setProject(hp)
      showLandingPage.value = false
    } else {
      hermesStore.setEmpty()
    }
  } catch {
    hermesStore.setEmpty()
  }
})

function handleConfigOpenClaw() {
  store.closeModal()
  store.showAdmin()
}

function handleConfigHermes() {
  hermesStore.closeModal()
  hermesStore.showAdmin()
}

let pollTimer: ReturnType<typeof setInterval> | null = null
let failCount = 0

function pollProgress() {
  failCount = 0
  if (pollTimer) clearInterval(pollTimer)

  pollTimer = setInterval(async () => {
    try {
      const data: ProgressResponse = getProgress()
      failCount = 0

      for (const step of data.steps) {
        store.updateStep(step.key, step.status, step.elapsed)
      }

      if (data.done) {
        clearInterval(pollTimer!)
        pollTimer = null
        store.showComplete()
        const project = getProject()
        if (project) {
          store.setProject(project)
        }
      }
    } catch {
      failCount++
      if (failCount >= 3) {
        clearInterval(pollTimer!)
        pollTimer = null
        const runningStep = store.steps.find((s) => s.status === 'running')
        if (runningStep) {
          store.updateStep(runningStep.key, 'error')
        }
      }
    }
  }, 2000)
}

function handleRetry() {
  if (!store.project) return
  store.startProgress()
  pollProgress()
}

async function handleCreate(payload: { name: string; avatarUrl: string; appId?: string; appSecret?: string }) {
  store.startProgress()
  store.setSkippedBotConfig(!payload.appId || !payload.appSecret)
  try {
    const project = createProject(payload.name, payload.avatarUrl, payload.appId)
    store.setProject(project)
    pollProgress()
  } catch {
    store.updateStep('vm', 'error')
  }
}

function handleSkipToStep(step: string) {
  // 手动跳到指定步骤，模拟该步骤完成
  if (step === 'feishu') {
    store.updateStep('feishu', 'done', 1)
    store.showComplete()
  }
}

async function handleDelete() {
  if (!store.project) return
  try {
    deleteProject()
    store.closeModal()
    store.setEmpty()
  } catch {
    // keep modal open for retry
  }
}

// ==================== Hermes 创建/进度/删除 ====================

let hermesPollTimer: ReturnType<typeof setInterval> | null = null
let hermesFailCount = 0

function pollHermesProgress() {
  hermesFailCount = 0
  if (hermesPollTimer) clearInterval(hermesPollTimer)

  hermesPollTimer = setInterval(async () => {
    try {
      const data: HermesProgressResponse = getHermesProgress()
      hermesFailCount = 0

      for (const step of data.steps) {
        hermesStore.updateStep(step.key, step.status, step.elapsed)
      }

      if (data.done) {
        clearInterval(hermesPollTimer!)
        hermesPollTimer = null
        hermesStore.showComplete()
        const hp = getHermesProject()
        if (hp) {
          hermesStore.setProject(hp)
        }
      }
    } catch {
      hermesFailCount++
      if (hermesFailCount >= 3) {
        clearInterval(hermesPollTimer!)
        hermesPollTimer = null
        const runningStep = hermesStore.steps.find((s) => s.status === 'running')
        if (runningStep) {
          hermesStore.updateStep(runningStep.key, 'error')
        }
      }
    }
  }, 2000)
}

function handleRetryHermes() {
  if (!hermesStore.project) return
  hermesStore.startProgress()
  pollHermesProgress()
}

async function handleCreateHermes(payload: { name: string; avatarUrl: string; appId?: string; appSecret?: string }) {
  hermesStore.startProgress()
  hermesStore.setSkippedBotConfig(!payload.appId || !payload.appSecret)
  try {
    const hp = createHermesProject(payload.name, payload.avatarUrl, payload.appId)
    hermesStore.setProject(hp)
    pollHermesProgress()
  } catch {
    hermesStore.updateStep('vm', 'error')
  }
}

function handleSkipToStepHermes(step: string) {
  if (step === 'feishu') {
    hermesStore.updateStep('feishu', 'done', 1)
    hermesStore.showComplete()
  }
}

async function handleDeleteHermes() {
  if (!hermesStore.project) return
  try {
    deleteHermesProject()
    hermesStore.closeModal()
    hermesStore.setEmpty()
  } catch {
    // keep modal open for retry
  }
}

onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
  if (hermesPollTimer) {
    clearInterval(hermesPollTimer)
    hermesPollTimer = null
  }
})
</script>

<style lang="less">
@import '@/assets/styles/global.less';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px;
}

.app-footer {
  text-align: center;
  padding: 16px;
  font-size: 12px;
  color: @textColorPlaceholder;
}

.create-more-row {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
</style>

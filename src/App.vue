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

        <!-- 员工 Gateway 配置页面 -->
        <OpenClawAdmin
          v-else-if="store.pageState === 'admin' && store.project"
          :project="store.project"
          @back="store.goHome()"
        />

        <!-- 应用主界面 -->
        <div v-else class="app">
          <AppHeader />
          <main class="app-main">
            <HeroSection />
            <n-spin v-if="store.pageState === 'loading'" size="large" />
            <CreateGuide
              v-else-if="store.pageState === 'empty'"
              @create="store.openCreateModal()"
            />
            <ProjectCard
              v-else-if="store.pageState === 'has_project' && store.project"
              :project="store.project"
              @config-open-claw="handleConfigOpenClaw"
              @delete="store.openDeleteModal()"
            />
            <FeatureList />
          </main>
          <footer class="app-footer"><span>企业内部 OpenClaw 托管平台</span></footer>
          <CreateModal
            :show="store.modalState === 'create'"
            @close="store.closeModal()"
            @submit="handleCreate"
          />
          <ProgressModal
            :show="store.modalState === 'progress'"
            :steps="store.steps"
            :skipped-bot-config="store.skippedBotConfig"
            @retry="handleRetry"
            @skip-to-step="handleSkipToStep"
          />

          <CompleteModal
            :show="store.modalState === 'complete'"
            @close="store.closeModal()"
            @config-open-claw="handleConfigOpenClaw"
          />

          <DeleteConfirm
            :show="store.modalState === 'delete'"
            @cancel="store.closeModal()"
            @confirm="handleDelete"
          />
        </div>
      </template>

      <!-- 登录弹窗：挂载在顶层，全局可用 -->
      <LoginModal :show="authStore.showLogin" />
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NConfigProvider, NMessageProvider, NSpin, NDialogProvider } from 'naive-ui'
import { themeOverrides } from './theme'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureList from './components/FeatureList.vue'
import { useProjectStore } from './stores/project'
import CreateGuide from './components/CreateGuide.vue'
import ProjectCard from './components/ProjectCard.vue'
import CreateModal from './components/CreateModal.vue'
import ProgressModal from './components/ProgressModal.vue'
import CompleteModal from './components/CompleteModal.vue'
import DeleteConfirm from './components/DeleteConfirm.vue'
import LandingPage from './components/landing/LandingPage.vue'
import OpenClawAdmin from './components/OpenClawAdmin.vue'
import LoginModal from './components/LoginModal.vue'
import { useAuthStore } from './stores/auth'
import apiFetch from './api/client'
import type { ProgressResponse } from './types/project'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin') || route.path.match(/^\/projects\/[^/]+\/admin$/))

const store = useProjectStore()
const authStore = useAuthStore()

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
    const res = await apiFetch('/api/project')
    if (res.ok) {
      store.setProject(await res.json())
    } else {
      store.setEmpty()
    }
  } catch {
    store.setEmpty()
  }
})

function handleConfigOpenClaw() {
  store.closeModal()
  store.showAdmin()
}

let pollTimer: ReturnType<typeof setInterval> | null = null
let failCount = 0

function pollProgress(projectId: string) {
  failCount = 0
  if (pollTimer) clearInterval(pollTimer)

  pollTimer = setInterval(async () => {
    try {
      const res = await apiFetch(`/api/project/${projectId}/progress`)
      const data: ProgressResponse = await res.json()
      failCount = 0

      for (const step of data.steps) {
        store.updateStep(step.key, step.status, step.elapsed)
      }

      if (data.done) {
        clearInterval(pollTimer!)
        pollTimer = null
        store.showComplete()
        const projectRes = await apiFetch('/api/project')
        if (projectRes.ok) {
          store.setProject(await projectRes.json())
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
  pollProgress(store.project.id)
}

async function handleCreate(payload: { name: string; avatarUrl: string; appId?: string; appSecret?: string }) {
  store.startProgress()
  // 标记是否跳过了机器人配置
  store.setSkippedBotConfig(!payload.appId || !payload.appSecret)
  try {
    const res = await apiFetch('/api/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const project = await res.json()
    store.setProject(project)
    pollProgress(project.id)
  } catch {
    store.updateStep('vm', 'error')
  }
}

function handleSkipToStep(step: import('./types/project').ProgressStep) {
  // 手动跳到指定步骤，模拟该步骤完成
  if (step === 'feishu') {
    store.updateStep('feishu', 'done', 1)
    store.showComplete()
  }
}

async function handleDelete() {
  if (!store.project) return
  try {
    await apiFetch(`/api/project/${store.project.id}`, { method: 'DELETE' })
    store.closeModal()
    store.setEmpty()
  } catch {
    // keep modal open for retry
  }
}

onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
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
</style>

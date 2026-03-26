<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="app">
        <AppHeader />
        <main class="app-main">
          <HeroSection />
          <CreateGuide
            v-if="store.pageState === 'empty'"
            @create="store.openCreateModal()"
          />
          <ProjectCard
            v-else-if="store.pageState === 'has_project' && store.project"
            :project="store.project"
            @open-project="handleOpenProject"
            @chat="handleChat"
            @delete="store.openDeleteModal()"
          />
          <FeatureList />
        </main>
        <CreateModal
          :show="store.modalState === 'create'"
          @close="store.closeModal()"
          @submit="handleCreate"
        />
        <ProgressModal
          :show="store.modalState === 'progress'"
          :steps="store.steps"
          @retry="handleRetry"
        />
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { themeOverrides } from './theme'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureList from './components/FeatureList.vue'
import { useProjectStore } from './stores/project'
import CreateGuide from './components/CreateGuide.vue'
import ProjectCard from './components/ProjectCard.vue'
import CreateModal from './components/CreateModal.vue'
import ProgressModal from './components/ProgressModal.vue'
import type { ProgressResponse } from './types/project'

const store = useProjectStore()

onMounted(async () => {
  try {
    const res = await fetch('/api/project')
    if (res.ok) {
      store.setProject(await res.json())
    } else {
      store.setEmpty()
    }
  } catch {
    store.setEmpty()
  }
})

function handleOpenProject() {
  if (store.project?.gatewayUrl) {
    window.open(store.project.gatewayUrl, '_blank')
  }
}

function handleChat() {
  if (store.project?.feishuChatUrl) {
    window.open(store.project.feishuChatUrl, '_blank')
  }
}

let pollTimer: ReturnType<typeof setInterval> | null = null
let failCount = 0

function pollProgress(projectId: string) {
  failCount = 0
  if (pollTimer) clearInterval(pollTimer)

  pollTimer = setInterval(async () => {
    try {
      const res = await fetch(`/api/project/${projectId}/progress`)
      const data: ProgressResponse = await res.json()
      failCount = 0

      for (const step of data.steps) {
        store.updateStep(step.key, step.status, step.elapsed)
      }

      if (data.done) {
        clearInterval(pollTimer!)
        pollTimer = null
        store.showComplete()
        const projectRes = await fetch('/api/project')
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

async function handleCreate(payload: { name: string; botName: string; avatarUrl: string }) {
  store.startProgress()
  try {
    const res = await fetch('/api/project', {
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
</style>

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
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { themeOverrides } from './theme'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureList from './components/FeatureList.vue'
import { useProjectStore } from './stores/project'
import CreateGuide from './components/CreateGuide.vue'
import ProjectCard from './components/ProjectCard.vue'

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

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="app">
        <AppHeader />
        <main class="app-main">
          <HeroSection />
          <!-- Project card area - will be filled in later tasks -->
          <FeatureList />
        </main>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { themeOverrides } from './theme'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureList from './components/FeatureList.vue'
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

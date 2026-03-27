<template>
  <div class="console-tab-view">
    <ConsoleView />
  </div>
</template>

<script setup lang="ts">
import ConsoleView from '@/components/settings/ConsoleView.vue'
</script>

<style lang="less" scoped>
.console-tab-view {
  width: 100%;
  height: 100%;
  padding: 24px;
  background: #f5f5f5;
  overflow-y: auto;
}
</style>

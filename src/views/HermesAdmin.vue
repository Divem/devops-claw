<template>
  <div class="hermes-admin-view" v-if="project">
    <HermesAgentAdmin :project="project" @back="goBack" />
  </div>
  <div v-else class="loading-container">
    <n-spin size="large" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NSpin } from 'naive-ui'
import HermesAgentAdmin from '@/components/HermesAgentAdmin.vue'
import { getHermesProjectById } from '@/mocks/hermesData'
import type { HermesProject } from '@/types/hermes'

const route = useRoute()
const router = useRouter()
const project = ref<HermesProject | null>(null)

onMounted(() => {
  const projectId = route.params.id as string
  try {
    const data = getHermesProjectById(projectId)
    if (data) {
      project.value = data
    } else {
      router.replace('/admin/hermes')
    }
  } catch {
    router.replace('/admin/hermes')
  }
})

function goBack() {
  if (window.opener) {
    window.close()
    window.opener.focus()
  } else {
    router.push('/admin/hermes')
  }
}
</script>

<style lang="less" scoped>
.hermes-admin-view {
  width: 100%;
  height: 100%;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

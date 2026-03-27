<template>
  <div class="project-admin" v-if="project">
    <OpenClawAdmin :project="project" @back="goBack" />
  </div>
  <div v-else class="loading-container">
    <n-spin size="large" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NSpin } from 'naive-ui'
import OpenClawAdmin from '@/components/OpenClawAdmin.vue'
import type { Project } from '@/types/project'

const route = useRoute()
const router = useRouter()
const project = ref<Project | null>(null)

onMounted(async () => {
  const projectId = route.params.id as string
  try {
    const res = await fetch(`/api/projects/${projectId}`)
    if (res.ok) {
      project.value = await res.json()
    } else {
      // 项目不存在，返回实例列表
      router.replace('/admin/instances')
    }
  } catch {
    router.replace('/admin/instances')
  }
})

function goBack() {
  // 如果是通过 window.open 打开的新标签页，关闭当前窗口并聚焦回原窗口
  if (window.opener) {
    window.close()
    window.opener.focus()
  } else {
    // 直接访问的情况，使用路由导航
    router.push('/admin/instances')
  }
}
</script>

<style lang="less" scoped>
.project-admin {
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

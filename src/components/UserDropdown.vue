<template>
  <n-dropdown
    :options="dropdownOptions"
    :show-arrow="true"
    placement="bottom-end"
    trigger="click"
    @select="handleSelect"
  >
    <div class="user-dropdown-trigger">
      <n-avatar
        round
        size="small"
        :src="user.avatarUrl"
        :fallback-src="undefined"
      >
        {{ user.name.charAt(0) }}
      </n-avatar>
      <span class="user-name">{{ user.name }}</span>
      <n-icon :component="ChevronDown" size="14" />
    </div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { NDropdown, NAvatar, NIcon } from 'naive-ui'
import { ChevronDown } from '@vicons/ionicons5'
import type { MockUser } from '@/types/project'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  user: MockUser
}>()

const router = useRouter()
const authStore = useAuthStore()

const dropdownOptions = computed(() => {
  const options: Array<{ label: string; key: string; icon?: string }> = [
    { label: '个人设置', key: 'profile', icon: '👤' },
  ]

  if (props.user.role === 'admin') {
    options.push({ label: '管理后台', key: 'admin', icon: '⚙️' })
  }

  options.push({ label: '退出登录', key: 'logout', icon: '🚪' })

  return options.map(opt => ({
    label: `${opt.icon} ${opt.label}`,
    key: opt.key,
  }))
})

function handleSelect(key: string) {
  if (key === 'admin') {
    router.push('/admin/dashboard')
  } else if (key === 'logout') {
    authStore.logout()
  }
}
</script>

<style lang="less" scoped>
.user-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: @bgContainer;
  }
}

.user-name {
  font-size: 14px;
  color: @textColorBody;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

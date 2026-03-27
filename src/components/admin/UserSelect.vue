<template>
  <div class="user-select">
    <n-auto-complete
      v-model:value="searchQuery"
      :options="options"
      :loading="loading"
      placeholder="搜索员工姓名"
      clearable
      @update:value="handleSearch"
      @select="handleSelect"
      @clear="handleClear"
    >
      <template #prefix>
        <n-icon :component="PersonOutline" />
      </template>
      <template v-if="selectedUser" #suffix>
        <n-tag size="small" closable @close="handleClear">
          {{ selectedUser.name }}
        </n-tag>
      </template>
    </n-auto-complete>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NAutoComplete, NIcon, NTag } from 'naive-ui'
import { PersonOutline } from '@vicons/ionicons5'

interface UserOption {
  id: string
  name: string
  department: string
  avatarUrl: string
}

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | undefined]
}>()

const searchQuery = ref('')
const loading = ref(false)
const users = ref<UserOption[]>([])
const selectedUser = ref<UserOption | null>(null)

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const options = computed(() =>
  users.value.map((u) => ({
    label: `${u.name} · ${u.department}`,
    value: u.id,
  })),
)

async function handleSearch(val: string) {
  if (!val.trim()) {
    users.value = []
    return
  }
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    loading.value = true
    try {
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(val)}`)
      if (res.ok) {
        users.value = await res.json()
      }
    } finally {
      loading.value = false
    }
  }, 300)
}

function handleSelect(value: string) {
  const user = users.value.find((u) => u.id === value)
  if (user) {
    selectedUser.value = user
    searchQuery.value = ''
    emit('update:modelValue', user.id)
  }
}

function handleClear() {
  selectedUser.value = null
  searchQuery.value = ''
  users.value = []
  emit('update:modelValue', undefined)
}
</script>

<style lang="less" scoped>
.user-select {
  width: 100%;
}
</style>

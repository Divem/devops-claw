<template>
  <n-data-table
    :columns="columns"
    :data="instances"
    :loading="loading"
    :row-key="(row: Instance) => row.id"
    :bordered="false"
    size="medium"
  />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NDataTable, NTag, NButton, NAvatar, NDropdown, NSpace } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { Instance, VmStatus, FeishuConnectionStatus, InstanceAction } from '@/types/admin'

defineProps<{
  instances: Instance[]
  loading: boolean
}>()

const emit = defineEmits<{
  select: [instance: Instance]
  action: [id: string, action: InstanceAction]
  config: [projectId: string]
}>()

const vmStatusMap: Record<VmStatus, { label: string; type: 'success' | 'default' | 'error' }> = {
  running: { label: '运行中', type: 'success' },
  stopped: { label: '已停止', type: 'default' },
  error: { label: '异常', type: 'error' },
}

const feishuStatusMap: Record<FeishuConnectionStatus, { label: string; type: 'success' | 'warning' | 'error' }> = {
  connected: { label: '已连接', type: 'success' },
  pending: { label: '待配置', type: 'warning' },
  disconnected: { label: '断开', type: 'error' },
}

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  return `${days}天前`
}

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const columns: DataTableColumns<Instance> = [
  {
    title: '实例名称',
    key: 'name',
    render(row) {
      return h(
        'div',
        {
          style: 'display:flex;align-items:center;gap:8px;cursor:pointer',
          onClick: () => emit('select', row),
        },
        [
          h(NAvatar, { src: row.avatarUrl, round: true, size: 28 }),
          h('span', { style: 'font-weight:500;color:#30363e' }, row.name),
        ],
      )
    },
  },
  {
    title: '所属员工',
    key: 'ownerName',
    width: 100,
  },
  {
    title: '虚拟机状态',
    key: 'vmStatus',
    width: 110,
    render(row) {
      const s = vmStatusMap[row.vmStatus]
      return h(NTag, { type: s.type, size: 'small', round: true }, () => s.label)
    },
  },
  {
    title: '飞书连接',
    key: 'feishuStatus',
    width: 110,
    render(row) {
      const s = feishuStatusMap[row.feishuStatus]
      return h(NTag, { type: s.type, size: 'small', round: true }, () => s.label)
    },
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 160,
    render(row) {
      return formatDate(row.createdAt)
    },
  },
  {
    title: '最后活跃',
    key: 'lastActiveAt',
    width: 110,
    render(row) {
      return formatRelativeTime(row.lastActiveAt)
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 140,
    render(row) {
      const isRunning = row.vmStatus === 'running'
      const options = [
        { label: '重启', key: 'restart' },
        ...(row.projectId ? [{ label: '配置', key: 'config' }] : []),
        { label: '强制删除', key: 'delete' },
      ]
      return h(NSpace, { size: 8 }, () => [
        isRunning
          ? h(NButton, { size: 'small', quaternary: true, type: 'warning', onClick: () => emit('action', row.id, 'stop') }, () => '停止')
          : h(NButton, { size: 'small', quaternary: true, type: 'success', onClick: () => emit('action', row.id, 'start') }, () => '启动'),
        h(NDropdown, {
          options,
          trigger: 'click',
          onSelect: (key: string) => {
            if (key === 'config' && row.projectId) {
              emit('config', row.projectId)
            } else {
              emit('action', row.id, key as InstanceAction)
            }
          },
        }, () => h(NButton, { size: 'small', quaternary: true }, () => '更多')),
      ])
    },
  },
]
</script>

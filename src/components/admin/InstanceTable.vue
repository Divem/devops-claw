<template>
  <n-data-table
    :columns="columns"
    :data="instances"
    :loading="loading"
    :row-key="(row: Instance) => row.id"
    :bordered="false"
    size="medium"
    @update:sorter="handleSorterChange"
  />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NDataTable, NTag, NButton, NAvatar, NDropdown, NSpace } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { Instance, VmStatus, FeishuConnectionStatus, GlobalConfigStatus, InstanceAction } from '@/types/admin'

defineProps<{
  instances: Instance[]
  loading: boolean
}>()

const emit = defineEmits<{
  select: [instance: Instance]
  action: [id: string, action: InstanceAction]
  config: [projectId: string]
  sort: [key: string, order: 'ascend' | 'descend' | false]
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

const globalConfigStatusMap: Record<GlobalConfigStatus, { label: string; type: 'success' | 'warning' | 'default' }> = {
  synced: { label: '已同步', type: 'success' },
  pending: { label: '待同步', type: 'warning' },
  outdated: { label: '待更新', type: 'default' },
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

function handleSorterChange(sorter: { columnKey: string; order: 'ascend' | 'descend' | false }) {
  emit('sort', sorter.columnKey, sorter.order)
}

const columns: DataTableColumns<Instance> = [
  {
    title: '实例名称',
    key: 'name',
    width: 220,
    ellipsis: { tooltip: true },
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
    width: 90,
    render(row) {
      const s = vmStatusMap[row.vmStatus]
      return h(NTag, { type: s.type, size: 'small', round: true }, () => s.label)
    },
  },
  {
    title: '飞书连接',
    key: 'feishuStatus',
    width: 90,
    render(row) {
      const s = feishuStatusMap[row.feishuStatus]
      return h(NTag, { type: s.type, size: 'small', round: true }, () => s.label)
    },
  },
  {
    title: '配置状态',
    key: 'globalConfigStatus',
    width: 90,
    render(row) {
      if (!row.globalConfigStatus) return h('span', { style: 'color:#aaa' }, '-')
      const s = globalConfigStatusMap[row.globalConfigStatus]
      return h(NTag, { type: s.type, size: 'small', round: true }, () => s.label)
    },
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 160,
    sorter: true,
    defaultSortOrder: false,
    render(row) {
      return formatDate(row.createdAt)
    },
  },
  {
    title: '最后活跃',
    key: 'lastActiveAt',
    width: 110,
    sorter: true,
    defaultSortOrder: false,
    render(row) {
      return formatRelativeTime(row.lastActiveAt)
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 280,
    render(row) {
      const isRunning = row.vmStatus === 'running'
      const options = [
        {
          type: 'group',
          label: 'OpenClaw',
          key: 'group-openclaw',
          children: [
            { label: '重启 Gateway', key: 'restart-gateway' },
            { label: '修复配置', key: 'repair-config' },
            { label: '恢复默认配置', key: 'reset-instance' },
          ],
        },
        {
          type: 'group',
          label: '电脑',
          key: 'group-computer',
          children: [
            isRunning
              ? { label: '停止', key: 'stop' }
              : { label: '启动', key: 'start' },
            { label: '重启电脑', key: 'restart' },
            { label: '强制删除实例', key: 'delete' },
          ],
        },
      ]
      return h(NSpace, { size: 8 }, () => [
        ...(row.projectId ? [h(NButton, { size: 'small', quaternary: true, onClick: () => emit('config', row.projectId!) }, () => 'OpenClaw 控制台')] : []),
        h(NDropdown, {
          options,
          trigger: 'click',
          onSelect: (key: string) => {
            emit('action', row.id, key as InstanceAction)
          },
        }, () => h(NButton, { size: 'small', quaternary: true }, () => '更多')),
      ])
    },
  },
]
</script>

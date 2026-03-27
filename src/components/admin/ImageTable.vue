<template>
  <n-data-table
    :columns="columns"
    :data="images"
    :loading="loading"
    :row-key="(row: Image) => row.id"
    :bordered="false"
    size="medium"
    @update:sorter="handleSorterChange"
  />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NDataTable, NTag, NButton, NSpace } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { Image, ImageType, ImageStatus } from '@/types/image'

defineProps<{
  images: Image[]
  loading: boolean
}>()

const emit = defineEmits<{
  select: [image: Image]
  edit: [image: Image]
  delete: [image: Image]
  sort: [key: string, order: 'ascend' | 'descend' | false]
}>()

const imageTypeMap: Record<ImageType, { label: string; type: 'info' | 'primary' }> = {
  vm: { label: '虚拟机', type: 'info' },
  openclaw: { label: 'OpenClaw', type: 'primary' },
}

const imageStatusMap: Record<ImageStatus, { label: string; type: 'success' | 'error' | 'warning' }> = {
  available: { label: '可用', type: 'success' },
  unavailable: { label: '不可用', type: 'error' },
  building: { label: '构建中', type: 'warning' },
}

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function formatSize(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`
  return `${mb} MB`
}

function handleSorterChange(sorter: { columnKey: string; order: 'ascend' | 'descend' | false }) {
  emit('sort', sorter.columnKey, sorter.order)
}

const columns: DataTableColumns<Image> = [
  {
    title: '类型',
    key: 'type',
    width: 100,
    render(row) {
      const t = imageTypeMap[row.type]
      return h(NTag, { type: t.type, size: 'small', round: true, bordered: false }, () => t.label)
    },
  },
  {
    title: '镜像名称',
    key: 'name',
    width: 200,
    ellipsis: { tooltip: true },
    render(row) {
      return h(
        'span',
        {
          style: 'font-weight:500;color:#30363e;cursor:pointer',
          onClick: () => emit('select', row),
        },
        row.name,
      )
    },
  },
  {
    title: '版本',
    key: 'version',
    width: 100,
  },
  {
    title: '大小',
    key: 'size',
    width: 100,
    render(row) {
      return formatSize(row.size)
    },
  },
  {
    title: '状态',
    key: 'status',
    width: 90,
    render(row) {
      const s = imageStatusMap[row.status]
      return h(NTag, { type: s.type, size: 'small', round: true }, () => s.label)
    },
  },
  {
    title: '描述',
    key: 'description',
    width: 200,
    ellipsis: { tooltip: true },
    render(row) {
      return h('span', { style: 'color:#8a8f8d' }, row.description || '-')
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
    title: '操作',
    key: 'actions',
    width: 140,
    render(row) {
      return h(NSpace, { size: 8 }, () => [
        h(NButton, { size: 'small', quaternary: true, onClick: () => emit('edit', row) }, () => '编辑'),
        h(NButton, { size: 'small', quaternary: true, type: 'error', onClick: () => emit('delete', row) }, () => '删除'),
      ])
    },
  },
]
</script>

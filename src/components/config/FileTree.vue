<template>
  <div class="file-tree">
    <FileTreeItem
      v-for="node in nodes"
      :key="node.id"
      :node="node"
      :level="level"
    />
  </div>
</template>

<script setup lang="ts">
import type { FileNode } from '@/stores/fileExplorer'
import FileTreeItem from './FileTreeItem.vue'

interface Props {
  nodes: FileNode[]
  level: number
}

defineProps<Props>()
</script>

<style lang="less" scoped>
.file-tree {
  display: flex;
  flex-direction: column;
}
</style>

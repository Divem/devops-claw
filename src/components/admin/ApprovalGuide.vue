<template>
  <n-collapse>
    <n-collapse-item title="配置引导" name="guide">
      <n-timeline>
        <n-timeline-item title="步骤 1" content="登录飞书开放平台，找到对应应用" />
        <n-timeline-item title="步骤 2" content="配置 WebSocket 长连接地址" />
        <n-timeline-item title="步骤 3" content="添加事件订阅" />
        <n-timeline-item title="步骤 4" content="发布应用版本" />
      </n-timeline>
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="ts">
import { NCollapse, NCollapseItem, NTimeline, NTimelineItem } from 'naive-ui'
</script>

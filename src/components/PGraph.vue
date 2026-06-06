<script setup lang="ts">
import { computed } from 'vue'
import PLabel from './PLabel.vue'

const props = defineProps<{
  values: number[]
  label?: string
  min?: number
  max?: number
}>()

const polylinePoints = computed(() => {
  if (!props.values.length) return ''
  const minV = props.min ?? Math.min(...props.values)
  const maxV = props.max ?? Math.max(...props.values)
  const range = maxV - minV || 1
  return props.values.map((v, i) => {
    const x = (i / (props.values.length - 1)) * 100
    const y = 100 - ((v - minV) / range) * 100
    return `${x},${y}`
  }).join(' ')
})
</script>
<template>
  <PLabel :label="label">
    <div class="vp-graph">
      <svg
        class="vp-graph__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline :points="polylinePoints" />
      </svg>
    </div>
  </PLabel>
</template>

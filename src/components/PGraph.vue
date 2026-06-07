<script setup lang="ts">
import { computed } from 'vue'
import PLabel from './PLabel.vue'

const {
  values,
  label,
  tooltip,
  min,
  max,
} = defineProps<{
  values: number[]
  label?: string
  tooltip?: string
  min?: number
  max?: number
}>()

const polylinePoints = computed(() => {
  if (!values.length) return ''
  const minV = min ?? Math.min(...values)
  const maxV = max ?? Math.max(...values)
  const range = maxV - minV || 1
  return values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100
    const y = 100 - ((v - minV) / range) * 100
    return `${x},${y}`
  }).join(' ')
})
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
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
<style lang="scss">
@use '../styles/view/graph';
</style>

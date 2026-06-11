<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { type PollingRef } from '../composables/pollingRef'
import { usePolling } from '../composables/usePolling'
import PLabel from './PLabel.vue'

const {
  poll,
  historyLength = 100,
  values,
  label,
  tooltip,
  min,
  max,
} = defineProps<{
  poll?: PollingRef<number>
  historyLength?: number
  values?: number[]
  label?: string
  tooltip?: string
  min?: number
  max?: number
}>()

if (poll !== undefined && values !== undefined) {
  throw new Error('PGraph: use either :poll or :values, not both.')
}

const history = ref<number[]>([])

if (poll) {
  usePolling(poll)
  watch(() => poll?.value, (val) => {
    if (val !== undefined) {
      history.value = [...history.value.slice(-(historyLength - 1)), val]
    }
  })
}

const activeValues = computed(() => poll ? history.value : (values ?? []))

const polylinePoints = computed(() => {
  const vals = activeValues.value
  if (!vals.length) return ''
  const minV = min ?? Math.min(...vals)
  const maxV = max ?? Math.max(...vals)
  const range = maxV - minV || 1
  return vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * 100
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

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
  decimalPlaces,
  showLastValue = true,
  disabled = false,
} = defineProps<{
  poll?: PollingRef<number>
  historyLength?: number
  values?: number[]
  label?: string
  tooltip?: string
  min?: number
  max?: number
  decimalPlaces?: number
  showLastValue?: boolean
  disabled?: boolean
}>()

if (poll !== undefined && values !== undefined) {
  throw new Error('PGraph: use either :poll or :values, not both.')
}

const history = ref<number[]>([])
const lastValueRaw = ref<number>(0)
const lastValue = computed(() => {
  if (decimalPlaces !== undefined) {
    return round(lastValueRaw.value, decimalPlaces)
  }
  return lastValueRaw.value
})

function round(value: number, decimals: number): number {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)
}

if (poll) {
  usePolling(poll)
  watch(() => poll?.value, (val) => {
    if (val !== undefined && !isNaN(val)) {
      history.value = [...history.value.slice(-(historyLength - 1)), val]
      lastValueRaw.value = val
    }
  })
} else if (values) {
  watch(() => values, (val: number[]) => {
    lastValueRaw.value = val[val.length - 1]
  }, { immediate: true })
}

const activeValues = computed(() => poll ? history.value : (values ?? []))

const polylinePoints = computed(() => {
  const vals = activeValues.value
  if (!vals.length) return ''
  const minV = min ?? Math.min(...vals)
  const maxV = max ?? Math.max(...vals)
  const range = maxV - minV || 1
  return vals.map((v, i) => {
    const x = (i / Math.max(1, vals.length - 1)) * 100
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
    <template #tooltip>
      <slot name="tooltip" />
    </template>
    <template
      #after-label-text
    >
      <slot
        v-if="showLastValue"
        name="last-value"
        v-bind="{lastValue, lastValueRaw}"
      >
        {{ lastValue }}
      </slot>
    </template>
    <div
      class="vp-graph"
      :class="{'vp--disabled': disabled }"
    >
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

.label-after {
  margin-left: 0.5em;
}
</style>

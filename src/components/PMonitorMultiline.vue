<script setup lang="ts">
import { computed } from 'vue'
import { type PollingRef } from '../composables/pollingRef'
import { usePolling } from '../composables/usePolling'
import PLabel from './PLabel.vue'

const {
  poll,
  value,
  label,
  tooltip,
} = defineProps<{
  poll?: PollingRef<unknown>
  value?: unknown
  label?: string
  tooltip?: string
}>()

if (poll !== undefined && value !== undefined) {
  throw new Error('PMonitorMulti: use either :poll or :value, not both.')
}

if (poll) usePolling(poll)

const displayValue = computed(() => poll?.value ?? value)
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
    <div class="vp-monitor-multi">
      <textarea
        class="vp-monitor-multi__value"
        readonly
        :value="String(displayValue)"
      />
    </div>
  </PLabel>
</template>
<style lang="scss">
@use '../styles/view/monitor-multi';
</style>

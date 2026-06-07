<script setup lang="ts">
import PLabel from './PLabel.vue'

const {
  value,
  label,
  tooltip,
} = defineProps<{
  value: unknown
  label?: string
  tooltip?: string
}>()
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
        :value="String(value)"
      />
    </div>
  </PLabel>
</template>

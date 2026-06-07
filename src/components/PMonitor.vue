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
    <div class="vp-monitor">
      <div class="vp-monitor__value">
        {{ value }}
      </div>
    </div>
  </PLabel>
</template>

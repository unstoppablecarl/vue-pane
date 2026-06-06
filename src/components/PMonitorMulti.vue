<script setup lang="ts">
import PLabel from './PLabel.vue'

defineProps<{
  value: unknown
  label?: string
}>()
</script>
<template>
  <PLabel :label="label">
    <div class="vp-monitor-multi">
      <textarea
        class="vp-monitor-multi__value"
        readonly
        :value="String(value)"
      />
    </div>
  </PLabel>
</template>

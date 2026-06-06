<script setup lang="ts">
import PLabel from './PLabel.vue'

defineProps<{
  value: unknown
  label?: string
}>()
</script>
<template>
  <PLabel :label="label">
    <div class="vp-monitor">
      <div class="vp-monitor__value">
        {{ value }}
      </div>
    </div>
  </PLabel>
</template>

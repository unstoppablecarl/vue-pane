<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>
<template>
  <div
    class="vp-label"
    :class="{ 'vp-label--no-label': !label }"
  >
    <div class="vp-label__text">
      {{ label }}
    </div>
    <div class="vp-label__value">
      <slot />
    </div>
  </div>
</template>

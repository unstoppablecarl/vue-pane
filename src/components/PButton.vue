<script setup lang="ts">
const { label } = defineProps<{
  label: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>
<template>
  <div class="vp-button">
    <button
      class="vp-button__btn"
      @click="emit('click')"
    >
      <div class="vp-button__label">
        {{ label }}
      </div>
    </button>
  </div>
</template>

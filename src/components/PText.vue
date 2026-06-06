<script setup lang="ts">
import PLabel from './PLabel.vue'

const model = defineModel<string>({ required: true })
const { label } = defineProps<{ label?: string }>()
</script>
<template>
  <PLabel :label="label">
    <div class="vp-text">
      <input
        class="vp-text__input"
        type="text"
        :value="model"
        @input="model = ($event.target as HTMLInputElement).value"
      >
    </div>
  </PLabel>
</template>

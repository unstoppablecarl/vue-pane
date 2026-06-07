<script setup lang="ts">
import PLabel from './PLabel.vue'

const model = defineModel<string>({ required: true })
const {
  label,
  tooltip,
} = defineProps<{
  label?: string
  tooltip?: string
}>()
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
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

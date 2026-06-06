<script setup lang="ts">
import PLabel from './PLabel.vue'

const model = defineModel<string | number>({ required: true })
const { label, options } = defineProps<{
  label?: string
  options: { value: string | number, label: string }[]
}>()
</script>
<template>
  <PLabel :label="label">
    <div class="vp-select">
      <select
        class="vp-select__input"
        :value="model"
        @change="model = ($event.target as HTMLSelectElement).value"
      >
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
      <div class="vp-select__arrow">
        <svg viewBox="0 0 16 16">
          <path d="M 2 5 L 8 11 L 14 5" />
        </svg>
      </div>
    </div>
  </PLabel>
</template>

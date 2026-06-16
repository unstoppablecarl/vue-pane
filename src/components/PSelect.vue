<script setup lang="ts">
import { computed } from 'vue'
import { type PollingRef } from '../composables/pollingRef'
import { usePollingOrModel } from '../composables/usePolling'
import PLabel from './PLabel.vue'

type Polling = {
  poll: PollingRef<string | number>
  modelValue?: never
}
type Model = {
  poll?: never
  modelValue?: string | number
}

type Props = {
  label?: string
  tooltip?: string
  options: { value: string | number, label: string }[]
  readonly?: boolean
} & (Polling | Model)

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [string | number] }>()

const modelRef = computed<string | number | undefined>({
  get: () => props.modelValue,
  set: (val: string | number | undefined) => emit('update:modelValue', val!),
})

const model = usePollingOrModel(props.poll, modelRef)

function onChange(e: Event) {
  if (!props.readonly) model.value = (e.target as HTMLSelectElement).value
}
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
    <template #tooltip>
      <slot name="tooltip" />
    </template>
    <div
      class="vp-select"
      :class="{ 'vp-select--readonly': readonly }"
    >
      <select
        class="vp-select__input"
        :value="model"
        @change="onChange"
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
<style lang="scss">
@use '../styles/view/list';
</style>

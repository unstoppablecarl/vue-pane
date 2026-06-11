<script setup lang="ts">
import { computed } from 'vue'
import { type PollingRef } from '../composables/pollingRef'
import { usePollingOrModel } from '../composables/usePolling'
import PLabel from './PLabel.vue'

type Polling = {
  poll: PollingRef<boolean>
  modelValue?: never
}
type Model = {
  poll?: never
  modelValue?: boolean
}

type Props = {
  label?: string
  tooltip?: string
  readonly?: boolean
} & (Polling | Model)

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const modelRef = computed<boolean | undefined>({
  get: () => props.modelValue,
  set: (val: boolean | undefined) => emit('update:modelValue', val!),
})

const model = usePollingOrModel(props.poll, modelRef)

function onChange(e: Event) {
  if (!props.readonly) model.value = (e.target as HTMLInputElement).checked
}
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
    <div
      class="vp-checkbox"
      :class="{ 'vp-checkbox--readonly': readonly }"
    >
      <label class="vp-checkbox__label">
        <input
          class="vp-checkbox__input"
          type="checkbox"
          :checked="model"
          @change="onChange"
        >
        <span class="vp-checkbox__box">
          <svg viewBox="0 0 16 16">
            <path d="M2 8l4 4l8 -8" />
          </svg>
        </span>
      </label>
    </div>
  </PLabel>
</template>
<style lang="scss">
@use '../styles/view/checkbox';
</style>

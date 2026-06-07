<script setup lang="ts">
import { useTooltip } from '../composables/useTooltip'
import { usePaneConfig } from '../composables/usePaneConfig'

const {
  label,
  tooltip,
} = defineProps<{
  label: string
  tooltip?: string
}>()

const emit = defineEmits<{
  click: []
}>()

const { floatingEl, floatingStyles, visible, show, hide } = useTooltip()
const config = usePaneConfig()
</script>
<template>
  <div class="vp-button">
    <button
      class="vp-button__btn"
      @click="emit('click')"
    >
      <span class="vp-button__label">
        {{ label }}
        <component
          :is="config.tooltipIcon"
          v-if="tooltip && config.tooltipIcon"
          @mouseenter="tooltip && show($event)"
          @mouseleave="hide"
        />
      </span>
    </button>
    <Teleport
      v-if="tooltip"
      to="body"
    >
      <div
        v-if="visible"
        ref="floatingEl"
        class="vp-tooltip"
        :style="floatingStyles"
      >
        {{ tooltip }}
      </div>
    </Teleport>
  </div>
</template>

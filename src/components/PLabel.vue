<script setup lang="ts">
import { Comment, computed, Fragment, useSlots } from 'vue'
import { usePaneConfig } from '../composables/usePaneConfig'
import { useTooltip } from '../composables/useTooltip'

const {
  label,
  tooltip,
} = defineProps<{
  label?: string
  tooltip?: string
}>()

const slots = useSlots()
const hasTooltipSlot = computed(() => {
  if (!slots.tooltip) return false
  return slots.tooltip().some((vnode) => {
    if (vnode.type === Comment) return false
    if (vnode.type === Fragment) return Array.isArray(vnode.children) && (vnode.children as unknown[]).length > 0
    return true
  })
})
const hasTooltip = computed(() => !!(tooltip || hasTooltipSlot.value))

const { floatingStyles, visible, activeText, show, hide } = useTooltip()
const config = usePaneConfig()
</script>
<template>
  <div
    class="vp-label"
    :class="{ 'vp-label--no-label': !label }"
  >
    <div class="vp-label__text">
      {{ label }}
      <span
        v-if="hasTooltip && config.tooltipIcon"
        class="vp-label__tooltip-icon"
      >
        <component
          :is="config.tooltipIcon"
          @mouseenter="show($event, tooltip || '')"
          @mouseleave="hide"
        />
      </span>
      <slot name="after-label-text" />
    </div>
    <div class="vp-label__value">
      <slot />
    </div>
    <Teleport
      v-if="hasTooltip"
      to="body"
    >
      <div
        v-if="visible"
        ref="floatingEl"
        class="vp-tooltip"
        :style="floatingStyles"
      >
        <slot
          v-if="hasTooltipSlot"
          name="tooltip"
        />
        <span
          v-else
        >{{ activeText }}</span>
      </div>
    </Teleport>
  </div>
</template>
<style lang="scss">
@use '../styles/view/label';
</style>

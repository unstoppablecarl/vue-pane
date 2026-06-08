<script setup lang="ts">
import { ref } from 'vue'
import { useFoldable } from '../composables/useFoldable'
import { usePaneConfig } from '../composables/usePaneConfig'
import { useTooltip } from '../composables/useTooltip'

const expandedModel = defineModel<boolean>('expanded', { default: undefined })
const {
  title,
  tooltip,
  id,
  disabled,
} = defineProps<{
  title: string
  tooltip?: string
  id?: string
  disabled?: boolean
}>()

const key = id ?? title
const config = usePaneConfig()
const containerRef = ref<HTMLElement | null>(null)
const { isExpanded, toggle } = useFoldable(
  containerRef,
  expandedModel,
  key ? `vp-folder-${key}` : undefined,
)

const { floatingStyles, visible, activeText, show, hide } = useTooltip()
</script>

<template>
  <div
    class="vp-folder vp-container"
    :class="{
      'vp-folder--expanded': isExpanded,
      'vp--disabled': disabled,
    }"
  >
    <button
      class="vp-folder__title"
      @click="toggle"
    >
      <div
        class="vp-folder__title-text"
        @mouseenter="tooltip && show($event, tooltip)"
        @mouseleave="hide"
      >
        {{ title }}
        <component
          :is="config.tooltipIcon"
          v-if="tooltip && config.tooltipIcon"
        />
      </div>
      <div class="vp-folder__chevron" />
    </button>
    <div class="vp-folder__indent" />
    <div
      ref="containerRef"
      class="vp-folder__content"
    >
      <slot />
    </div>
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
        {{ activeText }}
      </div>
    </Teleport>
  </div>
</template>
<style lang="scss">
@use '../styles/view/folder';
</style>

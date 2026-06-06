<script setup lang="ts">
import { ref } from 'vue'
import { useElementPositions } from '../composables/useElementPositions'
import { useFoldable } from '../composables/useFoldable'

const expandedModel = defineModel<boolean>('expanded', { default: true })
const { title, name, disabled, hidden } = defineProps<{
  title: string
  name?: string
  disabled?: boolean
  hidden?: boolean
}>()

const containerRef = ref<HTMLElement | null>(null)
const { isExpanded, toggle } = useFoldable(
  containerRef,
  () => expandedModel.value,
  name ? `vp-folder-${name}` : undefined,
  (val) => { expandedModel.value = val },
)
useElementPositions(containerRef)
</script>

<template>
  <div
    class="vp-folder"
    :class="{
      'vp-folder--expanded': isExpanded,
      'vp--disabled': disabled,
      'vp--hidden': hidden,
    }"
  >
    <button
      class="vp-folder__title"
      @click="toggle"
    >
      <div class="vp-folder__title-text">
        {{ title }}
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
  </div>
</template>

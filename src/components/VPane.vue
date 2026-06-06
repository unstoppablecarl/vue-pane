<script setup lang="ts">
import { computed, ref } from 'vue'
import { useElementPositions } from '../composables/useElementPositions'
import { useFoldable } from '../composables/useFoldable'

const expandedModel = defineModel<boolean>('expanded', { default: true })
const { title, disabled, hidden } = defineProps<{
  title?: string
  disabled?: boolean
  hidden?: boolean
}>()

const hasTitle = computed(() => !!title)
const containerRef = ref<HTMLElement | null>(null)
const { isExpanded, toggle } = useFoldable(
  containerRef,
  () => (title ? expandedModel.value : true),
  undefined,
  (val) => { if (title) expandedModel.value = val },
)
useElementPositions(containerRef)
</script>

<template>
  <div
    class="vp-pane"
    :class="{
      'vp-pane--expanded': isExpanded,
      'vp-pane--no-title': !hasTitle,
      'vp--disabled': disabled,
      'vp--hidden': hidden,
    }"
  >
    <button
      v-if="hasTitle"
      class="vp-pane__title"
      @click="toggle"
    >
      {{ title }}
      <div class="vp-pane__chevron" />
    </button>
    <div
      ref="containerRef"
      class="vp-pane__content"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use '../styles/index.scss';
</style>

<script setup lang="ts">
import { usePaneConfig } from '../composables/usePaneConfig'
import { useTooltip } from '../composables/useTooltip'

const model = defineModel<number>({ default: 0 })
const {
  tabs,
  tooltips,
} = defineProps<{
  tabs: string[]
  tooltips?: string[]
}>()

const { floatingEl, floatingStyles, visible, show, hide } = useTooltip()
const config = usePaneConfig()

function setTab(i: number) {
  model.value = i
}
</script>
<template>
  <div class="vp-tab">
    <div class="vp-tab__title-bar">
      <div
        v-for="(tab, i) in tabs"
        :key="i"
        class="vp-tab-item"
        :class="{ 'vp-tab-item--selected': i === model }"
      >
        <button
          class="vp-tab-item__btn"
          @click="setTab(i)"
        >
          <span class="vp-tab-item__label">
            {{ tab }}
            <component
              :is="config.tooltipIcon"
              v-if="tooltips?.[i] && config.tooltipIcon"
              @mouseenter="tooltips?.[i] && show($event)"
              @mouseleave="hide"
            />
          </span>
        </button>
        <Teleport
          v-if="tooltips?.[i]"
          to="body"
        >
          <div
            v-if="visible"
            ref="floatingEl"
            class="vp-tooltip"
            :style="floatingStyles"
          >
            {{ tooltips?.[i] }}
          </div>
        </Teleport>
      </div>
    </div>
    <div class="vp-tab__indent" />
    <div class="vp-tab__content">
      <div
        v-for="(tab, i) in tabs"
        v-show="i === model"
        :key="i"
        class="vp-tab-page"
      >
        <div class="vp-tab-page__content">
          <slot :name="tab" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@use '../styles/view/tab';
</style>

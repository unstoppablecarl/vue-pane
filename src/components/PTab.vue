<script setup lang="ts">
const model = defineModel<number>({ default: 0 })
const { tabs } = defineProps<{
  tabs: string[]
}>()

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
          <div class="vp-tab-item__label">
            {{ tab }}
          </div>
        </button>
      </div>
    </div>
    <div class="vp-tab__indent" />
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
</template>

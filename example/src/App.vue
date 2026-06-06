<script setup lang="ts">
import { ref } from 'vue'
import {
  VPane,
  PButton,
  PCheckbox,
  PColor,
  PFolder,
  PGraph,
  PMonitor,
  PMonitorMulti,
  PNumber,
  PPoint2d,
  PSelect,
  PSeparator,
  PSlider,
  PTab,
  PText,
} from 'vue-pane'

const name = ref('World')
const count = ref(0)
const speed = ref(1.5)
const enabled = ref(true)
const mode = ref('linear')
const modeOptions = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease', label: 'Ease' },
  { value: 'bounce', label: 'Bounce' },
]
const sliderVal = ref(0.5)
const color = ref('#ff5500')
const point = ref({ x: 0, y: 0 })
const graphValues = ref([10, 40, 20, 80, 60, 30, 70, 50])
const activeTab = ref(0)
</script>

<template>
  <div class="container">
    <VPane title="Debug" style="width: 300px;">
      <PText v-model="name" label="Name" />
      <PNumber v-model="count" label="Count" :min="0" :max="100" />
      <PNumber v-model="speed" label="Speed" :min="0" :max="10" :step="0.1" />
      <PSeparator />
      <PCheckbox v-model="enabled" label="Enabled" />
      <PSelect v-model="mode" :options="modeOptions" label="Mode" />
      <PButton label="Reset" @click="count = 0; speed = 1.5" />
      <PMonitor :value="`${name} × ${count}`" label="Output" />
      <PMonitorMulti :value="`Name: ${name}\nCount: ${count}\nSpeed: ${speed}`" label="Multi" />

      <PFolder title="Transform" name="transform">
        <PNumber v-model="count" label="X" />
        <PNumber v-model="count" label="Y" />
        <PFolder title="Nested" name="nested">
          <PText v-model="name" label="Label" />
        </PFolder>
      </PFolder>
    </VPane>

    <VPane style="width: 300px;">
      <PText v-model="name" label="No-title pane" />
    </VPane>

    <VPane title="Slider & Color" style="width: 300px;">
      <PSlider v-model="sliderVal" label="Slider" :min="0" :max="1" :step="0.01" />
      <PColor v-model="color" label="Color" />
    </VPane>

    <VPane title="Point 2D & Graph" style="width: 300px;">
      <PPoint2d v-model="point" label="Point" :min="-2" :max="2" />
      <PGraph :values="graphValues" label="Graph" />
    </VPane>

    <VPane title="Tabs" style="width: 300px;">
      <PTab :tabs="['Settings', 'Info']" v-model="activeTab">
        <template #Settings>
          <PNumber v-model="count" label="Count" :min="0" :max="100" />
          <PCheckbox v-model="enabled" label="Enabled" />
        </template>
        <template #Info>
          <PMonitor :value="name" label="Name" />
          <PMonitor :value="count" label="Count" />
        </template>
      </PTab>
    </VPane>

    <VPane title="Disabled & Hidden" style="width: 300px;">
      <PFolder title="Disabled Folder" :disabled="true">
        <PText v-model="name" label="Name" />
      </PFolder>
      <PFolder title="Normal Folder">
        <PText v-model="name" label="Name" />
      </PFolder>
    </VPane>
  </div>
</template>
<style>
.container {
  padding: 20px;
  background: #1a1a1a;
  min-height: 100vh;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>

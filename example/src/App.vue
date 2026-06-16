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
  PMonitorMultiline,
  PNumber,
  PPoint2d,
  PSelect,
  PSeparator,
  PSlider,
  PTab,
  PText,
  PHeading,
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
    <VPane
      title="Debug"
      style="width: 300px;"
    >
      <div class="vp-tooltip">
        testing
      </div>
      <PText
        v-model="name"
        label="Name"
        tooltip="The display name shown in the output"
      />
      <PNumber
        v-model="count"
        label="Count"
        :min="0"
        :max="100"
        tooltip="Drag or type to adjust. Arrow keys ±1, Shift+Arrow ±10"
      />
      <PNumber
        v-model="speed"
        label="Speed"
        :min="0"
        :max="10"
        :step="0.1"
        tooltip="Playback speed multiplier (0–10)"
      />
      <PSeparator />
      <PCheckbox
        v-model="enabled"
        label="Enabled"
        tooltip="Toggle the effect on or off"
      />
      <PSelect
        v-model="mode"
        :options="modeOptions"
        label="Mode"
        tooltip="Easing function applied to the animation"
      />
      <PButton
        label="Reset"
        tooltip="Restore count and speed to defaults"
        @click="count = 0; speed = 1.5"
      />
      <PMonitor
        :value="`${name} × ${count}`"
        label="Output"
        tooltip="Live computed output value"
      />
      <PMonitorMultiline
        :value="`Name: ${name}\nCount: ${count}\nSpeed: ${speed}`"
        label="Multi"
        tooltip="All current values as a formatted summary"
      />

      <PFolder
        title="Transform"
        name="transform"
        tooltip="Position and rotation controls"
      >
        <PNumber
          v-model="count"
          label="X"
          tooltip="Horizontal offset in units"
        >
          <template #tooltip>
            <h3>Tooltip heading</h3>
            <p>test tooltip content</p>
          </template>
        </PNumber>
        <PHeading label="testing" />
        <PNumber
          v-model="count"
          label="Y"
          tooltip="Vertical offset in units"
        />
        <PFolder
          title="Nested"
          name="nested"
          tooltip="Additional nested controls"
        >
          <PText
            v-model="name"
            label="Label"
            tooltip="Custom label text"
          />
        </PFolder>
      </PFolder>
    </VPane>

    <VPane
      title="Test 2"
      style="width: 300px;"
    >
      <PText
        v-model="name"
        label="No-title pane"
        tooltip="This pane has no collapsible title"
      />
    </VPane>

    <VPane
      title="Slider & Color"
      style="width: 300px;"
    >
      <PSlider
        v-model="sliderVal"
        label="Slider"
        :min="0"
        :max="1"
        :step="0.01"
        tooltip="Drag the track to set a value between 0 and 1"
      />
      <PColor
        v-model="color"
        label="Color"
        tooltip="Click the swatch to open the color picker"
      />
    </VPane>

    <VPane
      title="Point 2D & Graph"
      style="width: 300px;"
    >
      <PPoint2d
        v-model="point"
        label="Point"
        :min="-2"
        :max="2"
        tooltip="Click the crosshair icon to open the 2D canvas picker"
      />
      <PGraph
        :values="graphValues"
        label="Graph"
        tooltip="Sparkline of the last 8 sampled values"
      />
    </VPane>

    <VPane
      title="Tabs"
      style="width: 300px;"
    >
      <PTab
        v-model="activeTab"
        :tabs="['Settings', 'Info']"
        :tooltips="['Configure parameters', 'View current state']"
      >
        <template #Settings>
          <PNumber
            v-model="count"
            label="Count"
            :min="0"
            :max="100"
          />
          <PCheckbox
            v-model="enabled"
            label="Enabled"
          />
        </template>
        <template #Info>
          <PMonitor
            :value="name"
            label="Name"
          />
          <PMonitor
            :value="count"
            label="Count"
          />
        </template>
      </PTab>
    </VPane>

    <VPane
      title="Disabled & Hidden"
      style="width: 300px;"
    >
      <PFolder
        title="Disabled Folder"
        :disabled="true"
      >
        <PText
          v-model="name"
          label="Name"
        />
      </PFolder>
      <PFolder title="Normal Folder">
        <PText
          v-model="name"
          label="Name"
        />
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

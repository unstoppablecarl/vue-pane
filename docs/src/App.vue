<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import DocHeader from './components/DocHeader.vue'
import DocSidebar from './components/DocSidebar.vue'
import SectionGettingStarted from './components/SectionGettingStarted.vue'
import SectionVPane from './components/SectionVPane.vue'
import SectionPFolder from './components/SectionPFolder.vue'
import SectionPLabel from './components/SectionPLabel.vue'
import SectionPText from './components/SectionPText.vue'
import SectionPNumber from './components/SectionPNumber.vue'
import SectionPSlider from './components/SectionPSlider.vue'
import SectionPButton from './components/SectionPButton.vue'
import SectionPSeparator from './components/SectionPSeparator.vue'
import SectionPCheckbox from './components/SectionPCheckbox.vue'
import SectionPSelect from './components/SectionPSelect.vue'
import SectionPMonitor from './components/SectionPMonitor.vue'
import SectionPMonitorMulti from './components/SectionPMonitorMulti.vue'
import SectionPGraph from './components/SectionPGraph.vue'
import SectionPColor from './components/SectionPColor.vue'
import SectionPPoint2d from './components/SectionPPoint2d.vue'
import SectionPTab from './components/SectionPTab.vue'
import SectionTheming from './components/SectionTheming.vue'

// ─── Navigation ───────────────────────────────────────────────────────────────

type NavGroup = { label: string, id?: string, items: { label: string, id: string }[] }

const navGroups: NavGroup[] = [
  {
    label: 'Getting Started',
    id: 'getting-started',
    items: [],
  },
  {
    label: 'Components',
    items: [
      { label: 'VPane', id: 'vpane' },
      { label: 'PFolder', id: 'pfolder' },
      { label: 'PLabel', id: 'plabel' },
      { label: 'PText', id: 'ptext' },
      { label: 'PNumber', id: 'pnumber' },
      { label: 'PSlider', id: 'pslider' },
      { label: 'PButton', id: 'pbutton' },
      { label: 'PSeparator', id: 'pseparator' },
      { label: 'PCheckbox', id: 'pcheckbox' },
      { label: 'PSelect', id: 'pselect' },
    ],
  },
  {
    label: 'Monitors',
    items: [
      { label: 'PMonitor', id: 'pmonitor' },
      { label: 'PMonitorMulti', id: 'pmonitor-multi' },
      { label: 'PGraph', id: 'pgraph' },
    ],
  },
  {
    label: 'Pickers',
    items: [
      { label: 'PColor', id: 'pcolor' },
      { label: 'PPoint2d', id: 'ppoint2d' },
    ],
  },
  {
    label: 'Containers',
    items: [
      { label: 'PTab', id: 'ptab' },
    ],
  },
  {
    label: 'Theming',
    id: 'theming',
    items: [],
  },
]

const allSectionIds = navGroups.flatMap(g =>
  g.id ? [g.id, ...g.items.map(i => i.id)] : g.items.map(i => i.id),
)

const activeSection = ref('getting-started')

// ─── Animated demo state ──────────────────────────────────────────────────────

const monitorVal = ref(0)
const graphValues = ref<number[]>([10, 40, 20, 80, 60, 30, 70, 50])

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    monitorVal.value = +(Math.sin(Date.now() / 800) * 50).toFixed(2)
    graphValues.value = [...graphValues.value.slice(1), +(Math.random() * 100).toFixed(1)]
  }, 300)

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      }
    },
    { rootMargin: '-10% 0px -75% 0px', threshold: 0 },
  )
  for (const id of allSectionIds) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="docs">
    <DocHeader />
    <div class="page">
      <DocSidebar
        :nav-groups="navGroups"
        :active-section="activeSection"
      />
      <main class="main">
        <SectionGettingStarted />
        <SectionVPane />
        <SectionPFolder />
        <SectionPLabel />
        <SectionPText />
        <SectionPNumber />
        <SectionPSlider />
        <SectionPButton />
        <SectionPSeparator />
        <SectionPCheckbox />
        <SectionPSelect />
        <SectionPMonitor :monitor-val="monitorVal" />
        <SectionPMonitorMulti :monitor-val="monitorVal" />
        <SectionPGraph :graph-values="graphValues" />
        <SectionPColor />
        <SectionPPoint2d />
        <SectionPTab />
        <SectionTheming />
      </main>
    </div>
  </div>
</template>

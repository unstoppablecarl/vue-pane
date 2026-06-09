import PButton from './components/PButton.vue'
import PCheckbox from './components/PCheckbox.vue'
import PColor from './components/PColor.vue'
import PFolder from './components/PFolder.vue'
import PGraph from './components/PGraph.vue'
import PLabel from './components/PLabel.vue'
import PMonitor from './components/PMonitor.vue'
import PMonitorMultiline from './components/PMonitorMultiline.vue'
import PNumber from './components/PNumber.vue'
import PPoint2d from './components/PPoint2d.vue'
import PSelect from './components/PSelect.vue'
import PSeparator from './components/PSeparator.vue'
import PSlider from './components/PSlider.vue'
import PTab from './components/PTab.vue'
import PText from './components/PText.vue'
import VPane from './components/VPane.vue'
import { isPollingRef, pollingRef } from './composables/pollingRef.ts'
import { usePolling, usePollingOrModel } from './composables/usePolling.ts'

export type { PaneConfig } from './composables/usePaneConfig'
export { usePaneConfig } from './composables/usePaneConfig'

export {
  VPane,
  PFolder,
  PLabel,
  PText,
  PNumber,
  PButton,
  PSeparator,
  PCheckbox,
  PSelect,
  PMonitor,
  PMonitorMultiline,
  PSlider,
  PTab,
  PColor,
  PGraph,
  PPoint2d,
  pollingRef,
  isPollingRef,
  usePolling,
  usePollingOrModel,
}

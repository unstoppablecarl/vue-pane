import { ref } from 'vue'
import { flip, offset, shift, useFloating } from '@floating-ui/vue'

export function useTooltip() {
  const referenceEl = ref<HTMLElement | null>(null)
  const floatingEl = ref<HTMLElement | null>(null)
  const visible = ref(false)

  const { floatingStyles } = useFloating(referenceEl, floatingEl, {
    placement: 'top-start',
    strategy: 'fixed',
    middleware: [offset(4), flip(), shift({ padding: 8 })],
  })

  function show(e: MouseEvent) {
    referenceEl.value = e.currentTarget as HTMLElement
    visible.value = true
  }

  function hide() {
    visible.value = false
  }

  return { floatingEl, floatingStyles, visible, show, hide }
}

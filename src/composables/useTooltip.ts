import { flip, offset, shift, useFloating } from '@floating-ui/vue'
import { ref, useTemplateRef } from 'vue'

export function useTooltip() {
  const referenceEl = ref<HTMLElement | null>(null)
  const floatingEl = useTemplateRef<HTMLElement>('floatingEl')
  const visible = ref(false)
  const activeText = ref<string | undefined>(undefined)

  const { floatingStyles } = useFloating(referenceEl, floatingEl, {
    placement: 'top-start',
    strategy: 'fixed',
    middleware: [offset(4), flip(), shift({ padding: 8 })],
  })

  function show(e: MouseEvent, text: string) {
    referenceEl.value = e.currentTarget as HTMLElement
    activeText.value = text
    visible.value = true
  }

  function hide() {
    visible.value = false
  }

  return { floatingStyles, visible, activeText, show, hide }
}

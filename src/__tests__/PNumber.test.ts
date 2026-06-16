import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import PNumber from '../components/PNumber.vue'

function mountNumber(props: Record<string, unknown> = {}) {
  return mount(PNumber, {
    props: { modelValue: 0, ...props },
    attachTo: document.body,
  })
}

describe('PNumber', () => {
  describe('rendering', () => {
    it('shows modelValue in the input', () => {
      const w = mountNumber({ modelValue: 42 })
      expect(w.find('input').element.value).toBe('42')
    })

    it('renders label via PLabel', () => {
      const w = mountNumber({ label: 'Speed', modelValue: 1 })
      expect(w.text()).toContain('Speed')
    })

    it('renders the drag knob when not readonly or disabled', () => {
      const w = mountNumber()
      expect(w.find('.vp-text__knob').exists()).toBe(true)
    })

    it('hides the drag knob when readonly', () => {
      const w = mountNumber({ readonly: true })
      expect(w.find('.vp-text__knob').exists()).toBe(false)
    })

    it('hides the drag knob when disabled', () => {
      const w = mountNumber({ disabled: true })
      expect(w.find('.vp-text__knob').exists()).toBe(false)
    })

    it('adds vp--disabled class when disabled', () => {
      const w = mountNumber({ disabled: true })
      expect(w.find('.vp-text').classes()).toContain('vp--disabled')
    })

    it('adds vp-text--readonly class when readonly', () => {
      const w = mountNumber({ readonly: true })
      expect(w.find('.vp-text').classes()).toContain('vp-text--readonly')
    })
  })

  describe('text input / blur', () => {
    it('emits update:modelValue with parsed number on blur', async () => {
      const w = mountNumber({ modelValue: 0 })
      const input = w.find('input')
      await input.setValue('7')
      await input.trigger('blur')
      expect(w.emitted('update:modelValue')?.[0]).toEqual([7])
    })

    it('reverts to current model value on blur with invalid input', async () => {
      const w = mountNumber({ modelValue: 5 })
      const input = w.find('input')
      await input.trigger('focus')
      await input.setValue('abc')
      await input.trigger('blur')
      expect(input.element.value).toBe('5')
    })

    it('clamps to min on blur', async () => {
      const w = mountNumber({ modelValue: 10, min: 5 })
      await w.find('input').setValue('1')
      await w.find('input').trigger('blur')
      expect(w.emitted('update:modelValue')?.[0]).toEqual([5])
    })

    it('clamps to max on blur', async () => {
      const w = mountNumber({ modelValue: 0, max: 100 })
      await w.find('input').setValue('200')
      await w.find('input').trigger('blur')
      expect(w.emitted('update:modelValue')?.[0]).toEqual([100])
    })
  })

  describe('keyboard', () => {
    it('ArrowUp increments by step', async () => {
      const w = mountNumber({ modelValue: 5, step: 2 })
      await w.find('input').trigger('keydown', { key: 'ArrowUp' })
      expect(w.emitted('update:modelValue')?.[0]).toEqual([7])
    })

    it('ArrowDown decrements by step', async () => {
      const w = mountNumber({ modelValue: 5, step: 2 })
      await w.find('input').trigger('keydown', { key: 'ArrowDown' })
      expect(w.emitted('update:modelValue')?.[0]).toEqual([3])
    })

    it('ArrowUp with shift multiplies step by 10', async () => {
      const w = mountNumber({ modelValue: 0, step: 1 })
      await w.find('input').trigger('keydown', { key: 'ArrowUp', shiftKey: true })
      expect(w.emitted('update:modelValue')?.[0]).toEqual([10])
    })

    it('ArrowDown with shift multiplies step by 10', async () => {
      const w = mountNumber({ modelValue: 100, step: 1 })
      await w.find('input').trigger('keydown', { key: 'ArrowDown', shiftKey: true })
      expect(w.emitted('update:modelValue')?.[0]).toEqual([90])
    })

    it('ArrowUp clamps to max', async () => {
      const w = mountNumber({ modelValue: 98, step: 5, max: 100 })
      await w.find('input').trigger('keydown', { key: 'ArrowUp' })
      expect(w.emitted('update:modelValue')?.[0]).toEqual([100])
    })

    it('ArrowDown clamps to min', async () => {
      const w = mountNumber({ modelValue: 2, step: 5, min: 0 })
      await w.find('input').trigger('keydown', { key: 'ArrowDown' })
      expect(w.emitted('update:modelValue')?.[0]).toEqual([0])
    })

    it('Enter triggers blur on the input', async () => {
      const w = mountNumber({ modelValue: 3 })
      const input = w.find('input')
      const blurSpy = vi.spyOn(input.element, 'blur')
      await input.trigger('keydown', { key: 'Enter' })
      expect(blurSpy).toHaveBeenCalled()
    })

    it('does nothing on keydown when disabled', async () => {
      const w = mountNumber({ modelValue: 5, disabled: true })
      await w.find('input').trigger('keydown', { key: 'ArrowUp' })
      expect(w.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('model watcher', () => {
    it('updates localValue when model changes and not focused', async () => {
      const modelValue = ref(1)
      const w = mount(PNumber, {
        props: { modelValue: modelValue.value },
        attachTo: document.body,
      })
      await w.setProps({ modelValue: 99 })
      await nextTick()
      expect(w.find('input').element.value).toBe('99')
    })

    it('does NOT update localValue while input is focused', async () => {
      const w = mount(PNumber, {
        props: { modelValue: 1 },
        attachTo: document.body,
      })
      const input = w.find('input')
      await input.trigger('focus')
      await input.setValue('typing...')
      await w.setProps({ modelValue: 99 })
      await nextTick()
      expect(input.element.value).toBe('typing...')
    })
  })

  describe('drag knob', () => {
    function makePointerEvent(type: string, x: number, overrides: Partial<PointerEvent> = {}) {
      return new PointerEvent(type, { clientX: x, pointerId: 1, bubbles: true, ...overrides })
    }

    it('adds vp-text--dragging class while dragging', async () => {
      const w = mountNumber({ modelValue: 0 })
      const knob = w.find('.vp-text__knob').element
      knob.setPointerCapture = vi.fn()
      knob.dispatchEvent(makePointerEvent('pointerdown', 100))
      await nextTick()
      expect(w.find('.vp-text').classes()).toContain('vp-text--dragging')
    })

    it('removes vp-text--dragging on pointerup', async () => {
      const w = mountNumber({ modelValue: 0 })
      const knob = w.find('.vp-text__knob').element
      knob.setPointerCapture = vi.fn()
      knob.dispatchEvent(makePointerEvent('pointerdown', 100))
      knob.dispatchEvent(makePointerEvent('pointerup', 100))
      await nextTick()
      expect(w.find('.vp-text').classes()).not.toContain('vp-text--dragging')
    })

    it('updates value on pointermove', async () => {
      const w = mountNumber({ modelValue: 10, step: 1 })
      const knob = w.find('.vp-text__knob').element
      knob.setPointerCapture = vi.fn()
      knob.dispatchEvent(makePointerEvent('pointerdown', 100))
      knob.dispatchEvent(makePointerEvent('pointermove', 115))
      await nextTick()
      expect(w.emitted('update:modelValue')?.at(-1)).toEqual([25])
    })

    it('snaps pointermove value to step', async () => {
      const w = mountNumber({ modelValue: 0, step: 5 })
      const knob = w.find('.vp-text__knob').element
      knob.setPointerCapture = vi.fn()
      knob.dispatchEvent(makePointerEvent('pointerdown', 0))
      knob.dispatchEvent(makePointerEvent('pointermove', 7))
      await nextTick()
      expect(w.emitted('update:modelValue')?.at(-1)).toEqual([5])
    })

    it('clamps pointermove value to min/max', async () => {
      const w = mountNumber({ modelValue: 0, min: 0, max: 10, step: 1 })
      const knob = w.find('.vp-text__knob').element
      knob.setPointerCapture = vi.fn()
      knob.dispatchEvent(makePointerEvent('pointerdown', 0))
      knob.dispatchEvent(makePointerEvent('pointermove', 999))
      await nextTick()
      expect(w.emitted('update:modelValue')?.at(-1)).toEqual([10])
    })

    it('ignores pointermove when not dragging', async () => {
      const w = mountNumber({ modelValue: 0, step: 1 })
      const knob = w.find('.vp-text__knob').element
      knob.dispatchEvent(makePointerEvent('pointermove', 50))
      await nextTick()
      expect(w.emitted('update:modelValue')).toBeUndefined()
    })

    it('does not start drag when disabled', async () => {
      const w = mountNumber({ modelValue: 0, disabled: true })
      // knob is not rendered when disabled, so no drag possible
      expect(w.find('.vp-text__knob').exists()).toBe(false)
    })
  })

  describe('tooltipText', () => {
    it('shows integer for step >= 1', () => {
      const w = mountNumber({ modelValue: 3, step: 1 })
      expect(w.find('.vp-text__drag-tooltip').text()).toBe('3')
    })

    it('shows decimals matching step precision', () => {
      const w = mountNumber({ modelValue: 1.25, step: 0.01 })
      expect(w.find('.vp-text__drag-tooltip').text()).toBe('1.25')
    })
  })
})

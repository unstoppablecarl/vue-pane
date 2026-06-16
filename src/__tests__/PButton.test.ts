import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import PButton from '../components/PButton.vue'

function mountButton(props: Record<string, unknown> = {}) {
  return mount(PButton, {
    props: { label: 'Click me', ...props },
    attachTo: document.body,
  })
}

describe('PButton', () => {
  describe('rendering', () => {
    it('renders label text', () => {
      const w = mountButton({ label: 'Save' })
      expect(w.find('.vp-button__label').text()).toContain('Save')
    })

    it('adds vp--disabled class when disabled', () => {
      const w = mountButton({ disabled: true })
      expect(w.find('.vp-button__btn').classes()).toContain('vp--disabled')
    })

    it('sets disabled attribute on button when disabled', () => {
      const w = mountButton({ disabled: true })
      expect((w.find('button').element as HTMLButtonElement).disabled).toBe(true)
    })

    it('does not set disabled attribute when not disabled', () => {
      const w = mountButton()
      expect((w.find('button').element as HTMLButtonElement).disabled).toBe(false)
    })

    it('renders tooltip icon when tooltip prop is provided', () => {
      const w = mountButton({ tooltip: 'Some help text' })
      expect(w.find('.vp-button__label svg').exists()).toBe(true)
    })

    it('does not render tooltip icon without tooltip prop', () => {
      const w = mountButton()
      expect(w.find('.vp-button__label svg').exists()).toBe(false)
    })
  })

  describe('click', () => {
    it('emits click when button is clicked', async () => {
      const w = mountButton()
      await w.find('button').trigger('click')
      expect(w.emitted('click')).toHaveLength(1)
    })
  })

  describe('tooltip', () => {
    it('shows tooltip on mouseenter of icon', async () => {
      const w = mountButton({ tooltip: 'Help text' })
      await w.find('.vp-button__label svg').trigger('mouseenter')
      await nextTick()
      expect(document.body.querySelector('.vp-tooltip')).not.toBeNull()
      expect(document.body.querySelector('.vp-tooltip')?.textContent?.trim()).toBe('Help text')
      w.unmount()
    })

    it('hides tooltip on mouseleave of icon', async () => {
      const w = mountButton({ tooltip: 'Help text' })
      await w.find('.vp-button__label svg').trigger('mouseenter')
      await nextTick()
      await w.find('.vp-button__label svg').trigger('mouseleave')
      await nextTick()
      expect(document.body.querySelector('.vp-tooltip')).toBeNull()
      w.unmount()
    })
  })
})

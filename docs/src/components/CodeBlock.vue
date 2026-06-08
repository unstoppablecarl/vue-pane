<script lang="ts">
import { createHighlighter } from 'shiki'

const hl = createHighlighter({
  themes: ['github-dark'],
  langs: ['vue', 'typescript', 'css', 'bash'],
})
</script>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  code: string
  lang?: string
}>()

const html = ref('')

watchEffect(async () => {
  const highlighter = await hl
  html.value = highlighter.codeToHtml(props.code, {
    lang: props.lang ?? 'vue',
    theme: 'github-dark',
  })
})
</script>

<template>
  <div
    class="hl"
    v-html="html"
  />
</template>

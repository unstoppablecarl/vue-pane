<script setup lang="ts">
import CodeBlock from './CodeBlock.vue'
import { VPane, PLabel } from 'vue-pane'

const codePLabel = `<!-- PLabel pairs any content with a left-hand label -->
<VPane title="Info">
  <PLabel label="Version">
    <span>1.0.0</span>
  </PLabel>
</VPane>`
</script>

<template>
  <section id="plabel">
    <h2><a href="#plabel">PLabel</a></h2>
    <p>A layout primitive that pairs a left-hand label with arbitrary slot content. All input components use <code>PLabel</code> internally — it's also useful for adding custom rows.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePLabel" />
        </div>
        <div class="demo__result">
          <VPane
            title="Info"
            style="width:240px"
          >
            <PLabel label="Version">
              <span style="color:var(--vp-container-foreground-color);font-size:11px;padding:0 6px;font-family:monospace">1.0.0</span>
            </PLabel>
            <PLabel label="License">
              <span style="color:var(--vp-container-foreground-color);font-size:11px;padding:0 6px;font-family:monospace">MIT</span>
            </PLabel>
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>label</code></td><td>string</td><td>Label text on the left side.</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip shown on hover.</td></tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PText, PNumber, PButton } from 'vue-pane'

const textValue = ref('hello world')
const numberRange = ref(50)

const codeThemeCss = `/* Override any --vp-* variable on :root or a parent element */
:root {
  --vp-base-background-color: #1a1a2e;
  --vp-base-border-radius: 4px;
  --vp-container-foreground-color: #e0e0ff;
  --vp-input-background-color: rgba(255,255,255,0.07);
  --vp-button-background-color: #4a4a8a;
  --vp-button-foreground-color: #e0e0ff;
}`

const codeThemeScoped = `<!-- Scoped to a single pane -->
<VPane title="Custom" style="
  --vp-base-background-color: #1a1a2e;
  --vp-container-foreground-color: #e0e0ff;
">
  <PText v-model="name" label="Name" />
</VPane>`
</script>

<template>
  <section id="theming">
    <h2><a href="#theming">Theming</a></h2>
    <p>All visual properties are controlled by CSS custom properties prefixed with <code>--vp-</code>. Override them on <code>:root</code> to apply globally, or on any ancestor element to scope changes to a single pane.</p>

    <h3 id="theming-global">
      <a href="#theming-global">Global override</a>
    </h3>
    <div class="media">
      <div class="code-block">
        <CodeBlock
          :code="codeThemeCss"
          lang="css"
        />
      </div>
    </div>

    <h3 id="theming-scoped">
      <a href="#theming-scoped">Scoped override</a>
    </h3>
    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codeThemeScoped" />
        </div>
        <div class="demo__result">
          <VPane
            title="Custom"
            style="width:240px;
              --vp-base-background-color:#1a1a2e;
              --vp-container-foreground-color:#c8c8ff;
              --vp-input-background-color:rgba(255,255,255,0.08);
              --vp-label-foreground-color:rgba(200,200,255,0.6);
              --vp-button-background-color:#3a3a7a;
              --vp-button-foreground-color:#c8c8ff;"
          >
            <PText
              v-model="textValue"
              label="Name"
            />
            <PNumber
              v-model="numberRange"
              label="Speed"
              :min="0"
              :max="100"
            />
            <PButton
              label="Apply"
              @click="() => {}"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3>CSS variables</h3>
    <table>
      <thead><tr><th>Variable</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>--vp-base-background-color</code></td><td>Pane background color.</td></tr>
        <tr><td><code>--vp-base-border-radius</code></td><td>Outer corner radius of the pane.</td></tr>
        <tr><td><code>--vp-base-font-family</code></td><td>Font family used throughout the pane.</td></tr>
        <tr><td><code>--vp-base-shadow-color</code></td><td>Drop shadow color.</td></tr>
        <tr><td><code>--vp-blade-border-radius</code></td><td>Corner radius of individual rows.</td></tr>
        <tr><td><code>--vp-blade-value-width</code></td><td>Width of the value/input column.</td></tr>
        <tr><td><code>--vp-container-foreground-color</code></td><td>Text color for values and labels.</td></tr>
        <tr><td><code>--vp-container-background-color</code></td><td>Row hover/focus background.</td></tr>
        <tr><td><code>--vp-container-unit-size</code></td><td>Height of a single row.</td></tr>
        <tr><td><code>--vp-input-background-color</code></td><td>Input field background color.</td></tr>
        <tr><td><code>--vp-input-foreground-color</code></td><td>Input field text color.</td></tr>
        <tr><td><code>--vp-label-foreground-color</code></td><td>Label text color.</td></tr>
        <tr><td><code>--vp-button-background-color</code></td><td>Button background color.</td></tr>
        <tr><td><code>--vp-button-foreground-color</code></td><td>Button text color.</td></tr>
        <tr><td><code>--vp-monitor-background-color</code></td><td>Monitor field background color.</td></tr>
        <tr><td><code>--vp-monitor-foreground-color</code></td><td>Monitor field text color.</td></tr>
      </tbody>
    </table>
  </section>
</template>

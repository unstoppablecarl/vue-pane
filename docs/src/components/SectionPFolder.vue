<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PFolder, PText } from 'vue-pane'

const demoText = ref('hello')

const codePFolder = `<VPane title="Debug">
  <PFolder title="Transform">
    <PText v-model="label" label="Label" />
    <PFolder title="Nested">
      <PText v-model="label" label="Inner" />
    </PFolder>
  </PFolder>
</VPane>`
</script>

<template>
  <section id="pfolder">
    <h2><a href="#pfolder">PFolder</a></h2>
    <p>A collapsible group of controls inside a pane. Folders can be nested to any depth and independently persist their expanded state.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePFolder" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PFolder title="Transform">
              <PText
                v-model="demoText"
                label="Label"
              />
              <PFolder title="Nested">
                <PText
                  v-model="demoText"
                  label="Inner"
                />
              </PFolder>
            </PFolder>
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>title</code></td><td>string</td><td>Folder title (required).</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip shown on hover.</td></tr>
        <tr><td><code>id</code></td><td>string</td><td>Key for persisting expanded state. Defaults to <code>title</code>.</td></tr>
        <tr><td><code>disabled</code></td><td>boolean</td><td>Dims and disables all controls inside the folder.</td></tr>
        <tr><td><code>v-model:expanded</code></td><td>boolean</td><td>Two-way binding for open/closed state.</td></tr>
      </tbody>
    </table>
  </section>
</template>

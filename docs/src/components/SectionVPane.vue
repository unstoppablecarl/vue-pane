<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PText } from 'vue-pane'

const demoText = ref('hello')

const codeVPane = `<VPane title="Controls">
  <PText v-model="name" label="Name" />
</VPane>`

const codeVPaneExpanded = `<!-- Two-way bind the open/closed state -->
<VPane title="Controls" v-model:expanded="isOpen">
  <PText v-model="name" label="Name" />
</VPane>`
</script>

<template>
  <section id="vpane">
    <h2><a href="#vpane">VPane</a></h2>
    <p>The root pane container. Wrap all other components inside it. A collapsible header is shown using the required <code>title</code> prop, and expanded state is automatically persisted to <code>localStorage</code>.</p>

    <h3 id="vpane-title">
      <a href="#vpane-title">With title</a>
    </h3>
    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codeVPane" />
        </div>
        <div class="demo__result">
          <VPane
            title="Controls"
            style="width:240px"
          >
            <PText
              v-model="demoText"
              label="Name"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3 id="vpane-expanded">
      <a href="#vpane-expanded">Controlled state</a>
    </h3>
    <p>Use <code>v-model:expanded</code> to read or control the open/closed state programmatically.</p>
    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codeVPaneExpanded" />
        </div>
        <div class="demo__result">
          <VPane
            title="Controls"
            style="width:240px"
          >
            <PText
              v-model="demoText"
              label="Name"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>title</code></td><td>string</td><td>Collapsible header title (required).</td></tr>
        <tr><td><code>id</code></td><td>string</td><td>Storage key for this pane's expanded state. Defaults to <code>title</code>. Nested panes automatically prefix with their parent's path.</td></tr>
        <tr><td><code>disabled</code></td><td>boolean</td><td>Dims and disables pointer events on the pane.</td></tr>
        <tr><td><code>config</code></td><td>PaneConfig</td><td>Override tooltip icon and other shared settings for all children.</td></tr>
        <tr><td><code>v-model:expanded</code></td><td>boolean</td><td>Two-way binding for open/closed state.</td></tr>
      </tbody>
    </table>
  </section>
</template>

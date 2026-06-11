<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PConfig, PText, PFolder } from 'vue-pane'

const demoText = ref('hello')

const codeStorage = `<!-- Override the localStorage namespace and disable persistence -->
<PConfig storage-key="my-app" :storage-enabled="false">
  <VPane title="Controls">
    <PText v-model="name" label="Name" />
  </VPane>
</PConfig>`

const codeExpanded = `<!-- All panes and folders start collapsed -->
<PConfig :expanded-default="false">
  <VPane title="Controls">
    <PFolder title="Transform">
      <PText v-model="name" label="Name" />
    </PFolder>
  </VPane>
</PConfig>`
</script>

<template>
  <section id="pconfig">
    <h2><a href="#pconfig">PConfig</a></h2>
    <p>Provides shared configuration to all <code>VPane</code> and <code>PFolder</code> components in its subtree. Wrap one or more panes with <code>PConfig</code> to configure persistence, default expanded state, and the tooltip icon without repeating props on each component.</p>

    <h3 id="pconfig-storage">
      <a href="#pconfig-storage">Storage</a>
    </h3>
    <p>By default all panes persist their expanded state to <code>localStorage</code> under the key <code>'vue-pane'</code>. Use <code>storage-key</code> to scope to a different namespace, or set <code>:storage-enabled="false"</code> to disable persistence entirely.</p>
    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codeStorage" />
        </div>
        <div class="demo__result">
          <PConfig
            storage-key="my-app"
            :storage-enabled="false"
          >
            <VPane
              title="Controls"
              style="width:240px"
            >
              <PText
                v-model="demoText"
                label="Name"
              />
            </VPane>
          </PConfig>
        </div>
      </div>
    </div>

    <h3 id="pconfig-expanded-default">
      <a href="#pconfig-expanded-default">Default expanded state</a>
    </h3>
    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codeExpanded" />
        </div>
        <div class="demo__result">
          <PConfig :expanded-default="false">
            <VPane
              title="Controls"
              style="width:240px"
            >
              <PFolder title="Transform">
                <PText
                  v-model="demoText"
                  label="Name"
                />
              </PFolder>
            </VPane>
          </PConfig>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>expanded-default</code></td><td>boolean</td><td><code>true</code></td><td>Initial expanded state for all panes and folders that have no persisted state and no <code>v-model:expanded</code>.</td></tr>
        <tr><td><code>storage-enabled</code></td><td>boolean</td><td><code>true</code></td><td>When <code>false</code>, expanded state is not read from or written to <code>localStorage</code>.</td></tr>
        <tr><td><code>storage-key</code></td><td>string</td><td><code>'vue-pane'</code></td><td>The <code>localStorage</code> key used as a namespace for all persisted expanded states in this subtree.</td></tr>
        <tr><td><code>tooltip-icon</code></td><td>Component | null</td><td>built-in icon</td><td>Override the tooltip icon component used by all children. Pass <code>null</code> to hide tooltips.</td></tr>
      </tbody>
    </table>
  </section>
</template>

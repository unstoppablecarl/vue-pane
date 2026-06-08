<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PText, PNumber, PCheckbox, PMonitor } from 'vue-pane'

const heroName = ref('World')
const heroCount = ref(42)
const heroEnabled = ref(true)
const demoText = ref('hello')
const demoCount = ref(42)

const codeInstall = `npm install vue-pane`

const codeImport = `import { VPane, PText, PNumber } from 'vue-pane'
import 'vue-pane/dist/vue-pane.css'`

const codeGettingStarted = `<script setup>
import { ref } from 'vue'
import { VPane, PText, PNumber, PMonitor } from 'vue-pane'
import 'vue-pane/dist/vue-pane.css'

const name = ref('World')
const count = ref(0)
<\/script>
<template>
  <VPane title="Debug">
    <PText v-model="name" label="Name" />
    <PNumber v-model="count" label="Count" :min="0" :max="100" />
    <PMonitor :value="name" label="Output" />
  </VPane>
</template>`
</script>

<template>
  <section id="getting-started">
    <div class="hero">
      <div class="hero__text">
        <h1 class="hero__title">
          vue-pane
        </h1>
        <p>Compact debug pane component library for Vue 3, inspired by Tweakpane. Add rich parameter controls to any Vue app with minimal setup.</p>
      </div>
      <div class="hero__demo">
        <VPane
          title="Debug"
          style="width:240px"
        >
          <PText
            v-model="heroName"
            label="Name"
          />
          <PNumber
            v-model="heroCount"
            label="Count"
            :min="0"
            :max="100"
          />
          <PCheckbox
            v-model="heroEnabled"
            label="Active"
          />
          <PMonitor
            :value="`Hello, ${heroName}!`"
            label="Output"
          />
        </VPane>
      </div>
    </div>

    <h2><a href="#installation">Installation</a></h2>
    <div class="media">
      <div class="code-block">
        <CodeBlock
          :code="codeInstall"
          lang="bash"
        />
      </div>
    </div>

    <h2><a href="#import">Import</a></h2>
    <p>Import the components and stylesheet. Each component is individually importable — only what you use is bundled.</p>
    <div class="media">
      <div class="code-block">
        <CodeBlock
          :code="codeImport"
          lang="typescript"
        />
      </div>
    </div>

    <h2><a href="#usage">Basic usage</a></h2>
    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codeGettingStarted" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PText
              v-model="demoText"
              label="Name"
            />
            <PNumber
              v-model="demoCount"
              label="Count"
              :min="0"
              :max="100"
            />
            <PMonitor
              :value="demoText"
              label="Output"
            />
          </VPane>
        </div>
      </div>
    </div>

    <div class="rel">
      <div class="rel__item">
        <a
          class="rel__anchor"
          href="#vpane"
        >
          <div class="rel__text">
            <div class="rel__title">Components</div>
            <div class="rel__detail">all available pane components</div>
          </div>
          <div class="rel__arrow">→</div>
        </a>
      </div>
      <div class="rel__item">
        <a
          class="rel__anchor"
          href="#theming"
        >
          <div class="rel__text">
            <div class="rel__title">Theming</div>
            <div class="rel__detail">customize colors and sizing</div>
          </div>
          <div class="rel__arrow">→</div>
        </a>
      </div>
    </div>
  </section>
</template>

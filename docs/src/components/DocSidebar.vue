<script setup lang="ts">
defineProps<{
  navGroups: Array<{
    label: string
    id?: string
    items: Array<{ label: string, id: string }>
  }>
  activeSection: string
}>()
</script>
<template>
  <nav class="sidebar">
    <div
      v-for="group in navGroups"
      :key="group.label"
      class="nav-group"
    >
      <a
        v-if="group.id"
        :href="`#${group.id}`"
        class="nav-group__label nav-group__label--link"
        :class="{ 'nav-group__label--active': activeSection === group.id }"
      >{{ group.label }}</a>
      <span
        v-else
        class="nav-group__label"
      >{{ group.label }}</span>
      <ul
        v-if="group.items.length"
        class="nav-group__items"
      >
        <li
          v-for="item in group.items"
          :key="item.id"
        >
          <a
            :href="`#${item.id}`"
            class="nav-item"
            :class="{ 'nav-item--active': activeSection === item.id }"
          >{{ item.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>


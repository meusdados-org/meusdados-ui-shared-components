<script setup lang="ts">

const emit = defineEmits(['open']);

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="expansion-panel-container">
    <div class="expansion-panel-header" v-on:click="emit('open')">
      <slot name="title"></slot>
    </div>
    <div class="expansion-panel-content" :class="{ open: props.open }">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.expansion-panel-container {
  transition: 0.3s ease-in-out;
  background-color: transparent;
  width: 100%;
}

.expansion-panel-header {
  width: 100%;
}

.expansion-panel-header:hover {
  background-color: var(--gray-3);
  cursor: pointer;
}

.title {
  color: var(--blue-1);
  font-weight: 500;
}

.expansion-panel-content {
  max-height: 0;
  overflow: hidden;
  transition: 0.15s ease-in;
}

.expansion-panel-content.open {
  transition: 0.25s ease-out;
  overflow: visible;
  max-height: fit-content;
}
</style>
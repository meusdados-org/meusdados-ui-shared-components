<script setup lang="ts">
import Text1Component from '@/components/shared/Typography/Text/Text1Component.vue';

const emit = defineEmits(['open']);

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: undefined
  }
})
</script>

<template>
  <div class="expansion-panel-container">
    <div class="expansion-panel-header" v-if="title" v-on:click="emit('open')">
      <div class="expansion-panel-title">
        <Text1Component class="title">
          {{ title }}
        </Text1Component>
      </div>
    </div>
    <div class="expansion-panel-content" :class="{ open: !title || props.open }">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style>
.expansion-panel-container {
  transition: 0.3s ease-in-out;
  background-color: transparent;
  border-bottom: 1px solid var(--gray-2);
}

.expansion-panel-header {
  display: flex;
  padding: 1rem 2rem;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-2);
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
  padding: 2rem;
  transition: 0.25s ease-out;
  max-height: fit-content;
}
</style>
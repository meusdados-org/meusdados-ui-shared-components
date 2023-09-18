<script setup lang="ts">
import BodyLarge from '@/components/shared/Typography/Body/BodyLarge.vue';

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
        <BodyLarge class="title">
          {{ title }}
        </BodyLarge>
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
  padding:  var(--spacing-small) var(--spacing-large);
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
  padding: var(--spacing-large);
  transition: 0.25s ease-out;
  max-height: fit-content;
}
</style>
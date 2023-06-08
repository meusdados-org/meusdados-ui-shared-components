<script setup lang="ts">
import Text3Component from '@/components/shared/Typography/Text/Text3Component.vue';
import Icon from '@/components/shared/Icon/Icon.vue';

const props = defineProps({
  type: {
    type: String,
    required: false
  },
  canClose: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: 'var(--gray-3)'
  },
  color: {
    type: String,
    default: 'var(--black);'
  }
});

const emit = defineEmits(['close']);

</script>

<template>
  <span class="tag" :style="{ backgroundColor, color }">
    <Icon class="icon" :align="false" v-if="props.type" :type="props.type" size="12px"/>
    <Text3Component>
      <slot>Texto 1</slot>
    </Text3Component>
    <Icon class="icon close" v-if="props.canClose" type="x" size="12px" @click="emit('close')"/>
  </span>
</template>

<style scoped>
.tag {
  padding: 0 var(--spacing-3);
  border-radius: var(--border-radius-1);
  height: 20px;
  width: fit-content;

  display: flex;
  align-items: center;
  column-gap: var(--spacing-3);
}

.icon {
  position: relative;
  top: 0px;
}

.close {
  cursor: pointer;
}
</style>
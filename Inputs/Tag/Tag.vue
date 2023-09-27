<script setup lang="ts">
import BodySmall from '@/components/shared/Typography/Body/BodySmall.vue';
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
    <BodySmall class="text">
      <slot>Texto 1</slot>
    </BodySmall>
    <Icon class="icon close" v-if="props.canClose" type="x" size="12px" @click="emit('close')"/>
  </span>
</template>

<style scoped>
.tag {
  padding: 0 var(--spacing-xsmall);
  border-radius: var(--border-radius-small);
  height: 20px;
  width: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: var(--spacing-xsmall);
}

.icon {
  position: relative;
  top: 0px;
}

.close {
  cursor: pointer;
}

.text {
  display: flex;
  align-items: center;
  column-gap: var(--spacing-xxsmall);
}
</style>
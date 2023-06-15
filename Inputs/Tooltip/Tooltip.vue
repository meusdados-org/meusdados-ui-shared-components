<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Text3Component from '../../Typography/Text/Text3Component.vue';
import Icon from '@/components/shared/Icon/Icon.vue';

const open = ref<boolean>(false);
const props = defineProps({
  red: {
    type: Boolean,
    default: false
  },
  openToRight: {
    type: Boolean,
    default: false
  },
  fitContent: {
    type: Boolean,
    default: false
  }
})

const switchOpen = () => {
  open.value = !open.value;
}

</script>

<template>
<div class="tooltip-container" @mouseover="open = true" @mouseleave="open = false">
  <slot name="icon">
    <Icon class="help-icon" :class="{ red: props.red }" type="help-circle" size="1rem" />
  </slot>
  <div class="help-text" :class="{ openToRight, fitContent }" v-if="open">
    <Text3Component class="help-text__inner" id="help-text">
      <slot>Lorem ipsum dolor aaaaada asd asd asd asd asd sad aew ad</slot>
    </Text3Component>
  </div>
</div>
</template>

<style scoped>
.tooltip-wrapper {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.tooltip-container {
  position: relative;
}

.red {
  color: var(--red-1) !important;
}

.help-icon:hover {
  color: var(--gray-2);
}

.red:hover {
  color: var(--red-1-low-opacity) !important;
}

.help-text {
  padding: 12px;
  background-color: var(--gray-3);
  width: 182px;
  border-radius: var(--border-radius-1);
  text-align: left;
  position: absolute;
  z-index: 999;
  bottom: 0px;
}

.help-text.fitContent {
  width: fit-content;
}

.help-text__inner {
  display: block;
}

.help-text:not(.openToRight) {
  left: 30px;
}

.help-text.openToRight {
  bottom: -10px;
  right: 20px;
}

.close-help-text {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
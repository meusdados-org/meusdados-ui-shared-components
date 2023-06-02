<script setup lang="ts">
import { ref } from 'vue';
import ButtonLink from '../Button/ButtonLink.vue';
import Text3Component from '../Font/Text/Text3Component.vue';
import Icon from '../Icon/Icon.vue';

const open = ref<boolean>(false);
const props = defineProps({
  red: {
    type: Boolean,
    default: false
  },
  openToRight: {
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
  <Icon class="help-icon" :class="{ red: props.red }" type="help-circle" size="1rem" />
  <div class="help-text" :class="{ openToRight }" v-if="open">
    <Text3Component>
      <slot>Lorem ipsum dolor aaaaada asd asd asd asd asd sad aew ad</slot>
      <Icon class="close-help-text" type="x" size="8px" v-on:click="switchOpen"/>
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
  width: 182px;
  background-color: var(--gray-3);
  border-radius: var(--border-radius-1);
  text-align: left;
  position: absolute;
  z-index: 999;
  bottom: 0px;
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
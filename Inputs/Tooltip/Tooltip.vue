<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BodySmall from '../../Typography/Body/BodySmall.vue';
import Icon from '@/components/shared/Icon/Icon.vue';

const open = ref<boolean>(false);
const tooltipContainerRef = ref<HTMLElement | null>(null);
const tooltipHelpTextRef = ref<HTMLElement | null>(null);
const props = defineProps({
  red: {
    type: Boolean,
    default: false
  },
  fitContent: {
    type: Boolean,
    default: false
  },
  adjustTop: {
    type: Boolean,
    default: false
  }
})

const switchOpen = (value) => {
  open.value = value;
}



// Method to position the tooltip
const positionTooltip = () => {
  if (tooltipHelpTextRef.value) {
    const iconElement = tooltipHelpTextRef.value.parentElement;
    const iconRect = iconElement.getBoundingClientRect();
    const tooltipContainerRect = tooltipHelpTextRef.value.getBoundingClientRect();
    const tooltipStyle = tooltipHelpTextRef.value.style;

    // Calculate the top and left positions based on the icon position and tooltip dimensions
    const tooltipTop = iconRect.top - tooltipContainerRect.height - 20; // Adjust this value as needed
    const tooltipLeft = iconRect.left + 21;

    tooltipStyle.top = `${tooltipTop}px`;
    tooltipStyle.left = `${tooltipLeft}px`;
  }
};
// Call the positionTooltip method when the tooltip is opened
onMounted(positionTooltip);

</script>

<template>
<div class="tooltip-container" ref="tooltipContainerRef" @mouseover="switchOpen(true)" @mouseleave="switchOpen(false)">
  <slot name="icon">
    <Icon class="help-icon" :class="{ red: props.red }" type="help-circle" size="12px" />
  </slot>
  <div class="help-text" ref="tooltipHelpTextRef" :class="{ fitContent, adjustTop, open }">
    <BodySmall class="help-text__inner" id="help-text">
      <slot>Lorem ipsum dolor aaaaada asd asd asd asd asd sad aew ad</slot>
    </BodySmall>
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
  display: inline-block;
  --tooltip-offset: 50%;
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
  border-radius: var(--border-radius-small);
  position: fixed;
  text-align: left;
  z-index: 999;
  left: calc(var(--tooltip-offset, 0) - var(--spacing-xsmall));
  display: none;
}

.help-text.open {
  display: block;
}

.help-text.fitContent {
  width: fit-content;
}

.help-text__inner {
  display: block;
}



.close-help-text {
  position: absolute;
  top: var(--spacing-xsmall);
  right: var(--spacing-xsmall);
}
</style>
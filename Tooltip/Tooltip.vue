<script setup lang="ts">
import { ref } from 'vue';
import ButtonLink from '../Button/ButtonLink.vue';
import Text3Component from '../Font/Text/Text3Component.vue';
import Icon from '../Icon/Icon.vue';

const open = ref<boolean>(false);
</script>

<template>
<div class="tooltip-wrapper" @click="open = false">
</div>
<div class="tooltip-container" @click.stop="">
  <ButtonLink class="help-icon" v-on:click="open = !open" :border-bottom="false">
    <Icon type="help-circle" size="1rem"/>
  </ButtonLink>
  <div class="help-text" v-if="open">
    <Text3Component>
      <slot name="text">Lorem ipsum dolor aaaaada asd asd asd asd asd sad aew ad</slot>
      <Icon class="close-help-text" type="x" size="6px" v-on:click="open = false"/>
    </Text3Component>
  </div>
</div>
</template>

<style scoped>
.tooltip-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
.tooltip-container {
  display: flex;
  width: fit-content;
  position: relative;
}

.help-icon:hover {
  color: var(--gray-2);
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
  left: 30px;
}

.close-help-text {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
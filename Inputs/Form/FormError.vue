<script setup>
import Text3Component from '../../Typography/Text/Text3Component.vue';
</script>

<template>
  <div class="form-error">
    <Text3Component>
      <slot></slot>
    </Text3Component>
  </div>
</template>

<style lang="scss" scoped>
.form-error {
  display: inline-flex;
  padding: 4px;
  align-items: flex-start;
  gap: 10px;
  width: fit-content;

  flex: 0;

  text-align: left;

  background-color: var(--red-1-low-opacity);
  color: var(--red-1);
}
</style>
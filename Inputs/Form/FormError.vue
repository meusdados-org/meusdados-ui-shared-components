<script setup>
import BodySmall from '../../Typography/Body/BodySmall.vue';
</script>

<template>
  <div class="form-error">
    <BodySmall>
      <slot></slot>
    </BodySmall>
  </div>
</template>

<style lang="scss" scoped>
.form-error {
  display: inline-flex;
  padding: var(--spacing-xxsmall);
  align-items: flex-start;
  gap: 10px;
  width: fit-content;

  flex: 0;

  text-align: left;

  background-color: var(--red-1-low-opacity);
  color: var(--red-1);
}
</style>
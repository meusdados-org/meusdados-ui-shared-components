<script setup>
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import Icon from '@/components/shared/Icon/Icon.vue';
</script>

<template>
  <button class="drag-add" type="button">
    <BodyMedium class="drag-add-text">
      <Icon type="plus" stroke-width="1" :align="false" /> <slot></slot>
    </BodyMedium>
  </button>
</template>

<style scoped>
.drag-add {
  background-color: var(--white);
  box-shadow: var(--box-shadow-1);
  border: none;
  border-radius: var(--border-radius-1);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  width: 100%;
  outline: 2px solid var(--black-1);
  height: 47px;
}

.drag-add-text {
  display: flex;
  align-items: center;
  width: fit-content;
  column-gap: .5rem;
  color: var(--black);
}

.drag-add:hover {
  cursor: pointer;
}

.drag-add:hover > .drag-add-text {
  color: var(--purple-1);
}

.drag-add:focus {
  outline: 2px solid var(--black);
  outline-offset: var(--spacing-1);
}
</style>
<script setup>
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import Icon from '@/components/shared/Icon/Icon.vue';
import ButtonLink from '../../Actions/ButtonLink.vue';
</script>

<template>
  <button class="drag-add" type="button">
    <ButtonLink class="drag-add-text" type="plus">
      <slot></slot>
    </ButtonLink>
  </button>
</template>

<style scoped>
.drag-add {
  background-color: var(--white);
  box-shadow: var(--box-shadow-1);
  border: none;
  border-radius: var(--border-radius-small);

  display: flex;
  justify-content: center;
  align-items: center;

  padding:  var(--spacing-small);
  width: 100%;
  outline: var(--spacing-xxxsmall) solid var(--black-1);
  height: 47px;
}

.drag-add-text {
  display: flex;
  align-items: center;
  width: fit-content;
  column-gap: var(--spacing-xsmall);
  color: var(--black);
}

.drag-add:hover {
  cursor: pointer;
}

.drag-add:hover > .drag-add-text {
  color: var(--purple-1);
}

.drag-add:focus {
  outline: var(--spacing-xxxsmall) solid var(--black);
  outline-offset: var(--spacing-xxxsmall);
}
</style>
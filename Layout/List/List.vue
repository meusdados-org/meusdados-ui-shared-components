<script setup lang="ts">

const props = defineProps({
  itemList: {
    type: Array<any>
  },
})

function isLastItem(index: number) {
  return index === props.itemList.length - 1;
}
</script>

<template>
  <div class="list-component">
    <template  v-for="(item, i) in itemList" :key="i">
      <div class="list-component__item">
        <slot :item="item"></slot>
      </div>
      <hr class="list-component__separator" v-if="!isLastItem(i)"/>
    </template>
  </div>
</template>

<style scoped lang="scss">
.list-component {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-small);
  background-color: var(--white);
  border-radius: var(--border-radius-small);
  padding: var(--spacing-small) 0;
  overflow-y: auto;

  &__item {
    padding: var(--spacing-xsmall) var(--spacing-large);
  }

  &__separator {
    border: none;
    border-bottom: 1px solid var(--gray-3);
    width: 100%;
  }
}
</style>

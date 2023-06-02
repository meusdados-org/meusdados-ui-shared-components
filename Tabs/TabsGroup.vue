<script setup>
import Text2Component from '../Font/Text/Text2Component.vue';

</script>
<template>
  <div class="tab-group">
    <div class="tab-title">
      <Text2Component>
        <slot name="title"></slot>
      </Text2Component>
    </div>
    <div class="tab-items">
      <slot name="items"></slot>
    </div>
  </div>
</template>

<style scoped>
.tab-group {
  padding: .5rem 0;
  border-bottom: 1px solid var(--gray-3);
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.tab-title {
  color: var(--gray-2);
  text-align: left;
}

.tab-items {
  display: flex;
  width: fit-content;
  align-items: center;
  column-gap: 1rem;
}
</style>
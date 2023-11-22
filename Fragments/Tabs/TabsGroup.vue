<script setup>
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';

</script>
<template>
  <div class="tab-group">
    <div class="tab-title">
      <BodyMedium>
        <slot name="title"></slot>
      </BodyMedium>
    </div>
    <div class="tab-items">
      <slot name="items"></slot>
    </div>
  </div>
</template>

<style scoped>
.tab-group {
  padding: var(--spacing-xsmall) 0;
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
  column-gap:  var(--spacing-small);
}

@media (max-width: 768px) {
  .tab-items {
    justify-content: space-evenly;
    width: 100%;
  }
}
</style>
<script setup>
import Text3Component from '../Font/Text/Text3Component.vue';
import Icon from '../Icon/Icon.vue';


const props = defineProps({
  fileName: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="fragment-attachment-container">
    <Icon type="download"/>
    <Text3Component>{{ fileName }}</Text3Component>
  </div>
</template>


<style scoped>
.fragment-attachment-container {
  display: flex;
  justify-content: left;
  text-align: left;
  min-width: 108px;
  width: fit-content;
  flex-direction: column;
  row-gap: .5rem;
  padding: .5rem;
  background-color: var(--gray-3);
  border-radius: var(--border-radius-1);
  color: var(--black);
}
</style>
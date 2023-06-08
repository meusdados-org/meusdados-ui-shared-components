<script setup lang="ts">
import InputRadio from './InputRadio.vue';

const props = defineProps({
  value: {
    type: String
  },
  options: {
    type: Array<String>,
    default: []
  }
});

const emit = defineEmits(['uValue'])

const updateValue = (option: string) => {
  emit('uValue', option);
}

</script>

<template>
<div class="radio">
  <InputRadio v-for="option in props.options" :key="option" :label="option" :value="props.value" @updateLabel="updateValue"/>
</div>
</template>
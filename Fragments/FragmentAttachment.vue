<script setup>
import { ref } from 'vue';
import BodySmall from '@/components/shared/Typography/Body/BodySmall.vue';
import Icon from '@/components/shared/Icon/Icon.vue';

const emit = defineEmits(['download', 'close'])

const props = defineProps({
  fileName: {
    type: String,
    required: true,
  },
  base64_: {
    type: Promise,
    required: false,
  },
  close: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const base64 = ref(null);
if (props.base64_) {
  props.base64_.then((base64_) => {
    base64.value = base64_;
  })
}

</script>

<template>
  <div class="fragment-attachment-container" :class="{ withBackground: base64 }">
    <img v-if="base64_" :src="`${base64}`" alt="Imagem do anexo" width="100%" class="background-img"/>
    <Icon class="icon" v-if="!close" v-on:click="emit('download')" type="download"/>
    <div class="icon-close-wrapper" v-else>
      <Icon class="icon" v-on:click="emit('close')" type="x"/>
    </div>
    <BodySmall style="z-index: 1; flex: 1;">{{ fileName }}</BodySmall>
  </div>
</template>


<style scoped>
.fragment-attachment-container {
  display: flex;
  justify-content: left;
  text-align: left;
  min-width: 4rem;
  max-width: var(--spacing-xxxlarge);
  width: fit-content;
  flex-direction: column;
  word-break: break-all;
  row-gap: var(--spacing-xsmall);
  padding: var(--spacing-xsmall);
  background-color: var(--gray-3);
  border-radius: var(--border-radius-small);
  color: var(--black);
  position: relative;
  overflow: hidden;
}

.fragment-attachment-container.withBackground {
  background-color: var(--black);
  color: var(--white);
}

.background-img {
  position: absolute;
  border-radius: var(--border-radius-small);
  width: 110%;
  top: calc(var(--spacing-xsmall) * -1);
  left: calc(var(--spacing-xsmall) * -1);
  z-index: 0;
  opacity: .5;
}

.icon {
  cursor: pointer;
}

.icon-close-wrapper {
  display: flex;
  justify-content: flex-end;
}

</style>
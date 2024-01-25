<script setup>
import CollabComment from './CollabComment.vue';

const emit = defineEmits(['download']);

const props = defineProps({
  mensagens: {
    type: Array,
    default: [

    ]
  }
})

const isTheLastComment = (index) => {

  return index === props.mensagens?.length - 1;
}

const download = (mensagemId, filename) => {
  emit('download', mensagemId, filename)
}
</script>

<template>
  <div class="collab-chat">
    <template v-for="(mensagem, index) in mensagens" :key="mensagem.id">
      <CollabComment @download="download" :mensagem="mensagem"/>
      <hr class="collab-chat-separator" v-if="!isTheLastComment(index)" />
    </template>
  </div>
</template>

<style scoped>
.collab-chat {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column-reverse;
  row-gap: var(--spacing-large);
}

.collab-chat-separator {
  height: 1px;
  background-color: var(--gray-3);
  width: 615px;
  border: none;
  flex-shrink: 0;
}
</style>
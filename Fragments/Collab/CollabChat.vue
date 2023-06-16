<script setup>
import CollabComment from './CollabComment.vue';

const emit = defineEmits(['download']);

const props = defineProps({
  mensagens: {
    type: Array,
    default: [
      {
        id: 2,
        externo: true,
        mensagem: '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>',
        data: '29/11/2022',
        hora: '14:44',
        usuario: {
          nome: 'Carol Gonçalves'
        },
        attachments: []
      },
      {
        id: 1,
        externo: false,
        mensagem: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
        data: '29/11/2022',
        hora: '14:44',
        usuario: {
          nome: 'Regis'
        },
        attachments: [
          {
            name: 'loremipsum.xls'
          }
        ]
      }
    ]
  }
})

const isTheLastComment = (index) => {
  console.log(index === props.mensagens?.length - 1)
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
  display: flex;
  flex-direction: column-reverse;
  row-gap: 2rem;
}

.collab-chat-separator {
  height: 1px;
  background-color: var(--gray-3);
  width: 615px;
  border: none;
  flex-shrink: 0;
}
</style>
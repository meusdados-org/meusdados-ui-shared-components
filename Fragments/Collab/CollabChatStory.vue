<script setup>
import FragmentTaskList from '../FragmentTaskList.vue';
import CollabChat from './CollabChat.vue';

const emit = defineEmits(['download']);

const props = defineProps({
  dataAbertura: {
    type: String,
    default: '29/11/2022 - 14:44'
  },
  log: {
    type: Array,
    default: [
      {
        'mensagens': [
          {
            id: 2,
            externo: true,
            mensagem: '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>',
            data: '29/11/2022',
            hora: '14:44',
            usuario: {
              nome: 'Thiago Libonati'
            },
            attachments: []
          }
        ]
      },
      {
        'taskList': {
          'Aguardando confirmação de abertura de e-mail.': {
            'status': true,
            'data': '30/11/2022 8:20'
          },
          'Aguardando cadastro da empresa.': {
            'status': true,
            'data': '30/11/2022 8:20'
          },
          'Aguardando verificação da empresa.': {
            'status': true,
            'data': '30/11/2022 8:20'
          },
          'Aguardando primeira resposta da empresa.': {
            'status': true,
            'data': '30/11/2022 8:20',
            'tooltip': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam eget nunc aliquam vestibulum. Sed vitae diam eget nunc aliquam vestibulum.'
          },
          'Empresa verificada': {
            'status': false,
            'data': '01/12/2022 9:45'
          },
          'Empresa cadastrada': {
            'status': false,
            'data': '01/12/2022 9:45'
          },
        }
      },
      {
        'mensagens': [
          {
            id: 1,
            externo: false,
            mensagem: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt',
            data: '29/11/2022',
            hora: '14:44',
            usuario: {
              nome: 'Caroline Postana'
            },
            attachments: ['loremipsum.xls'
            ]
          }
        ]
      },
      {
        'taskList': {
          'Tipo de Solicitação - Alterado de "requisição de dados" para "retificação"': {
            'customIcon': 'edit-3',
            'status': true,
            'data': '01/12/2022 9:45'
          },
          'Status - Atualizado de "fechado" para "aberto"': {
            'customIcon': 'edit-3',
            'status': true,
            'data': '01/12/2022 9:45'
          },
        }
      }
    ]
  }
})

const aberturaTaskList = {
  'Solicitação aberta': {
    'customIcon': 'file-text',
    'status': true,
    'data': props.dataAbertura,
  }
}

const isLastItem = (index) => {
  return index === props.log?.length - 1;
}

</script>

<template>
  <div class="collab-story">
    <FragmentTaskList :taskList="aberturaTaskList" :collabVersion="true" />
    <template v-for="(story, index) in log" :key="index">
      <template v-if="story.mensagens">
        <CollabChat :mensagens="story.mensagens" @download="emit('download')"/>
      </template>
      <template v-else-if="story.taskList">
        <FragmentTaskList :taskList="story.taskList" :collabVersion="true"/>
      </template>
      <hr class="collab-story-separator" v-if="!isLastItem(index)" />
    </template>
  </div>
</template>


<style scoped>
.collab-story {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-medium);
}

.collab-story > * {
  flex-shrink: 0;
}
</style>

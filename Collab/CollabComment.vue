<script setup>
import { ref, onMounted } from 'vue';
import Tag from '../Tag/Tag.vue';
import Title4Component from '../Font/Title/Title4Component.vue';
import Text3Component from '../Font/Text/Text3Component.vue';
import FragmentAttachment from '../Fragments/FragmentAttachment.vue';


const props = defineProps({
  mensagem: {
    type: Object,
    default: {
      externo: true,
      texto: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
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
  }
});

const tagProps = ref({
  backgroundColor: props.mensagem.externo ? 'var(--purple-1)' : 'var(--blue-1)',
  color: 'var(--white)'
});

</script>

<template>
  <div class="collab-comment">
    <div class="collab-comment-header">
      <Tag v-bind="tagProps"><Title4Component class="externo-tag" v-if="mensagem.externo">Titular:</Title4Component> {{ mensagem.usuario.nome }}</Tag>
      <Text3Component>{{ mensagem.data }}</Text3Component>
      <Text3Component>{{ mensagem.hora }}</Text3Component>
    </div>
    <div
      class="collab-comment-content"
      v-html="mensagem.texto"
    />
    <div class="collab-comment-attachments" v-if="mensagem.attachments.length > 0">
      <FragmentAttachment v-for="attachment in mensagem.attachments" :key="attachment.name" :file-name="attachment.name"/>
    </div>
  </div>
</template>

<style scoped>
.collab-comment {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  max-width: 623px;
}

.collab-comment-header {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

.collab-comment-content {
  font-size: 14px;
  text-align: left;
}

.collab-comment-attachments {
  display: flex;
  column-gap: .5rem;
}

.externo-tag {
  font-size: 12px;
}
</style>

<script setup>
import { computed } from 'vue';
import Tag from '@/components/shared/Inputs/Tag/Tag.vue';
import Title4Component from '@/components/shared/Typography/Title/Title4Component.vue';
import Text3Component from '@/components/shared/Typography/Text/Text3Component.vue';
import FragmentAttachment from '@/components/shared/Fragments/FragmentAttachment.vue';

const emit = defineEmits(['download']);

const props = defineProps({
  mensagem: {
    type: Object,
    default: {
      externo: true,
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
  }
});

const tagProps = computed(() => {
  return {
    backgroundColor: props.mensagem.externo ? 'var(--purple-1)' : 'var(--blue-1)',
    color: 'var(--white)'
  }
});

</script>

<template>
  <div class="collab-comment">
    <div class="collab-comment-header">
      <Tag v-bind="tagProps"><Title4Component class="externo-tag" v-if="mensagem.externo">Titular:</Title4Component> <Text3Component class="collab-comment-user">{{ mensagem.usuario.nome }}</Text3Component></Tag>
      <Text3Component style="color: var(--gray-1);">{{ mensagem.data }}</Text3Component>
      <Text3Component style="color: var(--gray-1);">{{ mensagem.hora }}</Text3Component>
    </div>
    <div
      class="collab-comment-content"
      v-html="mensagem.mensagem"
    />
    <div class="collab-comment-attachments" v-if="mensagem.attachments.length > 0">
      <FragmentAttachment @download="emit('download', mensagem.id, attachment)" v-for="attachment in mensagem.attachments" :key="attachment" :file-name="attachment"/>
    </div>
  </div>
</template>

<style scoped>
.collab-comment {
  display: flex;
  flex-direction: column;
  max-width: 623px;
  row-gap: 1rem;
}

.collab-comment-header {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

.collab-comment-content {
  width: 623px;
  font-size: 14px;
  text-align: left;
  word-break: break-all;
  overflow: hidden;
}

.collab-comment-content > * {
  width: 623px;
  word-break: break-all;
}

.collab-comment-content > p > img {
  max-width: 300px;
}

.collab-comment-attachments {
  display: flex;
  column-gap: .5rem;
}

.externo-tag {
  font-size: 12px;
}

.collab-comment-user {
  line-height: 200%;
}
</style>

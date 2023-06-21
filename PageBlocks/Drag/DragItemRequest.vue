<script setup>
import { Draggable } from 'vue3-smooth-dnd';
import { dataConversorShortYear } from '@/utils/data';
import Text3Component from '@/components/shared/Typography/Text/Text3Component.vue';
import Title4Component from '@/components/shared/Typography/Title/Title4Component.vue';
import Tag from '@/components/shared/Inputs/Tag/Tag.vue';
import FragmentIndicatorBullet from '@/components/shared/Fragments/FragmentIndicatorBullet.vue';

defineProps({
  solicitacao: {
    type: Object,
    default: {
      request_id: 'AD001',
      prioridade: 'Alta',
      titular: {
        nome: 'Lorem Ipsum',
        verificado: true
      },
      tipo_solicitacao: 'Acesso aos Dados',
      data_abertura: '21/03/23',
      atrasado: true,
    }
  },
  mini: {
    type: Boolean,
    default: false
  },
  isTitular: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <Draggable :class="{'item-drag-handle': !isTitular}">
    <div class="drag-item-request">
      <div class="drag-item-request-header">
        <Text3Component v-if="!mini">{{ solicitacao.request_id }}</Text3Component>
        <div class="drag-item-request-indicators">
          <Tag background-color="var(--red-1)" color="var(--white)" v-if="solicitacao.atrasado">Atrasado</Tag>
          <FragmentIndicatorBullet :prioridade="solicitacao.prioridade" v-if="solicitacao.titular?.verificado && !mini && !isTitular"/>
          <Tag v-else-if="!solicitacao.titular?.verificado && !isTitular">Não verificado</Tag>
        </div>
      </div>
      <div class="drag-item-request-content">
        <Title4Component v-if="!isTitular">{{ solicitacao.titular?.nome }} {{ solicitacao.titular?.sobrenome }}</Title4Component>
        <Title4Component v-else>{{ solicitacao.empresa?.razao_social }}</Title4Component>
        <Tag background-color="var(--red-1)" color="var(--white)" v-if="mini && solicitacao.atrasado">Atrasado</Tag>
      </div>
      <div class="drag-item-request-footer">
        <Text3Component>{{ solicitacao.tipo_solicitacao }}</Text3Component>
        <Text3Component>{{ dataConversorShortYear(solicitacao.data_abertura) }}</Text3Component>
      </div>
    </div>
  </Draggable>
</template>

<style scoped>
.item-drag-handle:active {
  cursor: grab !important;
  outline: 2px solid var(--black);
  border-radius: var(--border-radius-1);
}

.drag-item-request {
  padding: 1rem;
  flex: 1;
  background-color: var(--white);
  box-shadow: var(--box-shadow-1);
  border-radius: var(--border-radius-1);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 2;
}

.drag-item-request:hover {
  cursor: pointer;
}

.drag-item-request-header, .drag-item-request-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drag-item-request-indicators {
  display: flex;
  width: fit-content;
  align-items: center;
  column-gap: .5rem;
}

.drag-item-request-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
}
</style>
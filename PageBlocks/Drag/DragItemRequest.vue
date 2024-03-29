<script setup>
import { Draggable } from 'vue3-smooth-dnd';
import { dataConversorShortYear } from '@/utils/data';
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
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
        <BodyMedium v-if="!mini">{{ solicitacao.request_id }}</BodyMedium>
        <div class="drag-item-request-indicators">
          <Tag background-color="var(--red-1)" color="var(--white)" v-if="solicitacao.atrasado && !mini">Atrasado</Tag>
          <FragmentIndicatorBullet :prioridade="solicitacao.prioridade" v-if="solicitacao.titular?.verificado && !mini && !isTitular"/>
          <Tag v-else-if="!solicitacao.titular?.verificado && !isTitular">Não verificado</Tag>
        </div>
      </div>
      <div class="drag-item-request-content">
        <BodyMedium v-if="!isTitular" strong>{{ solicitacao.titular?.nome }} {{ solicitacao.titular?.sobrenome }}</BodyMedium>
        <BodyMedium v-else strong>{{ solicitacao.empresa?.razao_social }}</BodyMedium>
        <Tag background-color="var(--red-1)" color="var(--white)" v-if="mini && solicitacao.atrasado">Atrasado</Tag>
      </div>
      <div class="drag-item-request-footer">
        <BodyMedium>{{ solicitacao.tipo_solicitacao }}</BodyMedium>
        <BodyMedium>{{ dataConversorShortYear(solicitacao.data_abertura) }}</BodyMedium>
      </div>
    </div>
  </Draggable>
</template>

<style scoped>
.item-drag-handle:active {
  cursor: grab !important;
  outline: var(--spacing-xxxsmall) solid var(--black);
  border-radius: var(--border-radius-small);
}

.drag-item-request {
  padding:  var(--spacing-small);
  flex: 1;
  background-color: var(--white);
  box-shadow: var(--box-shadow-1);
  border-radius: var(--border-radius-small);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxsmall);
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
  column-gap: var(--spacing-xsmall);
}

.drag-item-request-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
}

@media (max-width: 768px) {
  .drag-item-request {
    padding:  var(--spacing-xsmall);
  }
}
</style>
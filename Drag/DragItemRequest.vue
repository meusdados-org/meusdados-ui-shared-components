<script setup>
import { Draggable } from 'vue3-smooth-dnd';
import Text3Component from '../Font/Text/Text3Component.vue';
import Title4Component from '../Font/Title/Title4Component.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import Tag from '../Tag/Tag.vue';
import FragmentIndicatorBullet from '../Fragments/FragmentIndicatorBullet.vue';

defineProps({
  solicitacao: {
    type: Object,
    default: {
      request_id: 'AD001',
      prioridade: 'Alta',
      titular_verificado: true,
      titular: {
        nome: 'Lorem Ipsum',
      },
      tipo_solicitacao: 'Acesso aos Dados',
      data_solicitacao: '21/03/23',
      atrasado: true,
    }
  }
})

</script>

<template>
  <Draggable class="item-drag-handle">
    <div class="drag-item-request">
      <div class="drag-item-request-header">
        <Text3Component>{{ solicitacao.request_id }}</Text3Component>
        <div class="drag-item-request-indicators">
          <Tag background-color="var(--red-1)" color="var(--white)">Atrasado</Tag>
          <FragmentIndicatorBullet :prioridade="solicitacao.prioridade" v-if="solicitacao.titular_verificado"/>
          <Tag v-else>Não verificado</Tag>
        </div>
      </div>
      <div class="drag-item-request-content">
        <Title4Component>{{ solicitacao.titular?.nome }}</Title4Component>
      </div>
      <div class="drag-item-request-footer">
        <Text3Component>{{ solicitacao.tipo_solicitacao }}</Text3Component>
        <Text3Component>{{ solicitacao.data_solicitacao }}</Text3Component>
      </div>
    </div>
  </Draggable>
</template>

<style scoped>
.item-drag-handle:active {
  cursor: grab;
  outline: 2px solid var(--black);
  border-radius: var(--border-radius-1);
}

.drag-item-request {
  padding: 1rem;
  width: 256px;
  background-color: var(--white);
  box-shadow: var(--box-shadow-1);
  border-radius: var(--border-radius-1);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 2;
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
  text-align: left;
}
</style>
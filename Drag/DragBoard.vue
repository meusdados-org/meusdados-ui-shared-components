<template>
  <div class="board">
    <TabsGroup>
      <template #title>
        Solicitações
      </template>
      <template #items>
        <TabsItem>
          Comentários Internos
        </TabsItem>
        <TabsItem :active="true">
          Comentários Externos
        </TabsItem>
      </template>
    </TabsGroup>
    <Container class="orientador-colunas" orientation="horizontal" @drop="onColumnDrop" drag-handle-selector=".column-drag-handle" :drop-placeholder="upperDropPlaceHolder">
      <DragColumn v-for="(column, i) in scene.children" :index="i" :scene="scene" :key="column.id" :title="column.name" :column="column" :items="column.solicitacoes"/>
      <DragAdd class="nova-etapa">
        Nova Etapa
      </DragAdd>
    </Container>
  </div>
</template>

<script>
import DragColumn from '@/components/shared/Drag/DragColumn.vue';
import { Container } from 'vue3-smooth-dnd';
import { applyDrag } from './helpers';
import DragAdd from './DragAdd.vue';
import TabsGroup from '../Tabs/TabsGroup.vue';
import TabsItem from '../Tabs/TabsItem.vue';

export default {
  name: 'SolicitacoesTableView',
  components: {
    DragColumn,
    Container,
    DragAdd,
    TabsGroup,
    TabsItem
},
  props: {
    scene: {
      type: Object,
      required: true
    }
  },
  data() {
      return {
          upperDropPlaceholderOptions: {
              className: 'cards-drop-preview',
              animationDuration: '150',
              showOnTop: true
          },
      }
  },
  methods: {
      getFluxos(fluxos) {
          this.fluxos = fluxos
      },
      updateSearch(search) {
          this.search = search;
      },
      onColumnDrop (dropResult) {
          // const currentColumnPosition = dropResult.removedIndex
          // const newColumnPosition = dropResult.addedIndex
          const scene = Object.assign({}, this.scene);
          // const column = scene.children[currentColumnPosition];
          scene.children = applyDrag(scene.children, dropResult)
          this.scene.children = scene.children;
          // new EtapaService(localStorage).update(column.id, { posicao: newColumnPosition + 1 }).then(() => {
          //     this.scene = scene
          // }).catch(error => {
          //     this.$dialog({ title: 'Não autorizado!', message: error.response.data.error_message, type: 'error'});
          // })
      }
  },
};
</script>

<style scoped>
.orientador-colunas {
  border-collapse: separate;
  margin-left: -14px;
  margin-right: -14px;
  border-spacing: 15px;
}

.nova-etapa {
  width: 288px;
}
</style>
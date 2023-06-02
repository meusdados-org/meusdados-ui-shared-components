<template>
  <div class="board">
      <Container class="orientador-colunas" orientation="horizontal" @drop="onColumnDrop" drag-handle-selector=".column-drag-handle" :drop-placeholder="upperDropPlaceHolder">
          <DragColumn v-for="(column, i) in scene.children" :index="i" :scene="scene" :key="column.id" :title="column.name" :column="column" :items="column.solicitacoes"/>
      </Container>
  </div>
</template>

<script>
import DragColumn from '@/components/shared/Drag/DragColumn.vue';
import { Container } from 'vue3-smooth-dnd';
import { applyDrag } from './helpers';

export default {
  name: 'SolicitacoesTableView',
  components: {
      DragColumn,
      Container
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
</style>
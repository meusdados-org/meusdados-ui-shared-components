<template>
  <div class="board">
    <Container class="orientador-colunas" orientation="horizontal" @drop="onColumnDrop" drag-handle-selector=".column-drag-handle" :drop-placeholder="upperDropPlaceHolder">
      <DragColumn v-for="(column, i) in scene?.children" :index="i" :scene="scene" :key="column.id" :title="column.name" :column="column" @open="openModal" @openForm="openModalForm" :items="column.solicitacoes"/>
      <DragAdd class="nova-etapa" @click="openModalForm(undefined)">
        Nova Etapa
      </DragAdd>
    </Container>
    <ModalTemplate :open="open" @close="open = false">
      <CardDashboard :id="id" @refresh="$emit('refresh')" @close="open = false"/>
    </ModalTemplate>
    <ModalTemplate :open="openForm" @close="openForm = false">
      <CardEditarEtapa :id="idEtapa" @close="openForm = false"/>
    </ModalTemplate>
  </div>
</template>

<script>
import DragColumn from '@/components/shared/Drag/DragColumn.vue';
import { EtapaService } from '@/services/etapa';
import { Container } from 'vue3-smooth-dnd';
import { applyDrag } from './helpers';
import DragAdd from './DragAdd.vue';
import TabsGroup from '../Tabs/TabsGroup.vue';
import TabsItem from '../Tabs/TabsItem.vue';
import CollabComment from '../Collab/CollabComment.vue';
import CollabChat from '../Collab/CollabChat.vue';
import FragmentIndicatorLabel from '../Fragments/FragmentIndicatorLabel.vue';
import ModalTemplate from '../Modal/ModalTemplate.vue';
import Card from '../Card/Card.vue';
import Icon from '../Icon/Icon.vue';
import ButtonLink from '../Button/ButtonLink.vue';
import CardDashboard from '@/components/Cards/CardsSolicitacoes/CardDashboard.vue';
import CardEditarEtapa from '@/components/Cards/CardsSolicitacoes/CardsForms/CardEditarEtapa.vue';

export default {
  name: 'SolicitacoesTableView',
  components: {
    DragColumn,
    Container,
    DragAdd,
    TabsGroup,
    TabsItem,
    CollabComment,
    CollabChat,
    FragmentIndicatorLabel,
    ModalTemplate,
    Card,
    Icon,
    ButtonLink,
    CardDashboard,
    CardEditarEtapa
},
  props: {
    scene_: {
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
          id: undefined,
          open: false,
          idEtapa: undefined,
          openForm: false,
      }
  },
  computed: {
    scene() {
      return this.scene_;
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
          const currentColumnPosition = dropResult.removedIndex
          const newColumnPosition = dropResult.addedIndex
          const scene = Object.assign({}, this.scene);
          const sceneBackup = Object.assign({}, this.scene);
          const column = scene.children[currentColumnPosition];
          scene.children = applyDrag(scene.children, dropResult)
          this.scene.children = scene.children;
          new EtapaService(localStorage).update(column.id, { posicao: newColumnPosition + 1 }).then().catch(error => {
            this.scene.children = sceneBackup.children;
            this.$dialog({ title: 'Não autorizado!', message: error.response.data.error_message, type: 'error'});
          })
      },
    openModal(id) {
      this.id = id,
      this.open = true;
    },
    openModalForm(id) {
      console.log(id)
      this.idEtapa = id;
      this.openForm = true;
    }
  },
};
</script>

<style scoped>
.board {
  padding: 0;
  margin: 0;
}
.orientador-colunas {
  border-collapse: separate;
  margin-top: -14px;
  margin-left: -14px;
  margin-right: -14px;
  border-spacing: 15px;
}

.nova-etapa {
  width: 288px;
}
</style>
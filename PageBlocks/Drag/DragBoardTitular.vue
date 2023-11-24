<template>
  <div class="board">
    <Container class="orientador-colunas" :orientation="horizontal" @drop="onColumnDrop" drag-handle-selector=".column-drag-handle" :drop-placeholder="upperDropPlaceHolder">
      <DragColumn v-for="(column, i) in scene?.children" :index="i" :scene="scene" :key="column.id" :title="column.name" :column="column" @open="openModal" @openForm="openModalForm" @refresh="$emit('refresh')" :items="column.solicitacoes" :isTitular="true"/>
    </Container>
    <div class="orientador-colunas-mobile">
      <div v-for="(column, i) in scene?.children">
        <DragColumn  :index="i" :scene="scene" :key="column.id" :title="column.name" :column="column" @open="openModal" @openForm="openModalForm" @refresh="$emit('refresh')" :items="column.solicitacoes" :isTitular="true" v-if="column.solicitacoes.length > 0"/>
        <hr style="margin-top: var(--spacing-small);"  v-if="column.solicitacoes.length > 0"/>
      </div>
    </div>
    <ModalTemplate :open="open" @close="open = false">
      <CardDashboard :id="id" @refresh="$emit('refresh')" @close="open = false"/>
    </ModalTemplate>
  </div>
</template>

<script>
import DragColumn from './DragColumn.vue';
import { Container } from 'vue3-smooth-dnd';
import DragAdd from './DragAdd.vue';
import TabsGroup from '@/components/shared/Fragments/Tabs/TabsGroup.vue';
import TabsItem from '@/components/shared/Fragments/Tabs/TabsItem.vue';
import CollabComment from '@/components/shared/Fragments/Collab/CollabComment.vue';
import CollabChat from '@/components/shared/Fragments/Collab/CollabChat.vue';
import FragmentIndicatorLabel from '@/components/shared/Fragments/FragmentIndicatorLabel.vue';
import ModalTemplate from '@/components/shared/Overlay/Modal/ModalTemplate.vue';
import Card from '@/components/shared/PageBlocks/Card/Card.vue';
import Icon from '@/components/shared/Icon/Icon.vue';
import ButtonLink from '@/components/shared/Actions/ButtonLink.vue';
import CardDashboard from '@/components/Cards/CardsSolicitacoes/CardDashboard.vue';

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
      updateSearch(search) {
          this.search = search;
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
  created() {
    const id = this.$route.query.id;
    if (id) {
      this.openModal(id);
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
  display: flex;
  gap: var(--spacing-small);
}

.orientador-colunas-mobile {
  display: none;
}

@media (max-width: 768px) {
  .orientador-colunas {
    display: none;
  }

  .orientador-colunas-mobile {
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
  }

}
</style>
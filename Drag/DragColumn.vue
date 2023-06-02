<template>
  <Draggable class="drag-columns column-drag-handle">
    <Card :title="column.name" :hasPadding="false" class="drag-column">
      <template v-slot:action>
        <ButtonLink>
          <Icon class="edit-column" size="1rem" type="more-vertical"></Icon>
        </ButtonLink>
      </template>
      <template v-slot:content>
        <div class="responsavel">
          <Text3Component>
            <Icon size="0.8rem" type="user" />
            {{ column.areasUsuarios || 'Sem área/usuário específico' }}
          </Text3Component>
        </div>
        <div class="background-options">
          <Container class="background-options" group-name="col" @drop="(e) => onCardDrop(column.id, e)" :get-child-payload="getCardPayload()" drag-class="card-ghost" drop-class="card-ghost-drop" :drop-placeholder="dropPlaceholderOptions" drag-handle-selector=".item-drag-handle">
            <DragItemRequest v-for="card in items" :key="card.id" class="card"/>
            <div :class="{ hover: index !== 0 }">
              button
            </div>
          </Container>
        </div>
      </template>
    </Card>
  </Draggable>
</template>

<script>
import { Draggable, Container } from "vue3-smooth-dnd";
import Card from "../Card/Card.vue";
import Icon from "../Icon/Icon.vue";
import Text3Component from "../Font/Text/Text3Component.vue";
import { applyDrag } from "./helpers";
import ButtonLink from "../Button/ButtonLink.vue";
import DragItemRequest from "./DragItemRequest.vue";

export default {
  components: {
    Draggable,
    Container,
    Card,
    Icon,
    Text3Component,
    ButtonLink,
    DragItemRequest
},
  props: {
    column: {
      type: Object,
      default: {
        id: 1,
        name: 'Foo',
        apenasVisualizacao: false,
        areasUsuarios: undefined

      }
    },
    scene: {},
    items: {
      type: Array,
      default: []
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
    }
  },
  methods: {
    onCardDrop (columnId, dropResult) {
      console.log(columnId, dropResult);
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column);
        // const solicitacao = dropResult.payload;
        // const id_etapa = dropResult.addedIndex !== null ? { id_etapa: columnId } : {};
        // new SolicitacaoService(localStorage).update(solicitacao.id, id_etapa).then(() => {
            newColumn.solicitacoes = applyDrag(newColumn.solicitacoes, dropResult)
            scene.children.splice(columnIndex, 1, newColumn);
            this.scene.children = scene.children;
        // }).catch(error => {
        //     this.$dialog({ title: 'Não autorizado!', message: error.response.data.error_message, type: 'error'});
        // })
      }
    },
    getCardPayload () {
        return index => {
          return this.items[index]
        }
    },
  }
};
</script>

<style scoped>

.drag-columns{
    display: flex;
    width: 18rem;
    min-width: 18rem;
    height: 434px;
}

.background-options{
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin: 0 -1rem;
  padding-top: .5rem;
  margin-top: -.5rem;
  row-gap: .5rem;
  height: 434px;
  overflow-x: hidden;
  overflow-y: auto;
}

.background-options::-webkit-scrollbar {
  position: relative;
  right: -250px;
  background-color: var(--gray-3);
  border-radius: 10px;
  /* margin-left: 1rem; */
  width: 2px;
}
.background-options::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--blue-2);
}

.background-options:hover > .hover {
  display: block;
}

.hover {
  display: none;
}

.edit-column {
    color: var(--gray-2);
}

.edit-column:hover {
  color: var(--purple-1);
}

.responsavel {
    display: flex;
    align-items: flex-start;
    column-gap: .25rem;
    margin-bottom: .5rem;
}

.column-drag-handle:active {
  cursor: grab;
}
</style>

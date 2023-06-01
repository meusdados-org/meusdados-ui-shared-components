<template>
  <Draggable class="drag-columns">
    <Card :title="column.name" class="drag-column">
      <template v-slot:action>
        <Icon class="edit-column" size="1rem" type="more-vertical"></Icon>
      </template>
      <template v-slot:content>
        <div class="responsavel">
          <Text3Component>
            <Icon size="0.8rem" type="user" />
            {{ column.areasUsuarios || 'Sem área/usuário específico' }}
          </Text3Component>
        </div>
        <div class="background-options">
          <Container group-name="col" @drop="(e) => onCardDrop(column.id, e)" :get-child-payload="getCardPayload()" drag-class="card-ghost" drop-class="card-ghost-drop" :drop-placeholder="dropPlaceholderOptions">
            <Draggable v-for="card in items" :key="card.id" class="card">
              <div>
                {{ card.text }}
              </div>
            </Draggable>
            <div class="button-adicionar-solicitacao" v-if="index == 0">
              <ButtonDefault class="button-solicitacao" v-on:click="switchModalCreateSolicitacao">
                <Icon size="0.8rem" type="plus" />
              </ButtonDefault>
            </div>
            <CardSolicitacao v-else style="opacity: 0;"></CardSolicitacao>
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

export default {
  components: {
    Draggable,
    Container,
    Card,
    Icon,
    Text3Component
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
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    onCardDrop (columnId, dropResult) {
      console.log(columnId, dropResult);
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        const solicitacao = dropResult.payload;
        const id_etapa = dropResult.addedIndex !== null ? { id_etapa: columnId } : {};
        new SolicitacaoService(localStorage).update(solicitacao.id, id_etapa).then(() => {
            newColumn.children = applyDrag(newColumn.children, dropResult)
            scene.children.splice(columnIndex, 1, newColumn)
            this.scene = scene
        }).catch(error => {
            this.$dialog({ title: 'Não autorizado!', message: error.response.data.error_message, type: 'error'});
        })
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
    height: 434px;

    overflow: auto;
    overflow-x: hidden;
}

.background-options::-webkit-scrollbar {
    background-color: var(--gray-3);
    border-radius: 10px;
    /* margin-left: 1rem; */
    width: 2px;
}
.background-options::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--blue-2);
}

.button-solicitacao{
    background-color: var(--white);
    width: 21rem;
    height: 4rem;
    color: black;
}

.button-colum{
    background-color: var(--white);
    width: 13rem;
    height: 4rem;
    color: black;
}

.legenda{
    margin-top: 1rem;
    display: flex;
    gap: 20px;
}

.square{
    color: var(--purple-1);
    background-color: var(--purple-1);
}

.button-adicionar-solicitacao{
    display: flex;
    width: 21rem;
    padding-bottom: 1rem;
    padding-left: .2rem;
}

.header-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.editar-title{
    display: flex;
    column-gap: .2rem;
    align-items: center;
}

.input-nome {
    padding: 0;
    margin-right: 1rem;
}

.card-Solicitacao{
    display: flex;
    text-decoration: none;
    color: var(--black);
}

.card:hover .edit{
    padding-top: 0.5rem;
    display: flex;
}

.edit{
    display: none;
}

.edit:hover{
    color: var(--purple-1);
}

.edit-column:hover{
    color: var(--purple-1);
}


.header-card{
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 0.5rem;
}


.responsavel{
    display: flex;
    align-items: flex-start;
    column-gap: .25rem;
    margin-bottom: .5rem;
}
</style>

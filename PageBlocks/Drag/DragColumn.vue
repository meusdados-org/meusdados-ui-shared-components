<template>
  <Draggable class="drag-columns" :class="{ 'column-drag-handle': !(isTitular || column.nome === 'Fechado' || column.nome === 'Cancelado') }">
    <Card :title="column.nome" :isModal="falseS" :hasPadding="false" class="drag-column">
      <template v-slot:action v-if="!isTitular">
        <ButtonLink v-if="column.id" class="edit-button-link" @click="$emit('openForm', column.id)">
          <Icon class="edit-column" size="16px" type="more-vertical"></Icon>
        </ButtonLink>
        <div style="width: 0; height: 0; display: none;"></div>
      </template>
      <template v-slot:action v-else>
        <div style="width: 0; height: 0; display: none;"></div>
      </template>
      <template v-slot:content>
        <div class="responsavel" v-if="!isTitular">
          <Icon size="12px" type="user" />
          <BodyMedium>
            {{ column.responsaveis?.length > 0 ? column.responsaveis.map(x => x.nome).join(', ') : 'Sem área/usuário específico' }}
          </BodyMedium>
        </div>
        <div class="background-options">
          <Container class="background-options" group-name="col" @drop="(e) => onCardDrop(column.id, e)" :get-child-payload="getCardPayload()" drag-class="card-ghost" drop-class="card-ghost-drop" :drop-placeholder="dropPlaceholderOptions" drag-handle-selector=".item-drag-handle">
            <DragAdd @click="open = true" :class="{ hover: index !== 0  }" v-if="!(column.nome === 'Fechado' || column.nome === 'Cancelado')">
              Nova Solicitação
            </DragAdd>
            <DragItemRequest v-for="solicitacoes in items" v-on:click="$emit('open', solicitacoes.id)" :key="solicitacoes.request_id" :solicitacao="solicitacoes" class="card" :isTitular="isTitular"/>
          </Container>
        </div>
      </template>
    </Card>
  </Draggable>
  <div class="mobile">
    <Card :title="column.nome" :hasPadding="false" class="drag-column" :isModal="false">
      <template v-slot:action v-if="!isTitular">
        <ButtonLink v-if="column.id" class="edit-button-link" @click="$emit('openForm', column.id)">
          <Icon class="edit-column" size="16px" type="more-vertical"></Icon>
        </ButtonLink>
        <div style="width: 0; height: 0; display: none;"></div>
      </template>
      <template v-slot:action v-else>
        <div style="width: 0; height: 0; display: none;"></div>
      </template>
      <template v-slot:content>
        <div class="responsavel" v-if="!isTitular">
          <Icon size="12px" type="user" />
          <BodyMedium>
            {{ column.responsaveis?.length > 0 ? column.responsaveis.map(x => x.nome).join(', ') : 'Sem área/usuário específico' }}
          </BodyMedium>
        </div>
        <div class="background-options">
          <Container class="background-options" group-name="col" @drop="(e) => onCardDrop(column.id, e)" :get-child-payload="getCardPayload()" drag-class="card-ghost" drop-class="card-ghost-drop" :drop-placeholder="dropPlaceholderOptions" drag-handle-selector=".item-drag-handle">
            <DragAdd @click="open = true" :class="{ hover: index !== 0 }" v-if="(!isTitular || index === 0) && !(column.nome === 'Fechado' || column.nome === 'Cancelado') && !isMobile()">
              Nova Solicitação
            </DragAdd>
            <DragItemRequest v-for="solicitacoes in items" v-on:click="$emit('open', solicitacoes.id)" :key="solicitacoes.request_id" :solicitacao="solicitacoes" class="card" :isTitular="isTitular" mini/>
          </Container>
        </div>
      </template>
    </Card>
  </div>
  <ModalTemplate :open="open">
    <CardNovaSolicitacao :id_etapa="column.id" @refresh="$emit('refresh')" @close="open = false"/>
  </ModalTemplate>
</template>

<script>
import { Draggable, Container } from "vue3-smooth-dnd";
import Card from "@/components/shared/PageBlocks/Card/Card.vue";
import Icon from "@/components/shared/Icon/Icon.vue";
import BodyMedium from "@/components/shared/Typography/Body/BodyMedium.vue";
import { applyDrag } from "./helpers";
import ButtonLink from "@/components/shared/Actions/ButtonLink.vue";
import DragItemRequest from "./DragItemRequest.vue";
import DragAdd from "./DragAdd.vue";
import ModalTemplate from "@/components/shared/Overlay/Modal/ModalTemplate.vue";
import CardNovaSolicitacao from "@/components/Cards/CardsSolicitacoes/CardsForms/CardNovaSolicitacao.vue";
import { SolicitacaoService } from "@/services/solicitacao";

export default {
  components: {
    Draggable,
    Container,
    Card,
    Icon,
    BodyMedium,
    ButtonLink,
    DragItemRequest,
    DragAdd,
    ModalTemplate,
    CardNovaSolicitacao
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
    },
    isTitular: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      openId: undefined,
      open: false,
    }
  },
  methods: {
    onCardDrop (columnId, dropResult) {
      ;
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene);
        const sceneBackup = Object.assign({}, this.scene);
        const column = scene.children.filter(p => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column);
        newColumn.solicitacoes = applyDrag(newColumn.solicitacoes, dropResult)
        scene.children.splice(columnIndex, 1, newColumn);
        this.scene.children = scene.children;
        const solicitacao = dropResult.payload;
        const id_etapa = dropResult.addedIndex !== null ? { id_etapa: columnId } : {};
        new SolicitacaoService(localStorage).update(solicitacao.id, id_etapa).then().catch(error => {
            this.$dialog({ title: 'Não autorizado!', message: error.response.data.error_message, type: 'error'});
            this.scene.children = sceneBackup.children;
        })
      }
    },
    getCardPayload () {
        return index => {
          return this.items[index]
        }
    },
    isMobile() {
      return window.innerWidth < 768;
    }
  }
};
</script>

<style scoped>

.drag-column{
  display: flex;
  width: 18rem;
  text-align: left;
}

.background-options {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xsmall)  var(--spacing-small);
  margin: calc(var(--spacing-xsmall) * -1) calc(var(--spacing-small) * -1);
  row-gap: var(--spacing-xsmall);
  height: 350px;
  overflow-x: hidden;
  overflow-y: auto;
}

.background-options::-webkit-scrollbar {
  position: relative;
  right: -250px;
  background-color: var(--gray-3);
  border-radius: var(--spacing-xsmall);
  /* margin-left:  var(--spacing-small); */
  width: var(--spacing-xxxsmall);
}
.background-options::-webkit-scrollbar-thumb {
    border-radius: var(--spacing-xsmall);
    background-color: var(--blue-2);
}

.background-options:hover > .hover {
  display: flex;
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
.edit-button-link {
  margin-right: calc(var(--spacing-xsmall) * -1);
}

.responsavel {
    display: flex;
    align-items: center;
    column-gap: var(--spacing-xxsmall);
    margin-bottom: var(--spacing-xsmall);
}

.column-drag-handle:active {
  cursor: grab;
}

.mobile {
  display: none;
}

@media (max-width: 768px) {
  .drag-columns {
    display: none;
  }

  .drag-column {
    width: 100%;
    height: fit-content;
  }

  .background-options{
    height: fit-content;
  }

  .mobile {
    display: block;
  }
}

</style>

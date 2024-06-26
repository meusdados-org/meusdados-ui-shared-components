<script setup lang="ts">
import { ref, watch } from 'vue';
import ExpansionPanel from './ExpansionPanel.vue';
import BodyLarge from '@/components/shared/Typography/Body/BodyLarge.vue';
import Icon from '@/components/shared/Icon/Icon.vue';
import ButtonLink from '../../Actions/ButtonLink.vue';


const props = defineProps({
  itemList: {
    type: Array<any>
  },
  itemName: {
    type: String
  },
  itemBase: {
    type: Object
  },
  isTitleKeyInForm: {
    type: Boolean,
    default: true
  },
  titleKey: {
    type: String,
    default: undefined
  },
  erroItem: {
    type: String,
    default: undefined
  },
  erroResponse: {
    type: String,
    default: undefined
  },
  addAction: {
    type: Boolean,
    default: true 
  }
})

const open = ref<number>(0);
const innerErroItem = ref<string>(props.erroItem);
const innerErroResponse = ref<string>(props.erroResponse);

watch(() => props.erroItem, (value) => {
  const index = props.itemList.findIndex(x => x=== value);
  if (index !== -1) {
    open.value = index;
  }
})

const addNewItem = () => {
  const newItemBase = JSON.parse(JSON.stringify(props.itemBase));
  props.itemList.push(newItemBase);
  open.value = props.itemList.length - 1;
}

const switchOpen = (index: number) => {
  if (index === open.value) {
    open.value = undefined;
    return;
  }
  open.value = index;
}

const getTitle = (item, i) => {
    if (props.isTitleKeyInForm && props.titleKey) {
       return item.form[props.titleKey] 
    } else if (props.titleKey) {
        return item[props.titleKey]
    }
    return i;
}

</script>

<template>
  <div class="expansion-panel-wrapper">
    <ExpansionPanel v-for="(item, i) in itemList" :key="i" :has-title="itemList.length > 1" :title="getTitle(item, i)" :open="open === i" @open="switchOpen(i)">
      <template #content>
        <FormError v-if="erroItem && erroItem === item">
          {{ erroResponse }}
        </FormError>
        <slot name="content" :item="item" :i="i"></slot>
      </template>
    </ExpansionPanel>
    <div class="expansion-panel-container" v-if="addAction" v-on:click="addNewItem">
      <div class="expansion-panel-header">
        <div class="expansion-panel-title">
          <ButtonLink size="large">
            <Icon type="plus"/>
            Adicionar {{ itemName }}
          </ButtonLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expansion-panel-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border-color: var(--gray-2);
  border-radius: var(--border-radius-small);
}

@media (max-width: 768px) {
  .expansion-panel-wrapper {
    border: none;
    border-radius: 0;
  }
}
</style>

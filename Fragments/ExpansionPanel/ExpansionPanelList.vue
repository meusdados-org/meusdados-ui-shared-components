<script setup lang="ts">
import { ref } from 'vue';
import ExpansionPanel from './ExpansionPanel.vue';
import Text1Component from '@/components/shared/Typography/Text/Text1Component.vue';
import Icon from '@/components/shared/Icon/Icon.vue';

const open = ref<number>(0);

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
    type: String
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

</script>

<template>
  <div class="expansion-panel-wrapper">
    <ExpansionPanel v-for="(item, i) in itemList" :key="i" :has-title="itemList.length > 1" :title="isTitleKeyInForm ? item.form[titleKey] : item[titleKey]" :open="open === i" @open="switchOpen(i)">
      <template #content>
        <slot name="content" :item="item"></slot>
      </template>
    </ExpansionPanel>
    <div class="expansion-panel-container" v-on:click="addNewItem">
      <div class="expansion-panel-header">
        <div class="expansion-panel-title">
          <Text1Component style="color: var(--purple-1); font-weight: 400;">
            <Icon type="plus" size="1rem"/>
            {{ itemName }}
          </Text1Component>
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
  border-radius: var(--border-radius-1);
}
</style>
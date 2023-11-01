<script setup>
import FragmentTaskList from '../FragmentTaskList.vue';
import CollabChat from './CollabChat.vue';

const emit = defineEmits(['download']);

const props = defineProps({
  dataAbertura: {
    type: String,
    default: '29/11/2022 - 14:44'
  },
  log: {
    type: Array,
    default: []
  }
})

const aberturaTaskList = [
  {
    'Solicitação aberta': {
      'customIcon': 'file-text',
      'status': true,
      'data': props.dataAbertura,
    }
  }
]

const isLastItem = (index) => {
  return index === props.log?.length - 1;
}

</script>

<template>
  <div class="collab-story">
    <template v-for="(story, index) in log" :key="index">
      <template v-if="story.mensagens">
        <CollabChat :mensagens="story.mensagens" @download="emit('download')"/>
      </template>
      <template v-else-if="story.taskList">
        <FragmentTaskList :taskList="story.taskList" :collabVersion="true"/>
      </template>
      <hr class="collab-story-separator" />
    </template>
    <FragmentTaskList :taskList="aberturaTaskList" :collabVersion="true" />
  </div>
</template>


<style scoped>
.collab-story {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column-reverse;
  row-gap: var(--spacing-medium);
}

.collab-story > * {
  flex-shrink: 0;
}
</style>

<script setup>
import { ref } from 'vue';
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
  },
  preview: {
    type: Boolean,
    default: false
  }
})

const log_ = ref([]);
if (props.preview) {
  // get the last message and the last task list
  const lastItem = props.log[0];

  let lastTask = null;
  if (Object.keys(lastItem)[0] === 'taskList') {
    const taskList = lastItem.taskList;
    lastTask = taskList[taskList.length - 1];
    if (lastTask.template) {
      log_.value.push(lastItem);
    } else {
      log_.value.push({
        'taskList': taskList.slice(0,1)
      });
    }
  } else if (Object.keys(lastItem)[0] === 'mensagens') {
    log_.value.push({
      'mensagens': lastItem.mensagens.slice(0,2)
    });
  }
  console.log(lastTask)
  if (!lastTask?.template) {
    // get the second last item if it exists
    const secondLastItem = props.log[1];
    if (secondLastItem) {
      if (Object.keys(secondLastItem)[0] === 'taskList') {
        const taskList = secondLastItem.taskList;
        lastTask = taskList[taskList.length - 1];
        log_.value.push(secondLastItem);
      } else if (Object.keys(secondLastItem)[0] === 'mensagens') {
        log_.value.push({
          'mensagens': secondLastItem.mensagens.slice(0,1)
        });
      }
    }
  }
} else {
  log_.value = props.log;
}

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
  return index === log_.value?.length - 1;
}

</script>

<template>
  <div class="collab-story">
    <template v-for="(story, index) in log_" :key="index">
      <template v-if="story.mensagens">
        <CollabChat :mensagens="story.mensagens" @download="emit('download')"/>
      </template>
      <template v-else-if="story.taskList">
        <FragmentTaskList :taskList="story.taskList" :collabVersion="true"/>
      </template>
      <hr class="collab-story-separator" v-if="!isLastItem(index) && preview" />
    </template>
    <FragmentTaskList :taskList="aberturaTaskList" v-if="!preview" :collabVersion="true" />
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

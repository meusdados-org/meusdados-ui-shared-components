<script setup>
import LinkComponent from '../Actions/Link/LinkComponent.vue';
import Icon from '../Icon/Icon.vue';
import Text3Component from '../Typography/Text/Text3Component.vue';

defineProps({
  taskList: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="fragment-task-list-container">
    <div class="fragment-task-list__body">
      <div class="fragment-task-list__body__task" v-for="[task, info] in Object.entries(taskList)" :key="task.id">
        <div class="fragment-task-list__body__task__text">
          <span class="fragment-task-list__body__task__indicator" :class="{ active: info.status }">
            <Icon type="check" size="9px" :align="false" v-if="info.status" />
          </span>
          <Text3Component>{{ task }}</Text3Component>
        </div>
        <div class="fragment-task-list__body__task__icon" v-if="!info.status">
          <LinkComponent :to="info.link">
            <Icon type="arrow-right" />
          </LinkComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fragment-task-list-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: 16px;
  overflow-y: auto;
  width: 100%;
  max-height: 264px;
  padding-right: 1rem;
  margin-right: -1rem;
}

.fragment-task-list__body {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
}

.fragment-task-list__body__task {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  text-align: left;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
}

.fragment-task-list__body__task__text {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  gap: 8px;
}

.fragment-task-list__body__task__indicator {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  border-radius: var(--border-radius-1);
  background-color: var(--gray-3);
}

.fragment-task-list__body__task__indicator.active {
  background-color: var(--green-1);
  color: var(--white);
}
</style>

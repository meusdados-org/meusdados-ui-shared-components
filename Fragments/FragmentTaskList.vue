<script setup>
import ButtonLink from '../Actions/ButtonLink.vue';
import LinkComponent from '../Actions/Link/LinkComponent.vue';
import Icon from '../Icon/Icon.vue';
import Tooltip from '../Inputs/Tooltip/Tooltip.vue';
import BodyMedium from '../Typography/Body/BodyMedium.vue';

defineProps({
  taskList: {
    type: Object,
    required: true
  },
  collabVersion: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="fragment-task-list-container">
    <div class="fragment-task-list__body" :class="{ collabVersion }">
      <div class="fragment-task-list__body__task" v-for="[task, info] in Object.entries(taskList)" :key="task.id">
        <div class="fragment-task-list__body__task__text">
          <span class="fragment-task-list__body__task__indicator" :class="{ active: info.status }">
            <Icon type="check" size="9px" :align="false" v-if="info.status" />
            <Icon type="git-commit" size="9px" :align="false" v-else-if="collabVersion" />
          </span>
          <BodyMedium>{{ task }}</BodyMedium> <Tooltip v-if="info.tooltip">{{ info.tooltip }}</Tooltip>
        </div>
        <div class="fragment-task-list__body__task__icon" v-if="!info.status && info.link">
          <LinkComponent :to="info.link">
            <ButtonLink>
              <Icon type="arrow-right" />
            </ButtonLink>
          </LinkComponent>
        </div>
        <div v-else-if="info.data" style="color: var(--gray-1); flex-shrink: 0; padding-right: 1rem;">
          <BodyMedium >{{ info.data }}</BodyMedium>
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
  gap: var(--spacing-small);
  overflow-y: auto;
  width: 100%;
  max-height: 264px;
  padding-right:  var(--spacing-small);
  margin-right: calc(var(--spacing-small) * -1);
}

.fragment-task-list__body {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: var(--spacing-small);
  width: 100%;
}

.fragment-task-list__body.collabVersion {
  gap: var(--spacing-xsmall);
}

.fragment-task-list__body__task {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  text-align: left;
  justify-content: space-between;
  gap: var(--spacing-xsmall);
  width: 100%;
}

.fragment-task-list__body__task__text {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  gap: var(--spacing-xsmall);
}

.fragment-task-list__body__task__indicator {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  border-radius: var(--border-radius-small);
  background-color: var(--gray-3);
}

.fragment-task-list__body__task__indicator.active {
  background-color: var(--green-1);
  color: var(--white);
}
</style>

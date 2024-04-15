<script setup>
import LabelSmall from '../Typography/Label/LabelSmall.vue';
import Icon from '../Icon/Icon.vue';
import ButtonLink from '../Actions/ButtonLink.vue';
import { backend } from '@/services/_backend';

const emit = defineEmits(['close']);
defineProps({
  notification: {
    type: Object,
    default: () => ({})
  }
})

const getBackgroundColor = (notification) => {
  switch (notification.type) {
    case 'warning':
      return 'var(--purple-1)'
    case 'alert':
      return 'var(--red-1)'
    default:
      return 'var(--grey-1)'
  }
}

const runAction = (notification) => {
  if (notification.action.redirect) {
    window.location.href = notification.action.redirect;
  } else if (notification.action.endpoint) {
    backend.get(notification.action.endpoint).then(() => {
      window.location.reload();
    });
  } else {
    emit('close');
  }
}
</script>

<template>
<div class="notice-banner" :style="{ backgroundColor: getBackgroundColor(notification) }" v-on:click="runAction(notification)">
  <div class="notice-banner__content__text">
    <LabelSmall>{{ notification.message }}</LabelSmall>
  </div>
  <ButtonLink class="notice-banner__content__actions__button" @click="runAction(notification)">
    <div class="content-button">
      <LabelSmall v-if="notification.action.text" class="button-text">{{ notification.action.text }}</LabelSmall>
      <Icon class="icon" size="12px" :type="notification.action.icon ? notification.action.icon : 'arrow-right'" />
    </div>
  </ButtonLink>
</div>
</template>


<style scoped>
.notice-banner {
  width: 100%;
  padding: var(--spacing-xxsmall) var(--spacing-xsmall);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--white);
  border-radius: var(--border-radius-mini);
  text-align: left;
  gap: var(--spacing-xsmall);
}

.notice-banner:hover {
  opacity: 0.9;
  cursor: pointer;
}

.notice-banner__content__text {
  display: flex;
  align-items: center;
}

.notice-banner__content__actions__button {
  background: none;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: var(--spacing-xxsmall);
  color: var(--white);
  width: fit-content;
}

button.notice-banner__content__actions__button:hover, button.notice-banner__content__actions__button:hover > .button {
  color: var(--white) !important;
  border-bottom: 1px solid var(--white);
}

.content-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxsmall);
}

.button-text {
  color: var(--white);
}

.button-text:hover {
  color: var(--white) !important;
}

.icon {
  color: var(--white);
}

.icon:hover {
  color: var(--white) !important;
}

@media (max-width: 768px) {
  .notice-banner {
    border-radius: 0;
    width: inherit;
  }

  .notice-banner__content__actions__button {
    flex-shrink: 0;
  }

}
</style>
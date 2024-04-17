<script setup>
  import { ref } from 'vue';
  import Card from '../Card/Card.vue';
  import ModalTemplate from '../../Overlay/Modal/ModalTemplate.vue';
  import ButtonIcon from '../../Actions/ButtonIcon.vue';
  import { YoutubeIframe  } from '@vue-youtube/component';

  const emits = defineEmits(['close', 'like', 'dislike']);
  const props = defineProps({
    video_id: String,
    title: String,
    open: Boolean
  });

  const onReady = (event) => {
    console.log(event);
  }

  const onPlay = (event) => {
    console.log('playing');
    console.log(event);
  }
</script>

<template>
  <ModalTemplate :open="open" @close="emits('close')">
    <Card :title="title" @close="emits('close')">
      <template #content>
        <section class="content-container">
          <youtube-iframe :video-id="video_id" @ready="onReady" @state-change="onPlay" width="1024" height="576" />
          <section class="buttons">
            <ButtonIcon class="like" type="thumbs-up" size="large"/>
            <ButtonIcon class="dislike" type="thumbs-down" size="large"/>
          </section>
        </section>
      </template>
    </Card>
  </ModalTemplate>
</template>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.buttons > * {
  border-radius: 100%;
  background-color: var(--gray-2);
}

.like:hover, .like:active {
  background-color: var(--green-1) !important;
}

.dislike:hover, .dislike:active {
  background-color: var(--red-1) !important;
}

.mejs_container {
  background-color: white;
}
</style>

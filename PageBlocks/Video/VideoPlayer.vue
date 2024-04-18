<script setup>
  import { ref, watch } from 'vue';
  import Card from '../Card/Card.vue';
  import ModalTemplate from '../../Overlay/Modal/ModalTemplate.vue';
  import ButtonIcon from '../../Actions/ButtonIcon.vue';
  import { YoutubeIframe } from '@vue-youtube/component';
  import { TreinamentoService } from '@/services/treinamento';

  const emits = defineEmits(['close', 'like', 'dislike']);
  const treinamentoService = new TreinamentoService();
  const props = defineProps({
    video_id: String,
    title: String,
    open: Boolean,
    treinamento_id: String
  });

  const liked = ref(false);
  const disliked = ref(false);
  const currentVideoEvent = ref();

  watch((props.open), (value) => {
    if (value) {
      getInteractions();
    }
  });

  const like = () => {
    treinamentoService.like(props.treinamento_id).then(() => getInteractions());  
  }

  const dislike = () => {
    treinamentoService.dislike(props.treinamento_id).then(() => getInteractions());
  }

  const getInteractions = () => {
    treinamentoService.getInteractions(props.treinamento_id).then(({ data }) => {
      liked.value = data.liked;
      disliked.value = data.disliked;
    });
  }

  const markView = async () => {
    treinamentoService.view(props.treinamento_id);
  }

  const onPlay = async (event) => {
    currentVideoEvent.value = event;
    const secondsWatched = Math.round(event.target.playerInfo.currentTime);
    await treinamentoService.viewTrack(props.treinamento_id, secondsWatched);
  }

  const close = async () => {
    if (currentVideoEvent.value) {
      currentVideoEvent.value.target.pauseVideo();
      await new Promise(r => setTimeout(r, 100));
    }
    emits('close');
  }
</script>

<template>
  <ModalTemplate :open="open" @close="close">
    <Card :title="title" @close="close">
      <template #content>
        <section class="content-container">
          <youtube-iframe :video-id="video_id" @ready="markView()" @state-change="onPlay" width="1024" height="576" />
          <section class="buttons">
            <ButtonIcon class="like" :class="{ active: liked }" type="thumbs-up" size="large" v-on:click="like"/>
            <ButtonIcon class="dislike" :class="{ active: disliked }" type="thumbs-down" size="large" v-on:click="dislike"/>
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

.like:hover, .like.active {
  background-color: var(--green-1) !important;
}

.dislike:hover, .dislike.active {
  background-color: var(--red-1) !important;
}

.mejs_container {
  background-color: white;
}
</style>

<script setup>
import { ref, computed } from 'vue';
import Card from '../Card/CardTemplate.vue';
import LabelLarge from '../../Typography/Label/LabelLarge.vue';
import VideoPlayer from './VideoPlayer.vue';

const props = defineProps({
  video_id: String,
  title: String,
  treinamento_id: String
});

const open = ref(false);
const videoThumbnailUrl = `https://img.youtube.com/vi/${props.video_id}/maxresdefault.jpg`;
const title_ = computed(() => {
  let title = props.title;
  if (title.length > 54) {
    title = title.substring(0, 54);
    title += '...';
  }
  return title;
})
</script>

<template>
  <Card class="card" v-on:click="open = true">
    <img :src="videoThumbnailUrl" width="290"/>
    <LabelLarge class="title">
      {{ title_ }}
    </LabelLarge>
  </Card>
  <VideoPlayer :video_id="video_id" :title="title" :open="open" :treinamento_id="treinamento_id" @close="open = false"/>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 290px;
  height: 224px;
  gap: 1rem;
  padding: var(--spacing-small) !important;
}

.card:hover {
  background-color: var(--gray-3);
  cursor: pointer;
}

.card:hover > .title {
  color: var(--purple-1);
}

.card > img {
  border-radius: 8px;
}

.title {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

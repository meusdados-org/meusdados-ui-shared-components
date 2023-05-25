<script setup>
import Title4Component from '../Font/Title/Title4Component.vue';
import Title1Component from '../Font/Title/Title1Component.vue';
import pattern1 from './assets/img/pattern1.svg';
import pattern2 from './assets/img/pattern2.svg';
import meusDadosColorido from './assets/img/meus-dados-colorido.png';
import meusDadosBranco from './assets/img/meus-dados-branco.png';

const props = defineProps({
  mainTitle: String,
  currentStep: String,
  finalStep: String
})
</script>

<template>
  <header class="logo-header">
    <img alt="Meus Dados Logo" class="logo" :src="step !== 'final' ? meusDadosColorido : meusDadosBranco" width="100" />
  </header>
  <div class="container">
    <header>
      <div class="steps" v-if="props.currentStep && props.finalStep">
        <Title4Component>PASSO {{ props.currentStep }} DE {{ props.finalStep }}</Title4Component>
      </div>
      <div class="main-title">
        <Title1Component>{{ props.mainTitle }}</Title1Component>
      </div>
      <slot name="header"></slot>
    </header>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
    <div class="pattern1">
      <img :src="pattern1"/>
    </div>
    <div class="pattern2">
      <img :src="pattern2"/>
    </div>
  </div>
</template>

<style scoped>
.logo-header {
  display: flex;
  justify-content: flex-start;
  padding: var(--spacing-7);
}
header {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-bottom: 4rem;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer {
  padding: 2rem;
  margin-bottom: 1rem;
}

.pattern1, .pattern2 {
  position: absolute;
  right: 0;
  z-index: -1;
}

.pattern1 {
  top: 143px;
}

.pattern2 {
  top: 299px;
}
</style>
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
  finalStep: String,
  upperTitle: String,
  upperPattern: Boolean
})
</script>

<template>
  <div class="wrapper">
    <header class="logo-header">
      <img alt="Meus Dados Logo" class="logo" :src="step !== 'final' ? meusDadosColorido : meusDadosBranco" width="100" />
      <Title4Component class="upperTitle" v-if="upperTitle">{{ upperTitle }}</Title4Component>
      <div style="width: 100px;"></div>
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
      <div :class="{pattern1: !upperPattern, upperPattern1: upperPattern}">
        <img :src="pattern1"/>
      </div>
      <div :class="{pattern2: !upperPattern, upperPattern2: upperPattern}">
        <img :src="pattern2"/>
      </div>
    </div>
    <footer>
      <slot name="under-footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
.logo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-7);
}
header:not(.logo-header) {
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

.pattern1, .pattern2, .upperPattern1, .upperPattern2 {
  position: absolute;
  right: 0;
  z-index: -1;
}

.pattern1 {
  top: 143px;
}

.upperPattern1 {
  top: -50px;
}

.upperPattern2 {
  top: 90px;
}

.pattern2 {
  top: 299px;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-7);
}
</style>
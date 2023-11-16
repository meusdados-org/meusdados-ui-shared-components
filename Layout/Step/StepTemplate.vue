<script setup>
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import TitleSmall from '@/components/shared/Typography/Title/TitleSmall.vue';
import pattern1 from './assets/img/pattern1.svg';
import pattern2 from './assets/img/pattern2.svg';
import meusDadosColorido from './assets/img/meus-dados-colorido.png';
import meusDadosBranco from './assets/img/meus-dados-branco.png';

const props = defineProps({
  mainTitle: String,
  currentStep: String,
  finalStep: String,
  upperTitle: String,
  upperPattern: Boolean,
  noFooter: Boolean,
})
</script>

<template>
  <div class="wrapper">
    <header class="logo-header">
      <img alt="Meus Dados Logo" class="logo" :src="step !== 'final' ? meusDadosColorido : meusDadosBranco"/>
      <BodyMedium class="upperTitle" v-if="upperTitle" strong>{{ upperTitle }}</BodyMedium>
      <div style="width: 100px;"></div>
    </header>
    <div class="container">
      <header>
        <div class="steps" v-if="props.currentStep && props.finalStep">
          <BodyMedium strong>PASSO {{ props.currentStep }} DE {{ props.finalStep }}</BodyMedium>
        </div>
        <div class="main-title">
          <TitleSmall>{{ props.mainTitle }}</TitleSmall>
        </div>
        <slot name="header"></slot>
      </header>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="footer" v-if="!noFooter">
        <slot name="footer"></slot>
      </div>
      <div :class="{pattern1: !upperPattern, upperPattern1: upperPattern}">
        <img :src="pattern1"/>
      </div>
      <div :class="{pattern2: !upperPattern, upperPattern2: upperPattern}">
        <img :src="pattern2"/>
      </div>
    </div>
    <div style="height: 100px;" v-if="!noFooter"></div>
    <footer v-if="!noFooter">
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
  padding: var(--spacing-large);
}
header:not(.logo-header) {
  display: flex;
  flex-direction: column;
  row-gap:  var(--spacing-small);
  margin-bottom: 4rem;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer {
  padding: var(--spacing-large);
  margin-bottom:  var(--spacing-small);
}

.pattern1, .pattern2, .upperPattern1, .upperPattern2 {
  position: absolute;
  right: 0;
  z-index: -1;
}

.pattern1 {
  top: 0px;
}

.upperPattern1 {
  top: -50px;
}

.upperPattern2 {
  top: -130px;
}

.pattern2 {
  top: -90px;
}

.logo {
  width: 100px;
}

footer {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-large);
}

@media (max-width: 768px) {
  .logo {
    width: 70px;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-xlarge);
  }

  .content {
    flex-grow: 1;
    overflow-y: auto;
  }
  .logo-header {
    padding: var(--spacing-small);
    padding-bottom: 0;
    margin-bottom: var(--spacing-xlarge);
  }
  .pattern1, .pattern2, .upperPattern1, .upperPattern2 {
    display: none;
  }

  .footer {
    padding: 0;
    margin: 0;
  }

  header:not(.logo-header) {
    margin-bottom: 0;
  }

  .logo-header {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .logo-header:last-child {
    display: none;
  }

  .upperTitle {
    text-transform: uppercase;
  }

  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--spacing-large);
  }
}
</style>
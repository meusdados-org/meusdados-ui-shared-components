<script setup>
import { computed } from 'vue';
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import TitleSmall from '@/components/shared/Typography/Title/TitleSmall.vue';
import meusDadosBranco from './assets/img/log_meus_dados_white.png';
import ButtonLink from '../../Actions/ButtonLink.vue';

const isMobile = computed(() => window.innerWidth <= 768);

const props = defineProps({
  mainTitle: String,
  currentStep: String,
  finalStep: String,
  upperTitle: String,
  upperPattern: Boolean,
  noFooter: Boolean,
  mobileOnDesktop: Boolean,
  noPattern: Boolean,
  canBeClosed: Boolean
})
</script>

<template>
  <div class="wrapper" :class="{ mobileOnDesktop }" >
    <header class="logo-header" :class="{ mobileOnDesktop }">
      <img alt="Meus Dados Logo" class="logo" :src="meusDadosBranco"/>
      <BodyMedium class="upperTitle" v-if="upperTitle" strong>{{ upperTitle }}</BodyMedium>
      <div style="width: 100px; display: flex; justify-content: flex-end; align-items: center;;">
        <ButtonLink class="action" v-if="canBeClosed" @click="$emit('close')" type="x" :size="!isMobile ? 'xlarge' : 'large'" secondary/>
      </div>
    </header>
    <div class="container" :class="{ mobileOnDesktop }">
      <header v-if="props.currentStep">
        <div class="steps" v-if="props.currentStep && props.finalStep">
          <BodyMedium strong>PASSO {{ props.currentStep }} DE {{ props.finalStep }}</BodyMedium>
        </div>
        <div class="main-title">
          <TitleSmall>{{ props.mainTitle }}</TitleSmall>
        </div>
        <slot name="header"></slot>
      </header>
      <div class="content" :class="{ mobileOnDesktop }">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

html, body {
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100dvh;
  background: linear-gradient(0deg, rgba(139, 92, 246, 0.75) 0%, rgba(139, 92, 246, 0.75) 100%), url("@/assets/img/bg-login.jpeg"), lightgray 50% / cover no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.logo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 4dvh;
}
header:not(.logo-header) {
  display: flex;
  flex-direction: column;
  row-gap:  var(--spacing-small);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 8dvw;
  margin-top: 2dvw;
}

.logo.mobileOnDesktop {
  width: 15dvw;
  margin-top: 1dvw;
}

.container.mobileOnDesktop {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  flex-grow: 1;
  gap: var(--spacing-large);
}

.content.mobileOnDesktop {
  flex: 1 0 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.logo-header.mobileOnDesktop {
  padding: var(--spacing-small);
  padding-bottom: 0;
  margin-bottom: var(--spacing-xlarge);
}

@media (max-width: 768px) {
  .logo {
    width: 15dvw;
    margin-top: 1dvw;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    flex-grow: 1;
    gap: var(--spacing-large);
  }

  .content {
    flex: 1 0 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .logo-header {
    padding: var(--spacing-small);
    padding-bottom: 0;
    margin-bottom: var(--spacing-xlarge);
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
}

@media (max-width: 1160px) {
  .logo {
    width: 10dvw;
    margin-top: 1dvw;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    flex-grow: 1;
    gap: var(--spacing-large);
  }

  .content {
    flex: 1 0 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .logo-header {
    padding: var(--spacing-small);
    padding-bottom: 0;
    margin-bottom: var(--spacing-xlarge);
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
}

</style>
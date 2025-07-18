<script setup>
import { computed } from 'vue';
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import TitleSmall from '@/components/shared/Typography/Title/TitleSmall.vue';
import pattern1 from './assets/img/pattern1-branco.svg';
import pattern2 from './assets/img/pattern2-branco.svg';
import meusDadosColorido from './assets/img/meus-dados-colorido.png';
import meusDadosBranco from './assets/img/meus-dados-branco.png';
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
  <div class="wrapper" :class="{ mobileOnDesktop }">
    <header class="logo-header" :class="{ mobileOnDesktop }">
      <img alt="Meus Dados Logo" class="logo" :src="meusDadosBranco" />
      <BodyMedium class="upperTitle" v-if="upperTitle" strong>{{ upperTitle }}</BodyMedium>
      <div style="width: 100px; display: flex; justify-content: flex-end; align-items: center;;">
        <ButtonLink class="action" v-if="canBeClosed" @click="$emit('close')" type="x"
          :size="!isMobile ? 'xlarge' : 'large'" secondary />
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
      <div class="footer" v-if="!noFooter" :class="{ mobileOnDesktop }">
        <slot name="footer"></slot>
      </div>
    </div>
    <div class="pattern pattern-top-right">
      <img :src="pattern1" />
    </div>
    <div class="pattern pattern-bottom-right">
      <img :src="pattern2" />
    </div>
    <div style="height: 100px;" v-if="!noFooter && !isMobile && !mobileOnDesktop"></div>
    <footer v-if="!noFooter && !isMobile" :class="{ mobileOnDesktop }">
      <slot name="under-footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100dvh;
  background-color: var(--blue-1);
  color: #fff;
  overflow-x: hidden;
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
  row-gap: var(--spacing-small);
  margin-bottom: 4rem;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--blue-1);
  overflow-x: hidden;
}

.footer {
  padding: var(--spacing-large);
  margin-bottom: var(--spacing-small);
}


.pattern {
  position: absolute;
  z-index: 0;
  max-width: none
}

.pattern-top-right {
  top: 90px;
  right: 0px; /* encosta na borda */
  width: auto;

}

.pattern-bottom-right {
  bottom: 130px;
  right: 0px; /* encosta na borda */
  width: auto;
 
}

.pattern img {
  max-width: 100vw;
  height: auto;
  display: block;
  box-sizing: border-box;
}

.footer {
  padding: var(--spacing-large);
  margin-bottom: var(--spacing-small);
  overflow-x: hidden;
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
  box-sizing: border-box;
  overflow-x: hidden;
}

.logo.mobileOnDesktop {
  width: 70px;
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

.pattern1.mobileOnDesktop,
.pattern2.mobileOnDesktop,
.upperPattern1.mobileOnDesktop,
.upperPattern2.mobileOnDesktop {
  display: none;
}

.footer.mobileOnDesktop {
  padding: 0;
  margin: 0;
}
.wrapper,
.container,
footer {
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}
@media (max-width: 768px) {
  .logo {
    width: 70px;
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

  .pattern1,
  .pattern2,
  .upperPattern1,
  .upperPattern2 {
    display: none;
  }

  .footer {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
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

  .action {
    position: absolute;
    right: var(--spacing-small);
    top: var(--spacing-small);
  }
}
</style>
<script setup>
import { ref } from 'vue';
import AlertTemplate from './AlertTemplate.vue';
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import BodySmall from '@/components/shared/Typography/Body/BodySmall.vue';
import ButtonLink from '@/components/shared/Actions/ButtonLink.vue';
import ButtonPrimary from '@/components/shared/Actions/ButtonPrimary.vue';

const show = ref(true);

const redirect = () => {
  window.open('https://meusdados.com/politicas-e-termos', '_blank');S
}
</script>

<template>
  <AlertTemplate :show="show" class="alert-privacy-container">
    <div class="alert-privacy">
      <BodyMedium>Aviso de privacidade</BodyMedium>
      <BodySmall>
        Utilizamos ferramentas e serviços de terceiros que utilizam cookies, elas nos ajudam a oferecer uma melhor experiência. Ao continuar a visualizar nosso site, você concorda com o uso de cookies.
      </BodySmall>
      <ButtonLink
        dark
        :bold="false"
        size="small"
        @click="redirect">
        Obtenha mais informações
      </ButtonLink>
      <ButtonPrimary
        dark
        @click="show = false"
        size="small">
        Fechar
      </ButtonPrimary>
    </div>
  </AlertTemplate>
</template>

<style scoped>
.alert-privacy-container {
  background-color: var(--purple-1);
  border-radius: var(--border-radius-small);
  padding:  var(--spacing-small);
}

.alert-privacy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
  text-align: left;
  gap: var(--spacing-xsmall);
}

.button-close {
  padding: var(--spacing-xsmall) var(--spacing-small);
  height: inherit;
}

@media (max-width: 768px) {
  .alert-privacy-container {
    border-radius: 0;
  }
}
</style>
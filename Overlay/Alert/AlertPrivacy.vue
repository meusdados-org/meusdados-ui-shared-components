<script setup>
import { ref } from 'vue';
import AlertTemplate from './AlertTemplate.vue';
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import BodySmall from '@/components/shared/Typography/Body/BodySmall.vue';
import ButtonLink from '@/components/shared/Actions/ButtonLink.vue';
import ButtonPrimary from '@/components/shared/Actions/ButtonPrimary.vue';

const show = ref(true);

const redirect = () => {
  window.open('https://meusdados.com/politicas-e-termos', '_blank');
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
        sameColorBackground
        :bold="false"
        @click="redirect">
        <BodySmall>
          Obtenha mais informações
        </BodySmall>
      </ButtonLink>
      <ButtonPrimary
        sameColorBackground
        @click="show = false"
        class="button-close">
        <BodyMedium>
          Fechar
        </BodyMedium>
      </ButtonPrimary>
    </div>
  </AlertTemplate>
</template>

<style scoped>
.alert-privacy-container {
  background-color: var(--purple-1);
  border-radius: var(--border-radius-1);
  padding: 1rem;
}

.alert-privacy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
  text-align: left;
  gap: .5rem;
}

.button-close {
  padding: 8px 16px;
  height: inherit;
}
</style>
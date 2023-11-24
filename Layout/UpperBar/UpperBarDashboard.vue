<script setup>
import { computed, ref } from 'vue';
import meusDadosBranco from '@/assets/img/log_meus_dados_white.png';
import LabelLarge from '../../Typography/Label/LabelLarge.vue';
import defaultProfilePic from '@/assets/img/default.png'
import ButtonLink from '../../Actions/ButtonLink.vue';
import { authService } from '@/services/auth';

const user = computed(() => {
  return JSON.parse(localStorage.getItem('usuario'));
});

const logout = async () => {
  localStorage.clear();
  await authService.logout();
  open.value = false;
  window.location.href = '/login';
}

const open = ref(false);
</script>

<template>
<div class="upper-bar__wrapper">
  <div class="upper-bar">
    <div class="upper-bar__header">
      <img :src="meusDadosBranco" class="upper-bar__logo" />
      <img :src="defaultProfilePic" class="upper-bar__profile-pic" v-on:click="open = true" />
    </div>
    <div class="upper-bar__content">
      <LabelLarge class="upper-bar__title">Bem vindo(a), {{ user?.nome }}</LabelLarge>
    </div>
  </div>
  <div class="profile-user__wrapper" :class="{ open }" @click="open = false">
    <div class="profile__menu" :class="{ open }" @click.stop="">
      <div class="profile-user">
        <img :src="defaultProfilePic" class="upper-bar__profile-pic" v-on:click="open = false" />
        <LabelLarge>{{ user?.nome }} {{ user?.sobrenome }}</LabelLarge>
      </div>
      <div class="actions">
        <router-link to="/conta/editar">
          <ButtonLink type="user" v-on:click="open = false">
            Minha conta
          </ButtonLink>
        </router-link>
        <ButtonLink v-on:click="logout" type="log-out">
          Sair
        </ButtonLink>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.upper-bar__wrapper {
  display: flex;
  flex-direction: column;
}
.upper-bar {
  background-color: var(--purple-1);
  padding: var(--spacing-small);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
}

.upper-bar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upper-bar__logo {
  width: 70px;
}

.upper-bar__profile-pic {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-full);
}

.upper-bar__content {
  display: flex;
  color: var(--white);
}

.profile-user__wrapper {
  background-color: var(--black-xlow-opacity);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  bottom: 0;
  visibility: hidden;
  transition: visibility 0s, opacity 0.5s ease-in-out;
}

.profile-user__wrapper.open {
  visibility: visible;
  transition: visibility 0s, opacity 0.5s ease-in-out;
}

.profile__menu {
  background-color: var(--white);
  z-index: 30;
  position: absolute;
  top: 0;
  right: -100px;
  bottom: 0;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s ease-in-out;
  transition: right 250ms ease-in-out;
}

.profile__menu.open {
  display: flex;
  visibility: visible;
  width: 320px;
  opacity: 1;
  flex-direction: column;
  align-items: flex-start;
  right: 0;
  gap: var(--spacing-medium);
  padding: var(--spacing-small);
  transition: visibility 0s, opacity 0.5s ease-in-out;
  transition: right 250ms ease-in-out;
}

.profile-user, .actions {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: var(--spacing-small);
}
</style>
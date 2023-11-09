<script setup>
import { computed, ref } from 'vue';
import meusDadosBranco from '@/assets/img/log_meus_dados_white.png';
import BreadCrumbs from '@/components/shared/Layout/BreadCrumbs/BreadCrumbs.vue';
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
}

const open = ref(false);
</script>

<template>
<div class="upper-bar__wrapper">
  <div class="upper-bar">
    <div class="upper-bar__header">
      <BreadCrumbs/>
      <img :src="defaultProfilePic" class="upper-bar__profile-pic" v-on:click="open = true" />
    </div>
  </div>
  <div class="profile__menu" :class="{ open }">
    <div class="profile-user">
      <img :src="defaultProfilePic" class="upper-bar__profile-pic" v-on:click="open = false" />
      <LabelLarge>{{ user?.nome }} {{ user?.sobrenome }}</LabelLarge>
    </div>
    <div class="actions">
      <router-link to="/conta/editar">
        <ButtonLink type="user">
          Minha conta
        </ButtonLink>
      </router-link>
      <ButtonLink v-on:click="logout" type="log-out">
        Sair
      </ButtonLink>
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

.profile__menu {
  background-color: var(--white);
  width: 0px;
  z-index: 30;
  position: absolute;
  top: 0;
  left: 50%;
  height: 100vh;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
  transition: left 250ms ease-in-out;
}

.profile__menu.open {
  display: flex;
  visibility: visible;
  width: 100%;
  opacity: 1;
  flex-direction: column;
  align-items: flex-start;
  left: 0;
  gap: var(--spacing-medium);
  padding: var(--spacing-small);
}

.profile-user, .actions {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: var(--spacing-small);
}
</style>
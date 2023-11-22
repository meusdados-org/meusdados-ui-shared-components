<script setup>
import ButtonLink from '../../Actions/ButtonLink.vue';
import LinkComponent from '../../Actions/Link/LinkComponent.vue';

</script>

<template>
  <div class="lower-bar">
    <ButtonLink onlyIcon type="home" size="xlarge" to="/dashboard"/>
    <ButtonLink onlyIcon type="file" size="xlarge" to="/solicitacoes" />
    <ButtonLink onlyIcon type="user-check" size="xlarge" to="/consentimentos" />
  </div>
</template>

<style scoped>
.lower-bar {
  padding: var(--spacing-small) var(--spacing-large);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--white);
  box-shadow: var(--shadow-small);
}
</style>
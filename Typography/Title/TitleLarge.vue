<template>
  <h1 class="title-large"><slot></slot></h1>
</template>

<style scoped>
.title-large {
  font-family: 'Montserrat', sans-serif;
  font-size: var(--spacing-large);
  font-weight: 600;
  line-height: 125%;
  display: inline-block;
}
</style>
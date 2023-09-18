<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'CardTemplate',

}
</script>

<style scoped>
.card {
    padding: var(--spacing-large);
    border-radius: var(--border-radius-small);
    box-shadow: 0px 0px 20px 0px rgb(0 0 0 / 20%);
    background-color: white;
}
</style>
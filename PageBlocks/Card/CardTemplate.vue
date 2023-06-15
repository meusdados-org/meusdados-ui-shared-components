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
    padding: 2rem;
    border-radius: var(--border-radius-1);
    box-shadow: 0px 0px 20px 0px rgb(0 0 0 / 20%);
    background-color: white;
}
</style>
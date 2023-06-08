<template>
    <div class="background">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'BackgroundPage',
}
</script>

<style scoped>
.background{
    height: 100vh;
    background-image: url("@/assets/img/bg-login.png");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;    
}
</style>
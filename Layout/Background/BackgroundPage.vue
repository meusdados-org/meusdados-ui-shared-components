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
    height: 100dvh;
    background: linear-gradient(0deg, rgba(139, 92, 246, 0.75) 0%, rgba(139, 92, 246, 0.75) 100%), url("@/assets/img/bg-login.jpeg"), lightgray 50% / cover no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;    
}
</style>
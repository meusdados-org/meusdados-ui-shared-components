<template>
    <ButtonPrimary class="button">
        <Icon size="1rem" type="plus"/> Cadastrar
    </ButtonPrimary>
</template>

<script>
import ButtonPrimary from '@/components/shared/Actions/ButtonPrimary.vue';
import Icon from '@/components//shared/Icon/Icon.vue'


export default {
    components: {
        ButtonPrimary,
        Icon
    }
}
</script>

<style scoped>
.button {
    height: 2rem;
}
</style>
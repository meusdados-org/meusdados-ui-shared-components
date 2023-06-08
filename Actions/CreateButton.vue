<template>
    <ButtonDefault class="button">
        <Icon size="1rem" type="plus"/> Cadastrar
    </ButtonDefault>
</template>

<script>
import ButtonDefault from '@/components/shared/Actions/ButtonPrimary.vue';
import Icon from '@/components//shared/Icon/Icon.vue'


export default {
    components: {
        ButtonDefault,
        Icon
    }
}
</script>

<style scoped>
.button {
    height: 2rem;
}
</style>
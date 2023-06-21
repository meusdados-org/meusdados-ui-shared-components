<template>
    <!-- <router-link :to='to'> -->
        <ButtonPrimary class="btn-criar">
            <Icon size=".950rem" type="arrow-left-circle"/> Voltar
        </ButtonPrimary>
    <!-- </router-link> -->
</template>

<script>
import ButtonPrimary from '@/components/shared/Actions/ButtonPrimary.vue';
import Icon from '@/components//shared/Icon/Icon.vue'

export default {
    components: {
        ButtonPrimary,
        Icon
    },
}
</script>



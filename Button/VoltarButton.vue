<template>
    <!-- <router-link :to='to'> -->
        <ButtonDefaultLong class="btn-criar">
            <Icon size=".950rem" type="arrow-left-circle"/> Voltar
        </ButtonDefaultLong>
    <!-- </router-link> -->
</template>

<script>
import ButtonDefaultLong from '@/components/shared/Button/ButtonPrimary.vue';
import Icon from '@/components//shared/Icon/Icon.vue'

export default {
    components: {
        ButtonDefaultLong,
        Icon
    },
}
</script>



<template>
    <ButtonLink type="download" :bold="false">
       Exportar
    </ButtonLink>
</template>

<script>
import ButtonLink from '@/components/shared/Actions/ButtonLink.vue';
import Icon from '@/components//shared/Icon/Icon.vue'

export default {
    components: {
        ButtonLink,
        Icon
    }
}
</script>
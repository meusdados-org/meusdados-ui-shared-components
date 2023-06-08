<template>
    <ButtonPrimary :disabled="disabled" class="button">
        <Icon size="1.25rem" :type="type"/>
    </ButtonPrimary>
</template>

<script>
import Icon from '@/components/shared/Icon/Icon.vue';
import ButtonPrimary from './ButtonPrimary.vue';

export default {
    name: 'ButtonIcon',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            required: true,
        }
    },
    components: {
        Icon,
        ButtonPrimary
    }
}
</script>

<style scoped>
.button {
    padding: .5rem;
    width: 2.5rem;
}
</style>
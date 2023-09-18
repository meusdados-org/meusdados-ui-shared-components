<template>
    <ButtonOutline :disabled="disabled" class="button">
        <Icon size="1.25rem" :type="type"/>
    </ButtonOutline>
</template>

<script>
import Icon from '@/components/shared/Icon/Icon.vue';
import ButtonOutline from './ButtonOutline.vue';

export default {
    name: 'ButtonOutlineIcon',
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
        ButtonOutline
    }
}
</script>

<style scoped>
.button {
    padding: var(--spacing-xsmall);
    width: 2.5rem;
}
</style>
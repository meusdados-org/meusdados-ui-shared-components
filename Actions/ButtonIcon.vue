<template>
    <ButtonPrimary :disabled="disabled" :icon="type" :size="size" :strokeWidth="strokeWidth" onlyIcon>
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
            required: true
        },
        size: {
            type: String,
            default: 'medium'
        },
        strokeWidth: {
            type: String,
            default: '2'
        }
    },
    components: {
        Icon,
        ButtonPrimary
    }
}
</script>
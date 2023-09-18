<template>
    <ButtonOutline :disabled="disabled" :icon="type" :size="size" class="button" onlyIcon>
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
        },
        size: {
            type: String,
            default: 'medium'
        },
    },
    components: {
        Icon,
        ButtonOutline
    }
}
</script>
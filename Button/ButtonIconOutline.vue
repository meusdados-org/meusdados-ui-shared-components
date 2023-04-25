<template>
    <ButtonOutline :disabled="disabled" class="button">
        <Icon size="1.25rem" :type="type"/>
    </ButtonOutline>
</template>

<script>
import Icon from '../Icon/Icon.vue';
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
    padding: .5rem;
    width: 2.5rem;
}
</style>
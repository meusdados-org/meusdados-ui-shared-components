<template>
    <ButtonPrimary :disabled="disabled" class="button" :class="{ tiny }">
        <Icon :size="tiny ? '10px' : '1.25rem'" :type="type" :align="false" :stroke-width="tiny ? '3' : '1'"/>
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
        },
        tiny: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Icon,
        ButtonPrimary
    }
}
</script>

<style scoped>
.button {
    padding: var(--spacing-xsmall);
    width: 2.5rem;
}

.tiny {
    padding: 0;
    height: 14px !important;
    width: 14px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: var(--spacing-xxxsmall);
}
</style>
<template>
    <ButtonPrimary :disabled="disabled" class="button">
        <span class="button-text">
            <slot></slot>
        </span>
    </ButtonPrimary>
</template>

<script>
import ButtonPrimary from './ButtonPrimary.vue';

export default {
    name: 'ButtonOutline',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    components: {
        ButtonPrimary
    }
}
</script>

<style scoped>
.button {
    background-color: transparent;
    border: 1px solid var(--blue-1);
    color: var(--blue-1);
}

.button-text {
    font-weight: 700;
}

.button:hover {
    background-color: transparent;
    border-color: var(--purple-1);
    color: var(--purple-1);
}

.button:disabled {
    background-color: transparent;
    border-color: var(--gray-2);
    color: var(--gray-2);
}

</style>
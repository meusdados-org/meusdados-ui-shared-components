<template>
    <button :disabled="disabled"><text2><slot></slot></text2></button>
</template>

<script>
import text2 from '@/components/shared/Typography/Body/BodyMedium.vue';

export default {
    props: {
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    components: {
        text2
    }
}
</script>

<style scoped>
button {
    color: var(--blue-1);
    border-radius: var(--spacing-xsmall);
    border: none;
    text-decoration: none;
    background: none;
    opacity: 1;
}

button:hover {
    color: var(--purple-1);
}

button:active {
    text-decoration: underline;
}

button:disabled {
    color: var(--gray-2);
}
</style>
<template>
    <button :class="{ 'boldButton': bold, borderBottom, nohover }" :disabled="disabled">
        <text1 :class="{ 'bold': bold }">
            <Icon v-if="type" :type="type" size="1rem"/>
            <slot></slot>
        </text1>
    </button>
</template>

<script>
import text1 from '@/components/shared/Typography/Text/Text1Component.vue';
import Icon from '@/components/shared/Icon/Icon.vue';

export default {
    name: 'ButtonLink',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: '',
        },
        bold: {
            type: Boolean,
            default: true,
        },
        borderBottom: {
            type: Boolean,
            default: true
        },
        nohover: {
            type: Boolean,
            default: false
        }
    },
    components: {
        text1,
        Icon,
    }
}
</script>

<style scoped>
.bold {
    font-weight: 700;
    font-size: var(--spacing-5);
}

button {
    font-size: 14px;
    background-color: transparent;
    border: none;
    color: var(--blue-1);
    column-gap: var(--spacing-3);
    cursor: pointer;
    padding: 0;
}

button:not(.nohover):hover {
    color: var(--purple-1);
}

.boldButton.borderBottom:focus {
    border-bottom: 2px solid var(--black);
}

button.borderBottom:focus {
    border-bottom: 1px solid var(--black);
}

button:disabled {
    color: var(--gray-2);
}
</style>
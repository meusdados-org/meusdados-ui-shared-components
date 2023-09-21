<template>
    <button :class="{ 'boldButton': bold, borderBottom, nohover, dark }" :disabled="disabled">
        <Icon v-if="type" :type="type" :size="iconSize"/>
        <LabelSmall v-if="size === 'small'">
            <slot></slot>
        </LabelSmall>
        <LabelMedium v-else-if="size === 'medium'">
            <slot></slot>
        </LabelMedium>
        <LabelLarge v-else>
            <slot></slot>
        </LabelLarge>
    </button>
</template>

<script>
import Icon from '@/components/shared/Icon/Icon.vue';
import LabelLarge from '@/components/shared/Typography/Label/LabelLarge.vue';
import LabelMedium from '@/components/shared/Typography/Label/LabelMedium.vue';
import LabelSmall from '@/components/shared/Typography/Label/LabelSmall.vue';

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
        },
        dark: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'medium'
        },
    },
    components: {
        Icon,
        LabelSmall,
        LabelMedium,
        LabelLarge
    },
    data() {
        return {
            iconSize: '12px'
        }
    },
    created() {
        const iconSizes = {
            small: '12px',
            medium: '14px',
            large: '18px'
        }
        this.iconSize = iconSizes[this.size];
    },
}
</script>

<style scoped>

button {
    background-color: transparent;
    border: none;
    border-top: var(--spacing-xxxsmall) solid transparent;
    border-bottom: var(--spacing-xxxsmall) solid transparent;
    color: var(--blue-1);
    column-gap: var(--spacing-xsmall);
    cursor: pointer;
    padding: 0;
}

button.dark {
    color: var(--white);
}

button.dark:hover {
    border-bottom: var(--spacing-xxxsmall) solid var(--white);
}

button:not(.dark):hover {
    color: var(--purple-1);
    border-bottom: var(--spacing-xxxsmall) solid var(--purple-1);
}



button:focus {
    border-bottom: var(--spacing-xxxsmall) solid var(--black);
}

button.dark:focus {
    border-bottom: var(--spacing-xxxsmall) solid var(--black);
}

button:disabled {
    color: var(--gray-2);
}

button.dark:disabled {
    opacity: .5;
}
</style>
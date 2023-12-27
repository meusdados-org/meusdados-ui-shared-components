<template>
    <button :class="{ dark, isActive, secondary }" :disabled="disabled" v-on:click="goTo">
        <div class="button" :class="{ onlyIcon, secondary }">
            <Icon v-if="type && !afterIcon" :type="type" :size="iconSize_"/>
            <LabelSmall v-if="size === 'small' && !onlyIcon">
                <slot></slot>
            </LabelSmall>
            <LabelMedium v-else-if="size === 'medium' && !onlyIcon">
                <slot></slot>
            </LabelMedium>
            <LabelLarge v-else-if="!onlyIcon">
                <slot></slot>
            </LabelLarge>
            <Icon v-if="type && afterIcon" :type="type" :size="iconSize_"/>
        </div>
    </button>
</template>

<script>
import Icon from '@/components/shared/Icon/Icon.vue';
import LabelLarge from '@/components/shared/Typography/Label/LabelLarge.vue';
import LabelMedium from '@/components/shared/Typography/Label/LabelMedium.vue';
import LabelSmall from '@/components/shared/Typography/Label/LabelSmall.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

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
        afterIcon: {
            type: Boolean,
            default: false
        },
        onlyIcon: {
            type: Boolean,
            default: false
        },
        iconSize: {
            type: String,
            default: undefined
        },
        to: {
            type: String,
            default: undefined
        },
        secondary: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Icon,
        LabelSmall,
        LabelMedium,
        LabelLarge
    },
    methods: {
        goTo() {
            if (!this.to) return;
            if (this.to === '#') {
                this.$dialog({ title: 'Funcionalidade em construção', message: 'Ops... Estamos construindo ainda nessa funcionalidade.', type: 'alert' });
                return;
            }
            this.$emit('changeRoute', this.to);
            this.$router.push({ path: this.to });
        }
    },
    data() {
        return {
            iconSize_: '12px'
        }
    },
    setup(props) {
        const route = useRoute()
        const isActive = computed(() => props.to ? route.path.includes(props.to) : false)
        return { isActive }
    },
    created() {
        const iconSizes = {
            small: '10px',
            medium: '12px',
            large: '16px',
            xlarge: '24px'
        }
        this.iconSize_ = iconSizes[this.size];
        if (this.iconSize) {
            this.iconSize_ = this.iconSize;
        }

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
    cursor: pointer;
    padding: 0;
    text-decoration: none;
}

button.secondary {
    color: var(--gray-2) !important;
}

button.isActive {
    color: var(--purple-1);
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: var(--spacing-xxxsmall);
}


.button.onlyIcon {
    column-gap: 0;
}

button.dark {
    color: var(--white);
}

button:not(.dark):hover, button:not(.dark):hover > .button {
    color: var(--purple-1) !important;
}

button:not(.dark):hover {
    border-bottom: var(--spacing-xxxsmall) solid var(--purple-1);
}

button.dark:hover, button.dark:hover > .button {
    color: var(--white) !important;
}

button.dark:hover {
    border-bottom: var(--spacing-xxxsmall) solid var(--white);
}



button:focus {
    border-bottom: var(--spacing-xxxsmall) solid var(--black);
}

button.dark:focus {
    border-bottom: var(--spacing-xxxsmall) solid var(--black);
}

button:disabled {
    color: var(--gray-2) !important;
}

button.dark:disabled {
    opacity: .5;
}

button:disabled:hover {
    color: var(--gray-2) !important;
    border-bottom: var(--spacing-xxxsmall) solid transparent;
}
</style>
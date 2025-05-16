<template>
    <button :type="type" :class="{
        nohover,
        sameColorBackground,
        mini: size === 'mini',
        small: size === 'small',
        medium: size === 'medium',
        large: size === 'large',
        xlarge: size === 'xlarge',
        xxlarge: size === 'xxlarge',
        circle,
        onlyIcon,
        dark
    }" :disabled="disabled">
        <span class="text-button">
            <Icon :align="false" v-if="icon" :type="icon" :size="iconSize" :stroke-width="strokeWidth" />
            <LabelSmall v-if="size === 'small'">
                <slot></slot>
            </LabelSmall>
            <LabelMedium v-else-if="size === 'medium'">
                <slot></slot>
            </LabelMedium>
            <LabelLarge v-else>
                <slot></slot>
            </LabelLarge>
        </span>
    </button>
</template>

<script>
import Icon from '../Icon/Icon.vue';
import LabelLarge from '../Typography/Label/LabelLarge.vue';
import LabelMedium from '../Typography/Label/LabelMedium.vue';
import LabelSmall from '../Typography/Label/LabelSmall.vue';


export default {
    name: 'ButtonPrimary',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'button'
        },
            nohover: {
                type: Boolean,
            default: false
        },
        sameColorBackground: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'medium'
        },
        dark: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
        onlyIcon: {
            type: Boolean,
            default: false
        },
        strokeWidth: {
            type: String,
            default: '2'
        },
        circle: {
            type: Boolean,
            default: false
        }
    },
    components: { LabelSmall, LabelMedium, LabelLarge, Icon },
    data() {
        return {
            iconSize: '12px'
        }
    },
    created() {
        const iconSizes = {
            small: '10px',
            medium: '12px',
            large: '16px'
        }

        this.iconSize = iconSizes[this.size]
        if (this.onlyIcon) {
           const iconSizes = {
                mini: '14px',
                small: '16px',
                medium: '18px',
                large: '20px',
                xlarge: '48px',
                xxlarge: '80px'
           }
           this.iconSize = iconSizes[this.size]
        }
    },
}
</script>

<style scoped>
.text-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: var(--spacing-xxxsmall);
}

button {
    padding: 0 var(--spacing-medium);
    background: #8b5cf6 0% 0% no-repeat padding-box;
    border-radius: var(--border-radius-small);
    border: none;
    color: var(--white);
    cursor: pointer;
    opacity: 1;
}

button.circle {
    border-radius: var(--border-radius-full);
}

button.onlyIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

button.onlyIcon > .text-button {
    gap: 0;
}

button.onlyIcon.mini {
    width: var(--spacing-small);
    height: var(--spacing-small);
    padding: 0;
    color: var(--white);
    border-radius: var(--border-radius-mini);
}

button.onlyIcon.small {
    width: var(--spacing-large);
    height: var(--spacing-large);
    color: var(--white);
    padding: 0;
}

button.onlyIcon.medium {
    width: 40px;
    height: 40px;
    color: var(--white);
    padding: 0;
}

button.onlyIcon.large {
    width: var(--spacing-xlarge);
    height: var(--spacing-xlarge);
    color: var(--white);
    padding: 0;
}

button.onlyIcon.xlarge {
    width: var(--spacing-xxlarge);
    height: var(--spacing-xxlarge);
    color: var(--white);
    padding: 0;
}

button.onlyIcon.xxlarge {
    width: var(--spacing-xxlarge);
    height: var(--spacing-xxlarge);
    color: var(--white);
    padding: 0;
}

button.dark {
    border-radius: var(--border-radius-small, 8px);
    background: var(--white, #FFF);
    color: var(--black);
}

button.small {
    height: var(--spacing-large);
    padding: 7px var(--spacing-small);
}

button.medium {
    height: 40px;
    padding: 10px var(--spacing-medium);
}

button.large {
    height: var(--spacing-xlarge);
    padding: 14px var(--spacing-large);
}

button:not(.nohover):hover {
    background-color: var(--blue-1);
    color: var(--white) !important;
    -webkit-transition-delay: 0s;
    -moz-transition-delay: 0s;
    -ms-transition-delay: 0s;
    -o-transition-delay: 0s;
    transition-delay: 0s;
}

button.dark:hover {
    background-color: rgba(255, 255, 255, .75);
    color: var(--black) !important;
    transition-delay: 250ms;
}

button.sameColorBackground:hover {
    background-color: var(--blue-1);
    color: var(--purple-1) !important;
}

button:focus {
    outline: var(--spacing-xxxsmall) solid var(--black);
    outline-offset: var(--spacing-xxxsmall);
}

button.dark:focus {
    outline: var(--spacing-xxxsmall) solid var(--purple-1);
    outline-offset: var(--spacing-xxxsmall);
}

button:disabled {
    background-color: var(--gray-2);
    border: 1px solid var(--gray-2);
    color: var(--white);
}

button.dark:disabled, button.dark:disabled:hover, button.dark:disabled:focus {
    background-color: rgba(255, 255, 255, .5);
}

button:disabled:hover {
    background-color: var(--gray-2);
    border: 1px solid var(--gray-2);
    color: var(--white);
}

button:disabled:focus {
    outline: none
}
</style>

<template>
    <button :type="type" :class="{
        nohover,
        sameColorBackground,
        small: size === 'small',
        medium: size === 'medium',
        large: size === 'large',
        onlyIcon,
        dark
    }" :disabled="disabled">
        <span class="text-button">
            <Icon :align="false" v-if="icon" :type="icon" :size="iconSize" stroke-width="2" />
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
            small: '12px',
            medium: '14px',
            large: '18px'
        }

        this.iconSize = iconSizes[this.size];
        if (this.onlyIcon) {
           const iconSizes = {
                mini: '14px',
                small: '16px',
                medium: '18px',
                large: '20px',
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
    gap: var(--spacing-xxxsmall);
}

button {
    background-color: transparent;
    padding: 0 var(--spacing-medium);
    border: var(--blue-1) solid 1px;
    border-radius: var(--border-radius-small);
    color: var(--blue-1);
    cursor: pointer;
    opacity: 1;
    -webkit-transition: .5s all;
    -webkit-transition-delay: 5s;
    -moz-transition: .5s all;
    -moz-transition-delay: 5s;
    -ms-transition: .5s all;
    -ms-transition-delay: 5s;
    -o-transition: .5s all;
    -o-transition-delay: 5s;
    transition: .25s all;
    transition-delay: .25s;
}

button.onlyIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

button.onlyIcon.mini {
    width: var(--spacing-small);
    height: var(--spacing-small);
    color: var(--blue-1);
}

button.onlyIcon.small {
    width: var(--spacing-large);
    height: var(--spacing-large);
    color: var(--blue-1);
    padding: 0;
}

button.onlyIcon.medium {
    width: 40px;
    height: 40px;
    color: var(--blue-1);
    padding: 0;
}

button.onlyIcon.large {
    width: var(--spacing-xlarge);
    height: var(--spacing-xlarge);
    color: var(--blue-1);
    padding: 0;
}


button.dark {
    border-radius: var(--border-radius-small, 8px);
    border-color: var(--white, #FFF);
    color: var(--white);
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
    border-color: var(--purple-1);
    color: var(--purple-1) !important;
    -webkit-transition-delay: 0s;
    -moz-transition-delay: 0s;
    -ms-transition-delay: 0s;
    -o-transition-delay: 0s;
    transition-delay: 0s;
}

button.dark:hover {
    border-color: var(--purple-1);
    color: var(--purple-1) !important;
    transition-delay: 250ms;
}

button.sameColorBackground:hover {
    background-color: var(--blue-1);
    color: var(--purple-1);
}

button:focus {
    outline: var(--spacing-xxxsmall) solid var(--purple-1);
    border-color: var(--blue-1);
    outline-offset: var(--spacing-xxxsmall);
}

button.dark:focus {
    outline: var(--spacing-xxxsmall) solid var(--purple-1);
    border-color: var(--white);
    outline-offset: var(--spacing-xxxsmall);
}


button.dark:disabled, button.dark:disabled:hover, button.dark:disabled:focus {
    border-color: var(--gray-2);
    color: var(--gray-2);
}

button:disabled, button:disabled:hover {
    border-color: var(--gray-2);
    color: var(--gray-2) !important;
}

button:disabled:focus {
    outline: none
}
</style>
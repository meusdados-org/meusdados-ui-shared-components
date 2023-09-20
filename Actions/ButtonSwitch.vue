<template>
    <input type="checkbox" :disabled="isDisabled" :name="name" :id="id" :checked="value" @input="$emit('update:checked', $event.target.checked)" placeholder=" " v-on:click="$emit('switchFlag')" :class="{ small, red }"/>
    <text1 v-if="showLabel">{{ label }}</text1>
</template>

<script>
import text1 from '@/components/shared/Typography/Body/BodyLarge.vue';

export default {
    name: 'ButtonSwitch',
    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        small: {
            type: Boolean,
            default: true
        },
        showLabel: {
            type: Boolean,
            default: true,
        },
        red: {
            type: Boolean,
            default: false
        }
    },
    components: {
        text1,
    },
    computed: {
        name() {
            return this.label.toLowerCase();
        },
        id() {
            return Math.random();
        },
        isDisabled() {
            return this.disabled;
        }
    },
}
</script>

<style scoped>
input {
    cursor: pointer;
    position: relative;
    width: var(--spacing-xlarge);
    height: var(--spacing-medium);
    border-radius: 40px;
    outline: none;
    background-color: #ccc;
    -webkit-appearance: none;
    transition: background .25s rgba(0,0,0,0.15);
}

input:focus {
   outline: var(--spacing-xxxsmall) solid var(--black);
   outline-offset: var(--spacing-xxxsmall);
}

.small {
    width: var(--spacing-large);
    height: var(--spacing-small);
}

input::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    height:  var(--spacing-small);
    width:  var(--spacing-small);
    background-color: white;
    transition: left .25s;
}

.small::after {
    height: 10px;
    width: 10px;
}

input:checked {
    background-color: var(--purple-1);
}

input.red:checked {
    background-color: var(--red-1);
}

input.red:checked ~ span{
    color: var(--red-1);
}

input:checked::after {
    left: 75%;
}

</style>
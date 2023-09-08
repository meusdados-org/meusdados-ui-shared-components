<template>
    <input type="checkbox" :disabled="isDisabled" :name="name" :id="id" :checked="value" @input="$emit('update:checked', $event.target.checked)" placeholder=" " v-on:click="$emit('switchFlag')" :class="{ mini, red }"/>
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
        mini: {
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
    width: 48px;
    height: 24px;
    border-radius: 40px;
    outline: none;
    background-color: #ccc;
    -webkit-appearance: none;
    transition: background .3s rgba(0,0,0,0.15);
}

.mini {
    width: 18px;
    height: 12px;
}

input::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    background-color: white;
    transition: left .3s;
}

.mini::after {
    height: 7px;
    width: 7px;
    left: 30%;
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

.mini:checked::after {
    left: 70%;
}

</style>
<template>
    <label class="container-InputTextFieldField"> <text1><slot>{{ label }}</slot></text1>
        <input type="checkbox" :disabled="isDisabled" class="input" :name="name" :id="id" :checked="value" @input="$emit('update:checked', $event.target.checked)" placeholder=" " />
        <span class="checkbox">
            <div class="hover-square"></div>
            <Icon type="check" size="12px" class="icon" stroke-width="4" :align="false"/>
        </span>
    </label>
</template>

<script>
import text1 from '@/components/shared/Typography/Body/BodyLarge.vue';
import Icon from '@/components/shared/Icon/Icon.vue';

export default {
    name: 'InputTextFieldField',
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    components: {
    text1,
    Icon
},
    computed: {
        name() {
            return this.label ? this.label.toLowerCase() : Math.random();
        },
        id() {
            return `inputCheckBox-${this.label ? this.label.toLocaleLowerCase().replace(/\s/g, '-') : Math.random()}`
        },
        isDisabled() {
            return this.disabled;
        }
    },
}
</script>

<style scoped>
.container-InputTextFieldField{
    display: block;
    position: relative;
    padding-left: 23px;
    cursor: pointer;
    margin-left: 3px;
    width: fit-content;
}

.container-InputTextFieldField input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkbox {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 1px;
    width: var(--spacing-small);
    height: var(--spacing-small);
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: var(--spacing-xxxsmall) solid var(--black);
    border-radius: var(--spacing-xxxsmall);
    background-color: var(--white);
}

.icon, .hover-square {
    display: none;
}

.container-InputTextFieldField input:checked ~ .checkbox {
    background-color: var(--purple-1);
    border-color: var(--purple-1);
}

.checkbox::after {
    content: "";
    position: absolute;
    display: none;
}

.input:checked ~ .checkbox .icon,
.input:hover:checked ~ .checkbox .icon{
    display: block;
    color: var(--white);
}

.input:focus ~ .checkbox {
    border-color: var(--purple-1);
    outline: var(--spacing-xxxsmall) solid var(--black);
    outline-offset: 1px;
}

.container-InputTextFieldField input:hover:not(:checked):not(:disabled) ~ .checkbox .hover-square {
    height: 6px;
    width: 6px;
    background-color: var(--gray-2);
    border: none;
    border-radius: 2px;
    display: block;
}

.container-InputTextFieldField input:disabled ~ .checkbox {
    background-color: var(--gray-3);
    border-color: var(--gray-2);
    cursor: default;
}


label {
    color: var(--gray-1);
    text-align: left;
}

</style>
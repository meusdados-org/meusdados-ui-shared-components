<template>
    <div class="wrapper-inputTextField">
        <div class="container-InputTextFieldField" :class="{ formGroupVersion, error, search, dark }">
            <input v-bind="inputProps" :disabled="disabled" :value="formattedValue" @input="onInput" @blur="validateDoc"
                :maxlength="18" :class="{ 'same-style': sameStyle }" :style="{ 'font-size': sizeVar }"  :placeholder="''"/>
            <label v-if="label" :style="{ 'font-size': sizeVar }">{{ label }}</label>
        </div>
        <FormError v-if="error">
           {{error_message}}
        </FormError>
    </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import FormError from './Form/FormError.vue';

const props = defineProps({
    // value: String,
    label: String,
    disabled: Boolean,
    inputProps: Object,
    placeholder: String,
    modelValue: String,
    validator: Function
});

const emit = defineEmits(['update:modelValue']);

const rawValue = ref('');

watch(
    () => props.modelValuea,
    (val) => {
        rawValue.value = unmask(val || '')
    },
    { immediate: true }
)

const formattedValue = computed(() => {
    return maskDocument(rawValue.value);
});

function onInput(e) {
    const val = e.target.value
    const digits = unmask(val)
    rawValue.value = digits

    const formatted = maskDocument(digits)
    emit('update:modelValue', formatted) 
}

function unmask(val) {
    return val.replace(/\D/g, '');
}

function maskDocument(val) {
    if (val.length <= 11) {
        return val
            .replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1-$2')
    } else {
        return val
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
    }
}
const error = ref(false);
const error_message = ref("");
function validateDoc(){
    if(props.validator){
        const msg = props.validator(rawValue.value);
        error_message.value = msg || '';
        if(error_message.value !== ''){
            error.value = true;
        }
    }
}
</script>

<style scoped>
.wrapper-inputTextField {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xsmall);
    width: 100%;
}


.container-InputTextFieldField {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
}

.container-InputTextFieldField>input {
    border-bottom: 1px solid var(--gray-2);
    box-sizing: border-box;
    border-top: none;
    border-left: none;
    border-right: none;
    height: var(--spacing-large);
    padding: 0 var(--spacing-xsmall);

    font-family: 'Montserrat';
    line-height: normal;
    font-size: var(--spacing-small);
    font-weight: 400;

    transition: all .1s linear;
    -webkit-transition: all .1s linear;
    -moz-transition: all .1s linear;
    background-color: transparent;
}

.container-InputTextFieldField.dark>input {
    color: var(--white);
}

.container-InputTextFieldField.formGroupVersion>input {
    height: 18px;
    font-size: 12px;
    font-weight: 400;
}

.container-InputTextFieldField>input:-webkit-autofill {
    box-shadow: 0 0 0 30px var(--white-1) inset;
}

.container-InputTextFieldField>input:hover {
    border-bottom-color: var(--black-1);
}

.container-InputTextFieldField.dark>input:hover {
    border-bottom-color: var(--white);
}

.container-InputTextFieldField>input:focus {
    outline: none;
    border-bottom-color: var(--purple-1);
    transition: all .1s linear;
}

.container-InputTextFieldField.dark>input:focus {
    border-bottom-color: var(--blue-3);
}

.container-InputTextFieldField input::placeholder {
    color: transparent;
}

.container-InputTextFieldField>label {
    pointer-events: none;
    position: absolute;
    top: 25%;
    color: var(--gray-2);
    transition: all .1s linear;
    -webkit-transition: all .1s linear;
    -moz-transition: all .1s linear;
    box-sizing: border-box;
    padding: 0 var(--spacing-xsmall);
}

.container-InputTextFieldField.dark>label {
    color: var(--white);
}

.container-InputTextFieldField:not(.search) input:focus+label,
.container-InputTextFieldField:not(.search) input:not(:placeholder-shown)+label {
    font-size: 12px !important;
    top: -12px;
    color: var(--gray-1);
}

.container-InputTextFieldField.search input:focus+label,
.container-InputTextFieldField.search input:not(:placeholder-shown)+label {
    display: none;
}

.container-InputTextFieldField input:not(:focus)+label,
.container-InputTextFieldField input:not(:placeholder-shown)+label {
    color: rgba(12, 12, 12, 0.651);
}

.container-InputTextFieldField.dark input:not(:focus)+label,
.container-InputTextFieldField.dark input:not(:placeholder-shown)+label {
    color: var(--gray-3);
}

.container-InputTextFieldField>input:not(.same-style):disabled,
.container-InputTextFieldField>input:not(.same-style):disabled+label {
    border-bottom-color: var(--gray-2);
    color: var(--gray-2);
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.switch {
    position: relative;
    bottom: -25px;
    width: fit-content;
    right: -93%;
}

.search-icon {
    position: absolute;
    right: var(--spacing-xsmall);
    bottom: var(--spacing-xsmall);
}
</style>

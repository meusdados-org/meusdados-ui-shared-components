<template>
  <div class="wrapper-inputTextField">
    <div class="container-InputTextFieldField" :class="{ formGroupVersion, error, search, dark }">
      <input
        v-bind="inputProps"
        :disabled="disabled"
        :value="formattedValue"
        @input="onInput"
        @blur="validateTelefone"
        :maxlength="15"
        :class="{ 'same-style': sameStyle }"
        :style="{ 'font-size': sizeVar }"
        :placeholder="''"
        v-mask="mask"
      />
      <label v-if="label" :style="{ 'font-size': sizeVar }">{{ label }}</label>
    </div>
    <FormError v-if="error">
      {{ errorMessage }}
    </FormError>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FormError from './Form/FormError.vue';

const props = defineProps({
  value: String,
  label: String,
  disabled: Boolean,
  inputProps: Object,
  placeholder: String,
  mask: {
    type: String,
    default: '(00) 00000-0000'
  }
});

const emit = defineEmits(['update:value', 'erro']);
const error = ref(false);
const errorMessage = ref('');
const rawValue = ref('');

const formattedValue = computed(() => rawValue.value);

function onInput(e) {
  rawValue.value = e.target.value;
  emit('update:value', rawValue.value);
}

function allNumberEquals(phone){
    let phoneWithoutDDD = phone.substring(2);
    let uniqueDigits = new Set (phoneWithoutDDD);

    if(uniqueDigits.size === 1){
        return true;
    } 

    return false;
}
const validDDDs = [11, 12, 13, 14, 15, 16, 17, 18, 19,
                   21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38,
                   41, 42, 43, 44, 45, 46, 47, 48, 49,
                   51, 53, 54, 55, 61, 62, 63, 64,
                   65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79,
                   81, 82, 83, 84, 85, 86, 87, 88, 89,
                   91, 92, 93, 94, 95, 96, 97, 98, 99];

function validateTelefone() {
    const phoneNumber = rawValue.value.replace(/\D/g, '');

    if(phoneNumber.length < 10 || phoneNumber.length > 11){
        errorMessage.value = 'Telefone inválido';
        error.value = true;
        emit('erro', true);
        return;
    } 

    const DDD = parseInt(phoneNumber.substring(0, 2));
    if(!validDDDs.includes(DDD)) {
        errorMessage.value = 'DDD inválido';
        error.value = true;
        emit('erro', true);
        return;
    }

    if(allNumberEquals(phoneNumber)){
        errorMessage.value = 'Telefone inválido';
        error.value = true;
        emit('erro', true);
        return;
    }

    errorMessage.value = '';
    error.value = false;
    emit('erro', false);
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

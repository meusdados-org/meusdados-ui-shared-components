<template>
  <div class="wrapper-inputTextField">
    <div class="container-InputTextFieldField" :class="{ formGroupVersion, error, search, dark }">
      <input
        v-if="!mask"
        v-bind="inputProps"
        :type="isPassword ? passwordFieldType : type"
        :disabled="disabled_"
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @blur="handleBlur"
        :autocomplete="isPassword ? 'off' : 'on'"
        :class="{'same-style': sameStyle }"
        :style="{'font-size': sizeVar}"
      />
      <input
        v-else
        v-bind="inputProps"
        v-mask="mask"
        :disabled="disabled_"
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @blur="handleBlur"
        :autocomplete="isPassword ? 'off' : 'on'"
        :class="{'same-style': sameStyle }"
        :style="{'font-size': sizeVar}"
      />
      <label v-if="label" :style="{'font-size': sizeVar}" >{{ label }}</label>

        <button class="switch" v-if="isPassword" v-on:click="switchVisibility">
            <Icon :type="passwordFieldType === 'password' ? 'eye' : 'eye-off'" size="20px"/>
        </button>
      <Icon v-if="search" class="search-icon" type="search" size="12px" />
    </div>
    <FormError v-if="error">
      Este campo é obrigatório
    </FormError>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue';
import ButtonLink from '../Actions/ButtonLink.vue';
import FormError from './Form/FormError.vue';

export default {
    name: "InputTextFieldField",
    props: {
        label: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            default: "text",
        },
        modelValue: {
            type: [String, Number],
            required: true,
        },
        maxlength: {
            type: Number,
            default: 50,
        },
        mask: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        formGroupVersion: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        sameStyle: {
            type: Boolean,
            default: false
        },
        search: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'large'
        },
        dark: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'bluring'],
    data() {
        return {
            isPassword: false, // Controla se o campo é do tipo 'password'
            passwordFieldType: "password", // Alterna entre 'password' e 'text' para o input
            inputProps: {
                name: this.label ? this.label.toLowerCase() : Math.random(),
                id: `InputTextFieldField-${this.label ? this.label.toLocaleLowerCase().replace(/\s/g, "-") : Math.random()}`,
                maxlength: this.maxlength,
                placeholder: " ",
                required: this.required,
                style: {
                    'font-size': this.sizeVar
                }
            },
            error: false,
            sizeVar: ''
        };
    },
    computed: {
        disabled_() {
            return this.disabled;
        }
    },
    methods: {
        switchVisibility() {
            // Alterna o tipo do campo de senha entre 'password' e 'text'
            this.passwordFieldType =
                this.passwordFieldType === "password" ? "text" : "password";
        },
        handleBlur() {
            this.error = this.required && !this.modelValue;
            this.$emit("bluring");
        },
    },
    created() {
        // Define 'isPassword' com base na prop 'type' do componente
        // Isso garante que o olho só apareça para campos de senha.
        this.isPassword = this.type === "password";

        const sizes = {
            large: '16px',
            medium: '12px',
            small: '10px',
        }
        this.sizeVar = sizes[this.size];
    },
    components: { FormError, Icon, ButtonLink }
};
</script>

<style scoped>
/* SEUS ESTILOS EXISTENTES - NENHUMA MUDANÇA AQUI */
.wrapper-inputTextField {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xsmall);
  width: 100%;
}

.container-InputTextFieldField{
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
}

.container-InputTextFieldField > input{
    border-bottom: 1px solid var(--gray-2);
    box-sizing: border-box;
    border-top: none;
    border-left: none;
    border-right: none;
    height: var(--spacing-large);
    padding: 0 var(--spacing-xsmall);

    font-family: 'Montserrat';
    line-height: normal;
    font-size:  var(--spacing-small);
    font-weight: 400;

    transition: all .1s linear;
    -webkit-transition: all .1s linear;
    -moz-transition: all .1s linear;
    background-color: transparent;
}

.container-InputTextFieldField.dark > input{
    color: var(--white);
}

.container-InputTextFieldField.formGroupVersion > input {
  height: 18px;
  font-size: 12px;
  font-weight: 400;
}

.container-InputTextFieldField > input:-webkit-autofill{
    box-shadow: 0 0 0 30px var(--white-1) inset;
}

.container-InputTextFieldField > input:hover{
    border-bottom-color: var(--black-1);
}

.container-InputTextFieldField.dark > input:hover {
    border-bottom-color: var(--white);
}

.container-InputTextFieldField > input:focus{
    outline: none;
    border-bottom-color:var(--purple-1);
    transition: all .1s linear;
}

.container-InputTextFieldField.dark > input:focus{
    border-bottom-color: var(--blue-3);
}

.container-InputTextFieldField input::placeholder{
    color: transparent;
}

.container-InputTextFieldField > label{
    pointer-events: none;
    position: absolute;
    top: 15%;
    color: var(--gray-2);
    transition: all .1s linear;
    -webkit-transition: all .1s linear;
    -moz-transition: all .1s linear;
    box-sizing: border-box;
    padding: 0 var(--spacing-xsmall);
}

.container-InputTextFieldField.dark > label {
    color: var(--white);
}

.container-InputTextFieldField:not(.search)  input:focus + label,
.container-InputTextFieldField:not(.search)  input:not(:placeholder-shown) + label{
    font-size: 12px !important;
    top: -12px;
    color: var(--gray-1);
}

.container-InputTextFieldField.search  input:focus + label,
.container-InputTextFieldField.search  input:not(:placeholder-shown) + label{
    display: none;
}

.container-InputTextFieldField  input:not(:focus) + label,
.container-InputTextFieldField  input:not(:placeholder-shown) + label{
    color: rgba(12, 12, 12, 0.651);
}

.container-InputTextFieldField.dark  input:not(:focus) + label,
.container-InputTextFieldField.dark  input:not(:placeholder-shown) + label{
    color: var(--gray-3);
}

.container-InputTextFieldField > input:not(.same-style):disabled,
.container-InputTextFieldField > input:not(.same-style):disabled + label{
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
    bottom: 25px;
    width: fit-content;
    right: -93%;
    text-decoration: none;
    z-index: 10; 
    background-color: transparent;
    color: var(--purple-1);
    border: none;
    cursor: pointer;
}

.search-icon {
    position: absolute;
    right: var(--spacing-xsmall);
    bottom: var(--spacing-xsmall);
}

input[type="password"]::-ms-reveal {
    display: none;
}

input[type="password"]::-webkit-outer-spin-button,
input[type="password"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="password"]::-webkit-reveal {
    display: none;
}

input[type="password"] {
    -webkit-appearance: none; 
    -moz-appearance: none;    
    appearance: none;         
}

input[type="password"]::-webkit-contacts-auto-fill-button {
    visibility: hidden;
    display: none !important;
    pointer-events: none;
    position: absolute;
    right: 0;
}

.switch:hover {
    color: var(--purple-1);
}

/* Quando o elemento está focado (ex: clicado ou tabulado) */
.switch:focus {
    color: var(--purple-1); /* Opcional: remove o contorno padrão de foco do navegador */
}

/* Quando o elemento está ativo (sendo clicado) */
.switch:active {
    color: var(--purple-1);
}


</style>
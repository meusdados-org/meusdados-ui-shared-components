<template>
  <div class="wrapper-inputTextField">
    <div class="container-InputTextFieldField" :class="{ formGroupVersion, error }">
      <input
        v-if="!mask"
        v-bind="inputProps"
        :type="isPassword ? passwordFieldType : type"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
        @blur="handleBlur"
      />
      <input
        v-else
        v-bind="inputProps"
        v-mask="mask"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
        @blur="handleBlur"
      />
      <label v-if="label">{{ label }}</label>
    </div>
    <FormError v-if="error">
      Este campo é obrigatório
    </FormError>
  </div>
</template>

<script>
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
        value: {
            type: String,
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
        }
    },
    data() {
        return {
            isPassword: false,
            passwordFieldType: "password",
            inputProps: {
                name: this.label ? this.label.toLowerCase() : Math.random(),
                id: `InputTextFieldField-${this.label ? this.label.toLocaleLowerCase().replace(/\s/g, "-") : Math.random()}`,
                disabled: this.disabled,
                maxlength: this.maxlength,
                placeholder: " ",
                required: this.required,
            },
            error: false,
        };
    },
    methods: {
        switchVisibility() {
            this.passwordFieldType =
                this.passwordFieldType === "password" ? "text" : "password";
        },
        handleBlur() {
            this.error = this.required && !this.value;
            this.$emit("bluring");
        },
    },
    created() {
        this.isPassword = this.type === "password";
    },
    components: { FormError }
};
  </script>

<style scoped>

.wrapper-inputTextField {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .5rem;
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
    height: 2rem;
    padding: 0 .5rem;

    font-family: 'Montserrat';
    line-height: normal;
    font-size: 1rem;
    font-weight: 400;

    transition: all .1s linear;
    -webkit-transition: all .1s linear;
    -moz-transition: all .1s linear;
    background-color: transparent;
}

.container-InputTextFieldField.error > input{
    border-bottom-color: var(--red-1);
}

.container-InputTextFieldField.formGroupVersion > input {
  height: 18px;
  font-size: 12px;
  font-weight: 400;
}

.container-InputTextFieldField > input:-webkit-autofill{
    box-shadow: 0 0 0 30px var(--white) inset;
}

.container-InputTextFieldField > input:hover{
    border-bottom-color: var(--black);
}

.container-InputTextFieldField > input:focus{
    outline: none;
    border-bottom-color:var(--purple-1);
    transition: all .1s linear;
}
.container-InputTextFieldField input::placeholder{
    color: transparent;
}

.container-InputTextFieldField > label{
    pointer-events: none;
    position: absolute;
    top: 25%;
    color: var(--gray-2);
    transition: all .1s linear;
    -webkit-transition: all .1s linear;
    -moz-transition: all .1s linear;
    box-sizing: border-box;
    padding: 0 .5rem;
}

.container-InputTextFieldField  input:focus + label,
.container-InputTextFieldField  input:not(:placeholder-shown) + label{
    font-size: 12px;
    top: -12px;
    color: var(--purple-1);
}

.container-InputTextFieldField  input:not(:focus) + label,
.container-InputTextFieldField  input:not(:placeholder-shown) + label{
    color: rgba(12, 12, 12, 0.651);
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>
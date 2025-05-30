<template>
    <div class="wrapper-inputTextField">

        <div class="container-InputTextFieldField" :class="{ formGroupVersion, error, search, dark }">
            <!-- <ButtonLink class="switch" v-if="isPassword" v-on:click="switchVisibility">
            <Icon
                :type="passwordFieldType === 'password' ? 'eye' : 'eye-off'"
                size="13px"
            />
        </ButtonLink> -->
            <input v-bind="inputProps" type="text" :value="value" @input="handleInputCep" @blur="handleBlur"
                :autocomplete="isPassword ? 'off' : 'on'" :class="{ 'same-style': sameStyle }"
                :style="{ 'font-size': sizeVar }" :maxLength="maxlength" />

            <label v-if="label" :style="{ 'font-size': sizeVar }">{{ label }}</label>
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
    name: "InputTextFieldCEP",
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
            default: 9,
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
    emits: ["update:value", "address-fetched"],
    data() {
        return {
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
        //Evento de Blur. Valida o CEP e chama a API do endereço
        async handleBlur(ev) {
            this.error = this.required && !this.value;
            // console.log("deu blur")
            // this.$emit("bluring");
            //Validação do CEP
            let rawCep = ev.target.value
            // console.log("raw cep com this.value" + rawCep)
            let numCep = rawCep.replace(/\D/g, '');
            // console.log(`Raw cep = ${rawCep} Num cep = ${numCep}`)

            if (!this.validateCep(numCep)) {
                // console.log("cep invalido")
                return
            }

            //Chamada da API
            try {
                // console.log("entrei auqi no try do handleBlur")
                let address = await this.fetchData(numCep);
                // console.log(address)
                this.$emit('address-fetched', address);
            } catch (error) {
                console.log(`Erro ${error}`)
            }
        },
        //Função que gera a máscara do CEP
        cepMask(value) {
            if (!value) return ""
            value = value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            return value
        },
        //Função que aplica a máscara do CEP no campo de INPUT
        handleInputCep(ev) {
            const rawInput = ev.target.value;
            const maskedInput = this.cepMask(rawInput);

            ev.target.value = maskedInput;
            this.$emit('update:value', maskedInput);
        },
        //Função para validar o CEP
        validateCep(cep) {

            if (!cep || cep.length !== 8) {
                // console.log("cep inválido. Matando a função aqui.")
                return false;
            }
            let isNumCep = /^\d+$/.test(cep);
            if (!isNumCep) {
                // alert("CEP contém caracteres inválidos");
                this.error = true;
                return false;
            }
            this.error = false;
            return true;
        },

        async fetchData(cep) {
            const urlToFetch = `https://brasilapi.com.br/api/cep/v1/${cep}`;
            const response = await fetch(urlToFetch);

            if (!response.ok) {
                throw new Error("CEP não encontrado");
            }

            const endereco = await response.json();

            return {
                city: endereco.city,
                neighborhood: endereco.neighborhood,
                state: endereco.state,
                street: endereco.street,
                uf: endereco.state
            }
        }
    },
    created() {
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
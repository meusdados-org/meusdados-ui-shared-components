<template>
    <div class="wrapper-InputTextArea">
        <div class="container-container-textarea" :class="{ dark }">
            <label :class="{ dark }">{{ label }}</label>
            <div class="container-textarea" :class="{ dark }">
                <textarea :class="{ dark }" :value="value" :id="id" rows="6" @input="$emit('update:value', $event.target.value)" @blur="handleBlur" :placeholder="placeholder" :maxlength="maxlength"></textarea>
            </div>
        </div>
        <FormError v-if="error">
            Este campo é obrigatório
        </FormError>
    </div>
</template>

<script>
import FormError from './Form/FormError.vue';

export default {
    name: 'InputTextArea',
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        maxlength: {
            type: Number,
            required: false,
            default: 255
        },
        height: {
            type: String,
            required: false,
            default: '2.5rem',
        },
        placeholder: {
            type: String,
            required: false,
            default: 'Digite um texto aqui...'
        },
        required: {
            type: Boolean,
            required: false,
            default: true
        },
        dark: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            id: `inputTextArea-${this.label ? this.label.toLowerCase().replace(/\s/g, '-') : Math.random()}`,
            error: false,
        }
    },
    components: {
        FormError
    },
    methods: {
        handleBlur() {
            this.error = this.required && this.isBlank(this.value);
        },
        isBlank(str) {
            return (!str || /^\s*$/.test(str));
        }
    },

}
</script>

<style scoped>

.wrapper-InputTextArea {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xsmall);
}

.container-container-textarea{
    display: flex;
    flex-direction: column;
    overflow: auto;
    column-gap: 9px;
    width: 100%;
}

.container-textarea {
    display: flex;
    border: 1px solid var(--gray-2);
    border-radius: var(--border-radius-small);
    padding: var(--spacing-small) 0;
    cursor: text;
}


label{
    color: var(--gray-1);
    font-family: 'Montserrat';
    font-size: 0.86rem;
    font-weight: 400;

    text-align: left;
    padding-bottom: var(--spacing-xxsmall);
}

label.dark {
    color: var(--white);
}

textarea {
    width: 100%;
    border: none;
    padding: 0 var(--spacing-small);

    font-family: 'Montserrat';
    font-size: 12px;
    font-weight: 400;
    line-height: 125%;
    resize: none;
    background-color: transparent;
}

textarea.dark {
    color: var(--white);
}

textarea:focus {
    outline: none;
}

.container-textarea:hover {
    border-color: var(--black);
}

.container-textarea.dark:hover {
    border-color: var(--white);
}


.container-textarea:has(textarea:focus){
    outline: none;
    border-color:var(--purple-1);
    transition: all .1s linear;
}

.container-textarea:has(textarea:focus) {
    border-color: var(--blue-3);
}

.container-textarea:has(textarea:not(:focus)) {
    color: rgba(12, 12, 12, 0.651);
}




</style>

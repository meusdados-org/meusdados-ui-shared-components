<template>
    <div class="wrapper-InputAutoCompleteField">
        <multiselect v-bind="$attrs" :placeholder="placeholder" :searchable="true"
        tag-placeholder=""
        :modelValue="value"
        selectedLabel="Selecionado" @close="handleClose">
        <template v-slot:caret="slotProps">
            <div @mousedown.prevent.stop="slotProps.toggle()" class="multiselect__select">
                <Icon type="chevron-down" size="1rem" stroke-width="1"/></div>
            </template>
            <template v-slot:noOptions>
                A lista está vazia.
            </template>
            <template v-slot:noResult>
                Nenhum resultado encontrado.
            </template>
        </multiselect>
        <FormError v-if="error">
            Este campo é obrigatório
        </FormError>
    </div>
</template>

<script>
import FormError from './Form/FormError.vue';
import Multiselect from './vue-multiselect/src/Multiselect.vue';
import '@/assets/css/vue-multiselect.css';
import Icon from '@/components/shared/Icon/Icon.vue';
export default {
    name: 'InputAutoCompleteField',
    components: {
    Multiselect,
    Icon,
    FormError
},
    props: {
        placeholder: String,
        value: String,
        required: {
            type: Boolean,
            default: false
        },
        // adiciona a prop rest para receber outras props
        ...Multiselect.props
    },
    data() {
        return {
          id: `inputAutoComplete-${this.placeholder.toLocaleLowerCase().replace(/\s/g, '-')}`,
          error: false,
        }
    },
    methods: {
        handleClose(value, id) {
            console.log(value, this.value);
            this.error = this.required && !value;
        }
    },
}
</script>

<style scoped>
.wrapper-InputAutoCompleteField {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>

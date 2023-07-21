<template>
    <div class="wrapper-InputMultiSelectField">
        <multiselect v-bind="$attrs" :placeholder="placeholder" :searchable="true"
        :modelValue="value"
        :multiple="true"
        :taggable="true"
        :trackBy="trackBy"
        selectedLabel=""
        @close="handleClose">
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
import Multiselect from './vue-multiselect/src/Multiselect.vue';
import '@/assets/css/vue-multiselect.css';
import FormError from './Form/FormError.vue';
import Icon from '@/components/shared/Icon/Icon.vue';
export default {
    name: 'InputMultiSelectField',
    components: {
        Multiselect,
        Icon,
        FormError
    },
    props: {
        placeholder: String,
        value: String,
        trackBy: {
            type: String,
            default: undefined
        },
        required: {
            type: Boolean,
            default: false
        },
        // adiciona a prop rest para receber outras props
        ...Multiselect.props
    },
    data() {
        return {
            id: `inputMultiSelectField-${this.placeholder.toLocaleLowerCase().replace(/\s/g, '-')}`,
            error: false,
        }
    },
    methods: {
        handleClose(value, id) {
            this.error = this.required && value.length === 0;
        }
    },
}
</script>

<style scoped>
.wrapper-InputMultiSelectField {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>

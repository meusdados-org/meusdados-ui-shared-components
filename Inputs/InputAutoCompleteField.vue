<template>
    <div class="wrapper-InputAutoCompleteField">
        <multiselect v-bind="$attrs" :placeholder="placeholder" :label="label" :searchable="true"
        tag-placeholder=""
        :modelValue="value"
        :max-height="maxHeight"
        selectedLabel=""
        @close="handleClose"
        :showAddOption="showAddOption"
        ref="multiselect"
        >
        <template v-slot:caret="slotProps">
            <div @mousedown.prevent.stop="slotProps.toggle()" class="multiselect__select">
                <Icon type="chevron-down" size="16px" stroke-width="1"/></div>
            </template>
            <template v-slot:noOptions>
                A lista está vazia.
            </template>
            <template v-slot:noResult>
                Nenhum resultado encontrado.
            </template>
            <template v-slot:option="slotProps">
                <span style="display: flex; justify-content: space-between"><span v-html="slotProps.optionLabel"/> <Tag v-if="showTag(slotProps.option)" class="tag">{{ tagLabel }}</Tag></span>
            </template>
        </multiselect>
        <FormError v-if="error">
            Este campo é obrigatório
        </FormError>
    </div>
</template>

<script>
import FormError from './Form/FormError.vue';
import Tag from '@/components/shared/Inputs/Tag/Tag.vue';
import Multiselect from './vue-multiselect/src/Multiselect.vue';
import '@/assets/css/vue-multiselect.css';
import Icon from '@/components/shared/Icon/Icon.vue';
export default {
    name: 'InputAutoCompleteField',
    components: {
        Multiselect,
        Icon,
        FormError,
        Tag
    },
    props: {
        placeholder: String,
        value: String,
        label: String,
        maxHeight: Number,
        showAddOption: {
            type: Boolean,
            default: false
        },
        tagLabel: {
            type: String,
            default: 'Rascunho'
        },
        showTag: {
            type: Function,
            default: () => false
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
          id: `inputAutoComplete-${this.placeholder.toLocaleLowerCase().replace(/\s/g, '-')}`,
          error: false,
        }
    },
    methods: {
        handleClose(value, id) {
            this.error = this.required && !value;
        },
        close() {
            this.$refs.multiselect.deactivate();
        }
    },
}
</script>

<style>
.wrapper-InputAutoCompleteField {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>

<template>
    <div class="wrapper-InputSelectField">
        <div class="notFormGroupVersion" :class="{ formGroupVersion }" >
            <multiselect v-bind="$attrs" :placeholder="placeholder" :allowEmpty="allowEmpty" :maxHeight="maxHeight" :searchable="false"
            :modelValue="value" :optionColors="optionColors"
            selectedLabel="" :id="id" :openDirection="formGroupVersion ? 'bottom' : openDirection"
            @close="handleClose">
                <template v-slot:caret="slotProps">
                    <div @mousedown.prevent.stop="slotProps.toggle()" class="multiselect__select">
                    <Icon type="chevron-down" size="16px" stroke-width="1"/>
                    <Tooltip v-if="tooltip">{{tooltip}}</Tooltip>
                </div>
                </template>
                <template v-slot:noOptions>
                    A lista está vazia.
                </template>
                <template v-slot:noResult>
                    Nenhum resultado encontrado.
                </template>
            </multiselect>
        </div>
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
import Tooltip from '@/components/shared/Inputs/Tooltip/Tooltip.vue';
export default {
    name: 'InputSelectField',
    components: {
        Multiselect,
        Icon,
        FormError,
        Tooltip
    },
    props: {
        placeholder: String,
        value: String,
        maxHeight: Number,
        allowEmpty: {
            type: Boolean,
            default: true
        },
        openDirection: {
            type: String,
            default: ''
        },
        formGroupVersion: {
            type: Boolean,
            default: false
        },
        optionColors: {
            type: Array,
            default: undefined
        },
        tooltip: String,
        required: {
            type: Boolean,
            default: false
        },
        // adiciona a prop rest para receber outras props
        ...Multiselect.props
    },
    data() {
        return {
            id: `inputSelectField-${this.placeholder.toLocaleLowerCase().replace(/\s/g, '-')}`,
            error: false,
        }
    },
    methods: {
        handleClose(value, id) {
            this.error = this.required && !value;
        }
    },
}
</script>

<style>
.notFormGroupVersion {
    width: 100%;
}

.formGroupVersion .multiselect, .formGroupVersion .multiselect--above {
    min-height: 18px;
    width: 100%;
}

.formGroupVersion .multiselect__option {
    padding: var(--spacing-xxsmall) var(--spacing-xsmall);
    font-size: 12px;
    min-height: 0px;
}

.formGroupVersion .multiselect__select {
    top: -1px;
    right: var(--spacing-xsmall);
}

.formGroupVersion .multiselect__tags {
    min-height: 18px;
}

.formGroupVersion .multiselect__single {
    font-size: 12px;
}

.wrapper-InputSelectField {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.multiselect__select {
    display: flex;
    align-items: center;
    gap: var(--spacing-xxsmall);
}
</style>

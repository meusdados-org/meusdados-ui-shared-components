<template>
    <div class="notFormGroupVersion" :class="{ formGroupVersion }" >
        <multiselect v-bind="$attrs" :placeholder="placeholder" :allowEmpty="allowEmpty" :maxHeight="maxHeight" :searchable="false"
        :modelValue="value"
        selectedLabel="" :id="id" :openDirection="formGroupVersion ? 'bottom' : openDirection">
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
    </div>
</template>

<script>
import Multiselect from '../vue-multiselect/src/Multiselect.vue';
import '@/assets/css/vue-multiselect.css';
import Icon from '../Icon/Icon.vue';
export default {
    name: 'InputSelectField',
    components: {
        Multiselect,
        Icon
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
        // adiciona a prop rest para receber outras props
        ...Multiselect.props
    },
    data() {
        return {
          id: `inputSelectField-${this.placeholder.toLocaleLowerCase().replace(/\s/g, '-')}`,
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
    min-width: 112px;
}

.formGroupVersion .multiselect__option {
    padding: .25rem .5rem;
    font-size: 12px;
    min-height: 0px;
}

.formGroupVersion .multiselect__select {
    top: -1px;
    right: 8px;
}

.formGroupVersion .multiselect__tags {
    min-height: 18px;
}

.formGroupVersion .multiselect__single {
    font-size: 12px;
}
</style>

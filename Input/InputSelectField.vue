<template>
    <multiselect v-bind="$attrs" :placeholder="placeholder" :maxHeight="maxHeight" :searchable="false"
    :modelValue="value"
    selectedLabel="">
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
        // adiciona a prop rest para receber outras props
        ...Multiselect.props
    }
}
</script>

<style scoped>
</style>

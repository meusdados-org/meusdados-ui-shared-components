<template>
    <multiselect v-bind="$attrs" :placeholder="placeholder" :searchable="true"
    :modelValue="value"
    selectedLabel="" class="filter" :filter="true">
        <template v-slot:singleLabel>
            {{ placeholder.substring(0, 4) }}:
        </template>
        <template v-slot:caret="slotProps" v-if="!close">
            <div @mousedown.prevent.stop="slotProps.toggle()" class="multiselect__select">
            <Icon type="filter" size="15px" stroke-width="1"/></div>
        </template>
        <template v-slot:caret v-else>
            <div @mousedown.prevent.stop="$emit('closeFilter')" class="multiselect__select">
            <Icon type="x" size="15px" stroke-width="1" v-on:click="$emit('closeFilter')"/></div>
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
import Multiselect from '@/components/shared/Inputs/vue-multiselect/src/Multiselect.vue';
import Icon from '@/components/shared/Icon/Icon.vue';
export default {
    name: 'ButtonFilter',
    components: {
        Multiselect,
        Icon
    },
    props: {
        placeholder: String,
        value: String,
        close: {
            type: Boolean,
            default: false
        },
        // adiciona a prop rest para receber outras props
        ...Multiselect.props
    }
}
</script>

<style scoped>
.filter {
    min-width: 144px;
    max-width: fit-content;
    height: var(--spacing-large);
    background-color: var(--white);
    border-radius: var(--border-radius-small);
    box-shadow: var(--box-shadow-1);
}

.multiselect__select {
    top: 9px;
}
</style>
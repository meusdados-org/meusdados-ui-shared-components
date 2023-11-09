<template>
    <div class="busca">
        <input type="text" class="busca-text" id="inputsearch-table" placeholder="Buscar" :value="value" @input="$emit('update:value', $event.target.value)"/>
        <Icon class='icon' :class="{ iconActive }" size="15px" type="search"/>
    </div>
</template>

<script>
import Icon from '@/components/shared/Icon/Icon.vue'

export default {
    name: 'SearchButton',
    props: ['value'],
    components: {
        Icon
    },
    computed: {
        iconActive() {
            return this.value.length > 0;
        }
    }
}
</script>

<style scoped>

.busca {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 var(--spacing-small);
    align-items: center;
    background-color: white;
    border:none;
    border-radius: var(--border-radius-small);
    box-shadow: var(--shadow-small);
    width: 319px;
    height: var(--spacing-large);
}

.busca-text{
    color: var(--purple-1);
    float:left;
    background-color:transparent;
    font-size: 12px;
    font-family: 'Montserrat', sans-serif;
    border:none;
    width: 100%;
    height: 100%;
}

.busca-text::placeholder {
    color: var(--gray-1);
}

.busca-text:focus{
    outline: none;
}

.icon{
    color: var(--gray-1);
}

.iconActive {
    color: var(--purple-1);
}

@media (max-width: 768px) {
    .busca {
        width: inherit;
    }
}
</style>
<template>
    <ButtonDefaultVue class="export-button">
        <Icon size="1rem" type="external-link"/> Exportar
    </ButtonDefaultVue>
</template>

<script>
import ButtonDefaultVue from '@/components/shared/Button/ButtonPrimary.vue';
import Icon from '@/components//shared/Icon/Icon.vue'

export default {
    components: {
        ButtonDefaultVue,
        Icon
    }
}
</script>

<style scoped>
.export-button{
    width: auto;
    background-color: transparent;
    color:var(--blue-1);
}
.export-button:focus{
    color:var(--purple-1);
    outline: auto;
    outline-color:var(--purple-1);
}
.export-button:hover{
    background-color: transparent;
    cursor: pointer;
    color:var(--purple-1);
    outline: auto;
    outline-color:var(--purple-1);
}
</style>
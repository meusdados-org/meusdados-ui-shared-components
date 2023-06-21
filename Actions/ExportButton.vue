<template>
    <ButtonPrimaryVue class="export-button">
        <Icon size="1rem" type="external-link"/> Exportar
    </ButtonPrimaryVue>
</template>

<script>
import ButtonPrimaryVue from '@/components/shared/Actions/ButtonPrimary.vue';
import Icon from '@/components//shared/Icon/Icon.vue'

export default {
    components: {
        ButtonPrimaryVue,
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
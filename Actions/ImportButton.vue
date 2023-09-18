<template>
    <ButtonLink v-on:click="open = true" type="upload" :bold="false">
        Importar
    </ButtonLink>
    <ModalTemplate :open="open" @close="open = false">
        <CardTemplate class="card">
            <div class="body">
                <TitleSmall>{{ title }}</TitleSmall>
                <BodyMedium>
                    <ul>
                        <li v-for="rule in rules" :key="rule">{{ rule }}</li>
                    </ul>
                </BodyMedium>
            </div>
            <div class="footer">
                <FormFile :service="service" />
            </div>
        </CardTemplate>
    </ModalTemplate>
</template>

<script>
import ModalTemplate from '@/components/shared/Overlay/Modal/ModalTemplate.vue';
import CardTemplate from '@/components/shared/PageBlocks/Card/CardTemplate.vue';
import FormFile from '@/components/shared/Inputs/Form/FormFile.vue';
import { CallBackend } from '@/services/_backend';
import TitleSmall from '@/components/shared/Typography/Title/TitleSmall.vue';
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import ButtonLink from './ButtonLink.vue';

export default {
    components: {
        ModalTemplate,
        CardTemplate,
        FormFile,
        TitleSmall,
        BodyMedium,
        ButtonLink
    },
    props: {
        service: {
            type: CallBackend,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        rules: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            open: false
        }
    },
}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.body {
    display: flex;
    flex-direction: column;
    text-align: start;
    align-items: flex-start;
    row-gap: var(--spacing-small);
}

.footer {
    margin-top: var(--spacing-small);
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}

.import-button{
    padding: 0 var(--spacing-medium);
    background-color: transparent;
    color:var(--blue-1);
}

.import-button:focus{
    color:var(--purple-1);
    outline: auto;
    outline-color:var(--purple-1);
}

.import-button:hover{
    background-color: transparent;
    cursor: pointer;
    color:var(--purple-1);
    outline: auto;
    outline-color:var(--purple-1);
}
</style>
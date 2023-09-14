
<template>
    <div v-if="visible" class="dialog-overlay">
        <div class="dialog">
            <div class="dialog-image" v-if="type">
                <img :src="icon" width="64" height="64"/>
            </div>
            <div class="dialog-message">
                <BodyLarge class="title">{{ title }}</BodyLarge>
                <BodyMedium>{{ message }}</BodyMedium>
            </div>
            <div class="dialog-buttons">
                <ButtonLink id="button-cancelar-dialog" v-if="showCancelButton" @click="onCancel">Cancelar</ButtonLink>
                <ButtonPrimary id="button-confirmar-dialog" @click="onConfirm">Confirmar</ButtonPrimary>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '@/components/shared/Actions/ButtonPrimary.vue';
import ButtonLink from '@/components/shared/Actions/ButtonLink.vue';
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import BodyLarge from '@/components/shared/Typography/Body/BodyLarge.vue';
import alertTriangle from '@/assets/img/alert-triangle.svg'
import checkCircle from '@/assets/img/check-circle.svg'
import xCircle from '@/assets/img/x-circle.svg'

export default {
    name: 'DialogCard',
    components: {
        ButtonPrimary,
        ButtonLink,
        BodyLarge
    },
    props: {
        type: String,
        title: String,
        message: String,
        showCancelButton: Boolean,
        resolve: Function,
        reject: Function
    },
    data() {
        return {
            visible: true,
            icon: alertTriangle
        }
    },
    methods: {
        onCancel() {
            this.visible = false;
            this.reject();
            this.$emit('cancel');
        },
        onConfirm() {
            this.visible = false;
            this.resolve();
            this.$emit('confirm');
        }
    },
    created() {
        const types = {
            question: alertTriangle,
            alert: alertTriangle,
            success: checkCircle,
            error: xCircle
        }
        this.icon = types[this.type]
    },
};
</script>

<style scoped>
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--black-low-opacity);
    display: flex;
    z-index: 999;
    justify-content: center;
    align-items: center;
}

.dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: var(--spacing-5);

    width: 532px;
    padding: 2rem 1rem;
    z-index: 997;

    background-color: var(--white);
    border-radius: var(--border-radius-1);
}

.title {
    font-weight: 600;
}

.dialog-image {
    max-height: 4rem;
}

.dialog-message {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    row-gap: var(--spacing-3);
}

.dialog-buttons {
    display: flex;
    margin-top: var(--spacing-5);
    column-gap: var(--spacing-5);
}

.feather-alert-triangle {
    stroke: var(--yellow-1);
}
</style>
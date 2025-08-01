<template>
    <div v-if="visible" class="dialog-overlay">
        <div class="dialog" :class="customClass">
            <div class="dialog-image" v-if="type">
                <img :src="icon" width="64" height="64" />
            </div>
            <div class="dialog-message">
                <BodyLarge :class="['title', titleClass]">{{ title }}</BodyLarge>
                <BodyMedium v-html="message" :class="messageClass"></BodyMedium>
            </div>
            <div class="dialog-buttons">
                <ButtonLink id="button-cancelar-dialog" v-if="showCancelButton" @click="onCancel" size="medium">{{ cancelButtonLabel
                }}</ButtonLink>
                <ButtonPrimary id="button-confirmar-dialog" @click="onConfirm" size="medium">{{ buttonLabel }}</ButtonPrimary>
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
    name: 'DialogCustom',
    components: {
        ButtonPrimary,
        ButtonLink,
        BodyLarge,
        BodyMedium
    },
    props: {
        type: String,
        title: String,
        message: String,
        showCancelButton: Boolean,
        resolve: Function,
        reject: Function,
        cancelButtonLabel: {
            type: String,
            default: 'Cancelar'
        },
        buttonLabel: {
            type: String,
            default: 'Confirmar'
        },
        titleClass: {
            type: String,
            default: ''
        },
        messageClass: {
            type: String,
            default: ''
        },
        customClass: {
            type: String,
            default: ''
        }
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
    row-gap: var(--spacing-small);

    width: 600px;
    padding: var(--spacing-xlarge);
    z-index: 997;

    background-color: var(--white);
    border-radius: var(--border-radius-small);
}

.title {
    font-weight: 600;
    color: #8b5cf6;
}


.dialog-image {
    max-height: 4rem;
    color: var(--blue-1);
}

.dialog-message {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    row-gap: var(--spacing-xsmall);
    font-size: 1rem;
}

.dialog-buttons {
    display: flex;
    margin-top: var(--spacing-medium);
    column-gap: var(--spacing-medium);
}

.feather-alert-triangle {
    stroke: var(--yellow-1);
}
</style>
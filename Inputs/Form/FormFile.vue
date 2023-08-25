<template>
    <div class="container-form">
        <InputFile @select="select" :types-allowed="typesAllowed" :max-size="maxSize" />
        <div v-if="currentFile" class="progress">
            <div
                role="progressbar"
                :aria-valuenow="progress"
                :aria-valuemin="0"
                :aria-valuemax="100"
                :style="{ width: progress + '%' }"
            >
                {{ progress }}%
            </div>
        </div>
        <ButtonPrimary id="button-upload-file" :disabled="!currentFile" v-on:click="upload">{{ title }}</ButtonPrimary>
    </div>
</template>

<script>
import { CallBackendWithFiles } from '@/services/_backend';
import ButtonPrimary from '@/components/shared/Actions/ButtonPrimary.vue';
import InputFile from '@/components/shared/Inputs/InputFile.vue';


export default {
    name: 'FormFile',
    emits: ['refresh'],
    props: {
        service: {
            type: CallBackendWithFiles,
            required: true
        },
        arquivoMaturidade: {
            type: Boolean,
            required: false,
            default: false
        },
        id: {
            type: String,
            required: false
        },
        typesAllowed: {
            type: Array,
            required: false,
            default: () => [
                {
                    label: 'csv',
                    value: 'csv'
                },
                {
                    label: 'xlsx',
                    value: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            ]
        },
        maxSize: {
            type: Number,
            required: false,
            default: 4000000 // 4MB
        }
    },
    components: {
        ButtonPrimary,
        InputFile
    },
    data() {
        return {
            currentFile: undefined,
            progress: 0,
            message: "",
            uploading: false,

            fileInfos: []
        }
    },
    computed: {
        title() {
            return this.arquivoMaturidade ? 'Adicionar arquivo' : 'Carregar dados';
        }
    },
    methods: {
        select(file) {
            this.currentFile = file;
        },
        upload() {
            this.uploading = true;
            this.progress = 0;

            const upload = this.arquivoMaturidade ? this.service.upload(this.id, this.currentFile, event => {
                this.progress = Math.round((100 * event.loaded) / event.total);
            }) : this.service.createBulk(this.currentFile, event => {
                this.progress = Math.round((100 * event.loaded) / event.total);
            });

            upload.then(response => {
                this.progress = 100;
                this.message = response.data.message;
                if (!this.arquivoMaturidade) {
                    this.$router.go();
                }
                this.arquivoMaturidade ? this.$emit('refresh') : this.$dialog({title: 'Successo!', message: this.message, type: 'success'});
            })
            .catch((error) => {
                this.progress = 0;
                this.$dialog({ title: 'Não autorizado!', message: error.response.data.error_message, type: 'error'});
                this.currentFile = undefined;
            })
        }
    },
};
</script>

<style scoped>
.container-form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
<template>
    <div class="container">
        <div class="input-button-container">
            <label class="label">
                <input class="input" type="file" ref="file" @change="selectFile" />
                <span>{{ label }}</span>
            </label>
            <span v-if="currentFile"><Text2Component :class="{'errorText': error}">{{ currentFile.name }}</Text2Component></span>
        </div>
        <Text3Component class="error" v-if="error">{{ errorMessage }}</Text3Component>
    </div>
</template>

<script>
import Text2Component from '@/components/shared/Typography/Text/Text2Component.vue';
import Text3Component from '@/components/shared/Typography/Text/Text3Component.vue';

export default {
    name: 'InputFile',
    emits: ['select'],
    components: {
        Text2Component,
        Text3Component
    },
    props: {
        value: {
            type: String,
            required: false,
            default: ''
        },
        typesAllowed: {
            type: Array,
            required: false,
            default: () => [{ label: 'csv', value: 'csv' }]
        },
        maxSize: {
            type: Number,
            required: false,
            default: 4000000  // 4MB
        },
        label: {
            type: String,
            required: false,
            default: 'Escolher Arquivo'
        }
    },
    data() {
        return {
            currentFile: undefined,
            errorMessage: undefined,
            id: `inputFile-${this.label.toLocaleLowerCase().replace(/\s/g, '-')}`,
        }
    },
    computed: {
        error() {
            return this.errorMessage !== undefined;
        }
    },
    watch: {
        currentFile() {
            const fullTypeName = this.currentFile.type;
            const type = fullTypeName.split('/')[1];
            ;
            if (!this.typesAllowed.some(t => t.value === type)) {
                this.errorMessage = `Formatos permitidos: ${this.typesAllowed.map(t => t.label).join(', ')}`;
                this.$emit('select', undefined);
                return;
            }
            if (this.currentFile.size > this.maxSize) {
                this.errorMessage = `Tamanho máximo: ${this.maxSize / 1000000}MB`;
                this.$emit('select', undefined);
                return;
            }

        }
    },
    methods: {
        selectFile() {
            this.errorMessage = undefined;
            const selectedFiles = this.$refs.file.files;
            this.currentFile = selectedFiles[0];
            this.$emit('select', this.currentFile);
        }
    }
}
</script>

<style scoped>
.container {
    width: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-3);
    justify-content: flex-start;
}

.input-button-container {
    display: flex;
    align-items: center;
    column-gap: var(--spacing-5);
}

label.label input[type="file"] {
  position: absolute;
  top: -1000px;
}

.label {
    width: fit-content;
    padding: 0 1.5rem;
    height: 2.5rem;
    display: flex;
    font-weight: 700;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    border: 1px solid #cccccc;
    border-radius: var(--border-radius-1);
    background: var(--blue-1);
}

.label:hover {
  background: var(--purple-1);
}

.label:has(input[type="file"]:focus) {
    outline: 2px solid var(--black);
    outline-offset: var(--spacing-1);
}

.error {
    height: 20px;
    color: var(--red-1);
    display: flex;
    align-items: center;
    line-height: 8px;
    text-align: left;
    padding: 0 var(--spacing-3);
    border-radius: var(--spacing-1);
    width: fit-content;
    background-color: var(--red-1);
    background-color: rgba(221, 58, 58, 0.05);
}

.errorText {
    color: var(--red-1);
}

</style>

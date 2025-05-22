<template>
    <div class="container">
        <div class="input-button-container" :class="{ rightLabel }">
            <label class="label"
                :class="{
                    'small': size === 'small',
                    'medium': size === 'medium',
                    'large': size === 'large',
                    'xlarge': size === 'xlarge',
                    'buttonLink': isButtonLink
                }"
            >
                <input class="input" type="file" ref="file" @change="selectFile" />
                <Icon :type="icon" :size="pixelSize" v-if="icon" />
                <LabelSmall class="inputLabel" v-if="size === 'small'">{{ label }}</LabelSmall>
                <LabelMedium class="inputLabel" v-else-if="size === 'medium'">{{ label }}</LabelMedium>
                <LabelLarge class="inputLabel" v-else>{{ label }}</LabelLarge>
            </label>
            <span v-if="currentFile || value"><BodyMedium :class="{'errorText': error}">{{ name }}</BodyMedium></span>
        </div>
        <BodySmall class="error" v-if="error">{{ errorMessage }}</BodySmall>
    </div>
</template>

<script>
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import BodySmall from '@/components/shared/Typography/Body/BodySmall.vue';
import LabelSmall from '../Typography/Label/LabelSmall.vue';
import LabelMedium from '../Typography/Label/LabelMedium.vue';
import LabelLarge from '../Typography/Label/LabelLarge.vue';
import Icon from '../Icon/Icon.vue';

export default {
    name: 'InputFile',
    emits: ['select'],
    components: {
        BodyMedium,
        BodySmall,
        LabelSmall,
        LabelMedium,
        LabelLarge,
        Icon
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
        },
        type: {
            type: String,
            required: false,
            default: 'buttonPrimary'
        },
        icon: {
            type: String,
            required: false,
            default: undefined
        },
        size: {
            type: String,
            required: false,
            default: 'small'
        },
        rightLabel: {
            type: Boolean,
            default: false
        }

    },
    data() {
        return {
            currentFile: undefined,
            errorMessage: undefined,
            id: `inputFile-${(this.label || this.icon || Math.random()).toLocaleLowerCase().replace(/\s/g, '-')}`,
        }
    },
    computed: {
        pixelSize() {
            switch (this.size) {
                case 'small':
                    return '10px';
                case 'medium':
                    return '12px';
                case 'large':
                    return '16px';
                case 'xlarge':
                    return '48px';
                default:
                    return '12px';
            }
        },
        isButtonLink() {
            return this.type === 'buttonLink';
        },
        error() {
            return this.errorMessage !== undefined;
        },
        name() {
            if (typeof this.value === 'string') {
                return this.value
            } else if (this.value instanceof File) {
                return this.value?.name;
            }
            return this.currentFile?.name;
        }
    },
    watch: {
        currentFile() {
            const err = this.validateFile()
            if (err) {
                this.errorMessage = err;
            }

        }
    },
    methods: {
        validateFile() {
            const fullTypeName = this.currentFile.type;
            const type = fullTypeName.split('/')[1];
            console.log(this.currentFile)

            if (!this.typesAllowed.some(t => t.value === type)) {
                return `Formatos permitidos: ${this.typesAllowed.map(t => t.label).join(', ')}`;
            }
            if (this.currentFile.size > this.maxSize) {
                return `Tamanho máximo: ${this.maxSize / 1000000}MB`;
            }
        },
        selectFile() {
            this.errorMessage = undefined
            const selectedFiles = this.$refs.file.files;
            this.currentFile = selectedFiles[0];
            const err = this.validateFile();
            if (!err) {
                this.$emit('select', this.currentFile);
            } else {
                console.log('here')
                this.errorMessage = err;
            }
        }
    }
}
</script>

<style scoped>
.container {
    width: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-xsmall);
    justify-content: flex-start;
    align-items: flex-end;
}

.inputLabel {
    line-height: 200%;
}

.input-button-container {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    column-gap: var(--spacing-small);
}

.input-button-container.rightLabel {
    flex-direction: row;
}

label.label input[type="file"] {
  position: absolute;
  top: -1000px;
}

.label {
    padding: 0 var(--spacing-medium);
    background: var(--purple-1) 0% 0% no-repeat padding-box;
    border-radius: var(--border-radius-small);
    border: none;
    color: var(--white);
    cursor: pointer;
    opacity: 1;
    -webkit-transition: .5s all;
    -webkit-transition-delay: 5s;
    -moz-transition: .5s all;
    -moz-transition-delay: 5s;
    -ms-transition: .5s all;
    -ms-transition-delay: 5s;
    -o-transition: .5s all;
    -o-transition-delay: 5s;
    transition: .25s all;
    transition-delay: .25s;
}

.label.buttonLink {
    background-color: transparent;
    border: none;
    border-top: var(--spacing-xxxsmall) solid transparent;
    border-bottom: var(--spacing-xxxsmall) solid transparent;
    color: var(--purple-1);
    cursor: pointer;
    padding: 0;
    text-decoration: none;
}


.label.small {
    padding: 5px var(--spacing-small);
}

.label.medium {
    padding: 8px var(--spacing-medium);
}

.label.large {
    padding: 8px var(--spacing-large);
}

.label:hover {
  background: var(--blue-1);
}

.label.buttonLink:hover {
    background-color: transparent;
    color: var(--blue-1) !important;
}

.label:has(input[type="file"]:focus) {
    outline: var(--spacing-xxxsmall) solid var(--black);
    outline-offset: var(--spacing-xxxsmall);
}

.error {
    height: 20px;
    color: var(--red-1);
    display: flex;
    align-items: center;
    line-height: var(--spacing-xsmall);
    text-align: left;
    padding: 0 var(--spacing-xsmall);
    border-radius: var(--spacing-xxxsmall);
    width: fit-content;
    background-color: var(--red-1);
    background-color: rgba(221, 58, 58, 0.05);
}

.errorText {
    color: var(--red-1);
}

</style>

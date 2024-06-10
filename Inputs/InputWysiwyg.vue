<template>
  <div class="wysiwyg-container" ref="wysiwygContainer">
    <div class="buttons">
      <InputSelectField
        class="select"
        :options="[
          {
            key: '<h1>',
            label: 'h1',
          },
          {
            key: '<h2>',
            label: 'h2',
          },
          {
            key: '<h3>',
            label: 'h3',
          },
          {
            key: '<h4>',
            label: 'h4',
          },
          {
            key: '<h5>',
            label: 'h5',
          },
          {
            key: '<h6>',
            label: 'h6',
          },
          {
            key: '<p>',
            label: 'Parágrafo',
          },
        ]"
        label="label"
        placeholder=""
        :value="selected"
        openDirection="bottom"
        :allowEmpty="false"
        @select="applyHeading"
        @mousedown.prevent
      />
      <ButtonLink @click="applyBold" class="button" :class="{ active: isBold }" @mousedown.prevent>
        <Icon type="bold"/>
      </ButtonLink>
      <ButtonLink @click="applyItalic" class="button" :class="{ active: isItalic }" @mousedown.prevent>
        <Icon type="italic"/>
      </ButtonLink>
      <ButtonLink @click="applyUnderline" class="button" :class="{ active: isUnderline }" @mousedown.prevent>
        <Icon type="underline"/>
      </ButtonLink>
      <ButtonLink @click="applyUl" class="button" @mousedown.prevent>
        <Icon type="list"/>
      </ButtonLink>
      <ButtonLink @click="addAttachment" class="button" @mousedown.prevent v-if="hasAttachment">
        <Icon type="paperclip"/>
      </ButtonLink>
      <div class="filler" style="flex-grow: 1" v-if="aiGenerate && aiFeatureFlagEnabled"/>
      <ButtonPrimary size="small" @click="$emit('genAI')" v-if="aiGenerate && aiFeatureFlagEnabled" class="button overflow-button" @mousedown.prevent icon="cpu">
        Gerar automaticamente usando IA
      </ButtonPrimary>
    </div>
    <div
      v-if="!loading_"
      @input="onInput"
      v-html="innerValue_"
      contenteditable="true"
      ref="wysiwyg"
      class="wysiwyg-output outline-none border-2 p-4 rounded-lg border-gray-300 focus:border-green-300"
      @dragover="handleDragOver"
      @drop="handleDrop"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      aria-label="Escreva um comentário..."
      aria-placeholder="Escreva um comentário..."
      :style="{ 'max-height': maxHeight, 'height': fixedHeight }"
      @paste="handlePaste"
    />
    <div v-else class="wysiwyg-output outline-none border-2 p-4 rounded-lg border-gray-300 focus:border-green-300">
      <div class="loading-container">
        <Icon type="loader" size="32px" class="animate-spin"/>
      </div>
    </div>
    <div class="attachments" v-if="files.length > 0">
      <FragmentAttachment v-for="file in files" :key="file.name" :close="true" :base64_="file.type.startsWith('image/') ? convertIntoBase64(file): undefined" :fileName="file.name" @close="removeFile(file)"/>
    </div>
    <ButtonLink v-if="showSendButton" @click="$emit('sendMessage', innerValue, files)" class="send-button">
      <Icon type="send"/>
    </ButtonLink>
  </div>
</template>

<script>
import ButtonLink from '@/components/shared/Actions/ButtonLink.vue';
import ButtonPrimary from '@/components/shared/Actions/ButtonPrimary.vue';
import FragmentAttachment from '../Fragments/FragmentAttachment.vue';
import Icon from '@/components/shared/Icon/Icon.vue';
import InputSelectField from './InputSelectField.vue';
import { Marked } from '@ts-stack/markdown';
import TurndownService from 'turndown';
import { marked } from 'marked';
import posthog from '../../../utils/posthog-handler.js';

export default {
    name: "InputWysiwyg",
    emits: [
      'sendMessage',
      'input',
      'getAI'
    ],
    props: {
      value: {
        type: String,
        default: '',
      },
      showSendButton: {
        type: Boolean,
        default: false,
      },
      maxHeight: {
        type: String,
        default: 'none',
      },
      fixedHeight: {
        type: String,
        default: 'none',
      },
      hasAttachment: {
        type: Boolean,
        default: true,
      },
      aiGenerate: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    data() {
        return {
            options: [
              {
                key: '<h1>',
                label: 'h1',
              },
              {            
                key: '<h2>',
                label: 'h2',
              },
              {
                key: '<h3>',
                label: 'h3',
              },
              {
                key: '<h4>',
                label: 'h4',
              },
              {
                key: '<h5>',
                label: 'h5',
              },
              {
                key: '<h6>',
                label: 'h6',
              },
              {
                key: '<p>',
                label: 'Parágrafo',
              },
            ],
            isBold: false,
            isItalic: false,
            isUnderline: false,
            selected: '',
            updated: false,
            files: [],
            innerValue: [Marked.parse(this.value) || '<p><br></p>'],
            aiFeatureFlagEnabled: false,
        };
    },
    methods: {
      isCursorInsideBoldTag() {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const parentNode = range.startContainer.parentNode;
          return parentNode.nodeName === 'B' || parentNode.closest('b') !== null;
        }
        return false;
      },
      onInput(event) {
        this.$emit("input", marked(event.target.innerHTML));
      },
      applyBold() {
        document.execCommand('bold')
        const isSelectionBold = document.queryCommandState('bold');
        this.isBold = isSelectionBold;
      },
      applyItalic() {
        document.execCommand('italic')
        const isSelectionItalic = document.queryCommandState('italic');
        this.isItalic = isSelectionItalic;
      },
      applyUnderline() {
        document.execCommand('underline', false, null);
        const isSelectionUnderline = document.queryCommandState('underline');
        this.isUnderline = isSelectionUnderline;
      },
      applyHeading(obj) {
        const key = obj.key;
        this.selected = obj;
        document.execCommand('formatBlock', false, key)
      },
      addAttachment() {
        if (!this.hasAttachment) {
          return;
        }
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation';
        input.onchange = (event) => {
          const files = event.target.files;
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            this.saveAttachment(file);
          }
        };
        input.click();
      },
      applyUl() {
        document.execCommand('insertUnorderedList')
      },
      applyOl() {
        document.execCommand('insertOrderedList')
      },
      undo() {
        document.execCommand('undo')
      },
      redo() {
        document.execCommand('redo')
      },
      handleDragOver(event) {
        event.preventDefault();
      },
      handleDrop(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.type.startsWith('image/')) {
            this.displayImage(file);
          } else {
            if (!this.hasAttachment) {
              return;
            }
            this.saveAttachment(file);
          }
        }
      },
      displayImage(file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const imgSrc = event.target.result;
          const imgElement = `<img style="max-width: 380px;" src=${imgSrc} alt="${file.name}">`;

          document.execCommand('insertHTML', false, imgElement);
        }

        reader.readAsDataURL(file);
      },
      saveAttachment(file) {
        // Lógica para salvar o arquivo em anexo
        this.files.push(file);
      },
      handlePaste(event) {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;

        for (const item of items) {
          if (item.kind === 'file' && item.type.startsWith('image/')) {
            const file = item.getAsFile();
            this.displayImage(file);
          } else if (item.kind == 'file') {
            if (!this.hasAttachment) {
              return;
            }
            const file = item.getAsFile();
            this.saveAttachment(file);
          }
        }
      },
      convertIntoBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      },
      removeFile(file) {
        const index = this.files.indexOf(file);
        this.files.splice(index, 1);
      },
    },
    components: { Icon, InputSelectField, ButtonLink, FragmentAttachment, ButtonPrimary },
    created() {
      this.selected = this.options[0];
      const user = JSON.parse(localStorage.getItem('usuario') || {});
      posthog.setPersonPropertiesForFlags({ 'cnpj': user.cnpj });
      posthog.onFeatureFlags(() => {
        this.aiFeatureFlagEnabled = posthog.isFeatureEnabled('politica-privacidade-ai');
      });
    },
    computed: {
        loading_() {
            return this.loading;
        },
        innerValue_() {
            console.log(marked(this.innerValue[0]));
            return marked(this.innerValue[0], { sanitize: true });
        }
    },
    mounted() {
      document.execCommand('defaultParagraphSeparator', false, 'p')
      // Adicionar ouvinte de evento para o editor
      this.$refs.wysiwyg.addEventListener('focus', this.handleSelectionChange);
    },
    beforeUnmount() {
      // Remover ouvinte de evento antes de desmontar o componente
      this.$refs.wysiwyg.removeEventListener('focus', this.handleSelectionChange);
    },
}
</script>

<style>
.wysiwyg-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 100%;
  border: 1px solid var(--gray-1);
  border-radius: var(--border-radius-small);
  overflow: hidden;
}

.wysiwyg-container .loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: var(--spacing-xsmall);
  flex-grow: 1;
  height: 80%;
}

.animate-spin {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.wysiwyg-container .multiselect {
  min-height: var(--spacing-medium);
}

.wysiwyg-container .multiselect__single {
  color: var(--gray-1);
}

.wysiwyg-container .multiselect__option {
  padding: var(--spacing-xxsmall) var(--spacing-xsmall);
  font-size: 12px;
  min-height: 0px;
}

.wysiwyg-container .multiselect__select {
  top: var(--spacing-xxxsmall);
  right: var(--spacing-xsmall);
}

.wysiwyg-container .multiselect__tags {
  min-height: var(--spacing-medium);
}

.wysiwyg-container .multiselect__single {
  font-size: 12px;
}

.wysiwyg-container .buttons {
  background-color: white;
  display: flex;
  align-items: center;
  column-gap: var(--spacing-xsmall);
  padding: var(--spacing-xsmall)  var(--spacing-small);
  border-bottom: 1px solid var(--gray-1);
}

.wysiwyg-container .active {
  color: var(--purple-1);
}

.wysiwyg-container .select {
  width: 112px;
  font-size: 12px;
}

.button:hover {
  color: var(--gray-2) !important;
}

.wysiwyg-output {
  text-align: left;
  min-height: 5px;
  max-width: 100%;
  font-size: 12px;
  padding:  var(--spacing-small);;
  overflow-y: auto;
  outline: none;
  flex-grow: 1;
}

.wysiwyg-container.dragover {
  border-color: var(--purple-1);
}

.wysiwyg-container .send-button {
  position: absolute;
  bottom: var(--spacing-xsmall);
  right: var(--spacing-xsmall);
}

.attachments {
  display: flex;
  column-gap: var(--spacing-xsmall);
  row-gap: var(--spacing-xsmall);
  width: 90%;
  flex-wrap: wrap;
  padding:  var(--spacing-small);
  padding-top: var(--spacing-xsmall);
}
</style>

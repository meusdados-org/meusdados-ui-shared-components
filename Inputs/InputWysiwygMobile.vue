<template>
  <div class="wysiwyg-container-mobile" ref="wysiwygContainer">
    <div class="inner_wysiwyg-container">
      <div
      @input="onInput"
      v-html="innerValue"
      contenteditable="true"
      ref="wysiwyg"
      class="wysiwyg-output outline-none border-2 p-4 rounded-lg border-gray-300 focus:border-green-300"
      @dragover="handleDragOver"
      @drop="handleDrop"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      aria-label="Escreva um comentário..."
      aria-placeholder="Escreva um comentário..."
      @paste="handlePaste"
      />
      <ButtonLink v-if="showSendButton" @click="$emit('sendMessage', innerValue, files)" class="send-button">
        <Icon type="send"/>
      </ButtonLink>
    </div>
    <div class="attachments" v-if="files.length > 0">
      <FragmentAttachment v-for="file in files" :key="file.name" :close="true" :base64_="file.type.startsWith('image/') ? convertIntoBase64(file): undefined" :fileName="file.name" @close="removeFile(file)"/>
    </div>
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
        max-height="64"
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
    </div>
  </div>
</template>

<script>
import ButtonLink from '@/components/shared/Actions/ButtonLink.vue';
import FragmentAttachment from '../Fragments/FragmentAttachment.vue';
import Icon from '@/components/shared/Icon/Icon.vue';
import InputSelectField from './InputSelectField.vue';
import { Marked } from '@ts-stack/markdown';
import TurndownService from 'turndown';

export default {
    name: "InputWysiwyg",
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
            innerValue: Marked.parse(this.value) || '<p><br></p>',
            updated: false,
            files: []
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
        const turndown = new TurndownService({
          emDelimiter: '_',
          linkStyle: 'inlined',
          headingStyle: 'atx'
        })
        this.$emit("input", Marked.parse(event.target.innerHTML));
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
        ;
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
        ;
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
    components: { Icon, InputSelectField, ButtonLink, FragmentAttachment },
    created() {
      this.selected = this.options[0];
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
.wysiwyg-container-mobile {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: var(--shadow-small);
  overflow: hidden;
}
.wysiwyg-container-mobile .multiselect {
  min-height: var(--spacing-medium);
}

.wysiwyg-container-mobile .multiselect__single {
  color: var(--gray-1);
}

.wysiwyg-container-mobile .multiselect__option {
  padding: var(--spacing-xxsmall) var(--spacing-xsmall);
  font-size: 12px;
  min-height: 0px;
}

.wysiwyg-container-mobile .multiselect__select {
  top: var(--spacing-xxxsmall);
  right: var(--spacing-xsmall);
}

.wysiwyg-container-mobile .multiselect__tags {
  min-height: var(--spacing-medium);
}

.wysiwyg-container-mobile .multiselect__single {
  font-size: 12px;
}

.wysiwyg-container-mobile .buttons {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: var(--spacing-xsmall);
  padding: var(--spacing-xsmall) var(--spacing-small);
}

.wysiwyg-container-mobile .active {
  color: var(--purple-1);
}

.wysiwyg-container-mobile .select {
  width: 112px;
  font-size: 12px;
}

.button:hover {
  color: var(--gray-2) !important;
}

.wysiwyg-container-mobile .inner_wysiwyg-container {
  display: flex;
  padding: var(--spacing-small);
  align-items: center;
  gap: var(--spacing-small);
  justify-content: space-between;
}

.inner_wysiwyg-container .wysiwyg-output {
  text-align: left;
  min-height: calc(var(--spacing-large) - calc(var(--spacing-xsmall) * 2));
  max-height: 100px;
  font-size: 12px;
  padding:  var(--spacing-xsmall) var(--spacing-small);
  overflow-y: auto;
  outline: none;
  background-color: var(--gray-3);
  border-radius: var(--border-radius-small);
  flex: 1 0 0;
}

.wysiwyg-container-mobile.dragover {
  border-color: var(--purple-1);
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
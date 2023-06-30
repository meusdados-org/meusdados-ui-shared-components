<template>
  <div class="wysiwyg-container" ref="wysiwygContainer">
    <div class="buttons">
      <InputSelectField
        class="select"
        :options="[
          {
            key: '<h1>',
            label: 'Heading 1',
          },
          {
            key: '<h2>',
            label: 'Heading 2',
          },
          {
            key: '<h3>',
            label: 'Heading 3',
          },
          {
            key: '<h4>',
            label: 'Heading 4',
          },
          {
            key: '<h5>',
            label: 'Heading 5',
          },
          {
            key: '<h6>',
            label: 'Heading 6',
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
      <ButtonLink @click="addAttachment" class="button" @mousedown.prevent>
        <Icon type="paperclip"/>
      </ButtonLink>
    </div>
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
      :style="{ 'max-height': maxHeight }"
      @paste="handlePaste"
    />
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
import FragmentAttachment from '../Fragments/FragmentAttachment.vue';
import Icon from '@/components/shared/Icon/Icon.vue';
import InputSelectField from './InputSelectField.vue';
import { Marked } from '@ts-stack/markdown';
import TurndownService from 'turndown';

export default {
    name: "InputWysiwyg",
    props: ["value", "showSendButton", "maxHeight"],
    data() {
        return {
            options: [
              {
                key: '<h1>',
                label: 'Heading 1',
              },
              {
                key: '<h2>',
                label: 'Heading 2',
              },
              {
                key: '<h3>',
                label: 'Heading 3',
              },
              {
                key: '<h4>',
                label: 'Heading 4',
              },
              {
                key: '<h5>',
                label: 'Heading 5',
              },
              {
                key: '<h6>',
                label: 'Heading 6',
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
.wysiwyg-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 100%;
  border: 1px solid var(--gray-1);
  border-radius: var(--border-radius-1);
  overflow: hidden;
}

.wysiwyg-container .multiselect {
  min-height: 1.5rem;
}

.wysiwyg-container .multiselect__single {
  color: var(--gray-1);
}

.wysiwyg-container .multiselect__option {
  padding: .25rem .5rem;
  font-size: 12px;
  min-height: 0px;
}

.wysiwyg-container .multiselect__select {
  top: 2px;
  right: 8px;
}

.wysiwyg-container .multiselect__tags {
  min-height: 1.5rem;
}

.wysiwyg-container .multiselect__single {
  font-size: 12px;
}

.wysiwyg-container .buttons {
  background-color: white;
  display: flex;
  align-items: center;
  column-gap: .5rem;
  padding: .5rem 1rem;
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
  max-height: 300px;
  max-width: 100%;
  font-size: 14px;
  padding: 1rem;;
  overflow-y: auto;
  outline: none;
}

.wysiwyg-container.dragover {
  border-color: var(--purple-1);
}

.send-button {
  position: absolute;
  bottom: 8px;
  right: 8px;
}

.attachments {
  display: flex;
  column-gap: .5rem;
  row-gap: .5rem;
  width: 90%;
  flex-wrap: wrap;
  padding: 1rem;
  padding-top: .5rem;
}
</style>
<template>
  <div class="wysiwyg-container">
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
        maxHeight="100"
        placeholder=""
        :value="selected"
        openDirection="bottom"
        :allowEmpty="false"
        @select="applyHeading"
      />
      <ButtonLink @click="applyBold" class="button" :class="{ active: false }">
        <Icon type="bold"/>
      </ButtonLink>
      <ButtonLink @click="applyItalic" class="button" :class="{ active: false }">
        <Icon type="italic"/>
      </ButtonLink>
      <ButtonLink @click="applyUnderline" class="button" :class="{ active: false }">
        <Icon type="underline"/>
      </ButtonLink>
      <ButtonLink @click="applyUl" class="button">
        <Icon type="list"/>
      </ButtonLink>
    </div>
    <div
      @input="onInput"
      v-html="innerValue"
      contenteditable="true"
      ref="wysiwyg"
      class="wysiwyg-output outline-none border-2 p-4 rounded-lg border-gray-300 focus:border-green-300"
    />
  </div>
</template>

<script>
import ButtonLink from '../Button/ButtonLink.vue';
import Icon from '../Icon/Icon.vue';
import InputSelectField from './InputSelectField.vue';
import { Marked } from '@ts-stack/markdown';
import TurndownService from 'turndown';

export default {
    name: "InputWysiwyg",
    props: ["value"],
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
        };
    },
    methods: {
        onInput(event) {
          const turndown = new TurndownService({
            emDelimiter: '_',
            linkStyle: 'inlined',
            headingStyle: 'atx'
          })
          this.$emit("input", turndown.turndown(event.target.innerHTML));
        },
        applyBold() {
          this.isBold = !this.isBold;
          document.execCommand('bold')
        },
        applyItalic() {
          this.isItalic = !this.isItalic;
          document.execCommand('italic')
        },
        applyUnderline() {
          this.isUnderline = !this.isUnderline;
          document.execCommand('underline')
        },
        applyHeading(obj) {
          const key = obj.key;
          this.selected = obj;
          document.execCommand('formatBlock', false, key)
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
        }
    },
    components: { Icon, InputSelectField, ButtonLink },
    created() {
      this.selected = this.options[0];
    },
    mounted() {
      document.execCommand('defaultParagraphSeparator', false, 'p')
    },
}
</script>

<style>
.wysiwyg-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--gray-1);
  border-radius: var(--border-radius-1);
  overflow: hidden;
}

.wysiwyg-container .multiselect {
  min-height: 1.5rem;
}

.wysiwyg-container .multiselect__option {
  padding: .5rem;
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

.wysiwyg-output {
  text-align: left;
  min-height: 150px;
  padding: 1rem;
  outline: none;
}
.wysiwyg-output p {
  @apply pb-4;
}
.wysiwyg-output p {
  @apply pb-4;
}
.wysiwyg-output ul {
  @apply ml-6;
  @apply list-disc;
}
.wysiwyg-output ol {
  @apply ml-6;
  @apply list-decimal;
}
</style>
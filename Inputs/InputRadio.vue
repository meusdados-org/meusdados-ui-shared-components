<template>
  <label class="container-InputRadio"> <text1>{{ label }}</text1>
      <input type="radio" :disabled="isDisabled" class="input" :name="id" :id="id" :checked="value === label" @input="$emit('updateLabel', label)" placeholder=" " />
      <span class="checkbox">
          <div class="hover-circle"></div>
      </span>
  </label>
</template>

<script>
import text1 from '@/components/shared/Typography/Text/Text1Component.vue';
import Icon from '@/components/shared/Icon/Icon.vue';

export default {
  name: 'InputRadio',
  props: {
      label: {
          type: String,
          required: true
      },
      value: {
          type: String,
          required: true
      },
      disabled: {
          type: Boolean,
          required: false,
          default: false
      }
  },
  components: {
  text1,
  Icon
},
  computed: {
      name() {
          return this.label.toLowerCase();
      },
      id() {
        return `inputRadio-${this.label.toLocaleLowerCase().replace(/\s/g, '-')}`
      },
      isDisabled() {
          return this.disabled;
      }
  },
}
</script>

<style scoped>
.container-InputRadio{
  display: block;
  position: relative;
  padding-left: 23px;
  cursor: pointer;
  margin-left: 3px;
  width: fit-content;
}

.container-InputRadio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 1px;
  width: var(--spacing-5);
  height: var(--spacing-5);
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: var(--spacing-1) solid var(--black);
  border-radius: 100%;
  background-color: var(--white);
}

.icon, .hover-circle {
  display: none;
}

.container-InputRadio input:checked ~ .checkbox {
  background-color: var(--purple-1);
  border-color: var(--purple-1);
}

.checkbox::after {
  content: "";
  position: absolute;
  display: none;
}

.input:checked ~ .checkbox .icon,
.input:hover:checked ~ .checkbox .icon{
  display: block;
  color: var(--white);
}

.input:focus ~ .checkbox {
  border-color: var(--purple-1);
  outline: var(--spacing-1) solid var(--black);
  outline-offset: 1px;
}

.container-InputRadio input:hover:not(:checked) ~ .checkbox .hover-circle {
  height: 6px;
  width: 6px;
  background-color: var(--gray-2);
  border: none;
  border-radius: 2px;
  display: block;
}

.container-InputRadio input:checked ~ .checkbox .hover-circle {
  height: 6px;
  width: 6px;
  background-color: var(--white);
  border: none;
  border-radius: 8px;
  display: block;
}

.container-InputRadio input:disabled ~ .checkbox {
  background-color: var(--gray-3);
  border-color: var(--gray-2);
}


label {
  color: var(--gray-1);
}

</style>
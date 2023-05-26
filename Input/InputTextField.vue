<template>
    <div class="container-InputTextField">
      <input
        v-if="!mask"
        v-bind="inputProps"
        :type="isPassword ? passwordFieldType : type"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
      />
      <input
        v-else
        v-bind="inputProps"
        v-mask="mask"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
      />
      <label v-if="label">{{ label }}</label>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InputTextField',
    props: {
      label: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        default: 'text',
      },
      value: {
        type: String,
        required: true,
      },
      maxlength: {
        type: Number,
        default: 50,
      },
      mask: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isPassword: false,
        passwordFieldType: 'password',
        inputProps: {
          name: this.label ? this.label.toLowerCase() : Math.random(),
          disabled: this.disabled,
          maxlength: this.maxlength,
          placeholder: ' ',
        },
      };
    },
    methods: {
      switchVisibility() {
        this.passwordFieldType =
          this.passwordFieldType === 'password' ? 'text' : 'password';
      },
    },
    created() {
      this.isPassword = this.type === 'password';
    },
  };
  </script>

<style scoped>
.container-InputTextField{
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
}

.container-InputTextField > input{
    border-bottom: 1px solid var(--gray-2);
    box-sizing: border-box;
    border-top: none;
    border-left: none;
    border-right: none;
    height: 2rem;
    padding: 0 .5rem;

    font-family: 'Montserrat';
    line-height: normal;
    font-size: 1rem;
    font-weight: 400;

    transition: all .1s linear;
    -webkit-transition: all .1s linear;
    -moz-transition: all .1s linear;
    background-color: transparent;
}

.container-InputTextField > input:-webkit-autofill{
    box-shadow: 0 0 0 30px var(--white) inset;
}

.container-InputTextField > input:hover{
    border-bottom-color: var(--black);
}

.container-InputTextField > input:focus{
    outline: none;
    border-bottom-color:var(--purple-1);
    transition: all .1s linear;
}
.container-InputTextField input::placeholder{
    color: transparent;
}

.container-InputTextField > label{
    pointer-events: none;
    position: absolute;
    top: 25%;
    color: var(--gray-2);
    transition: all .1s linear;
    -webkit-transition: all .1s linear;
    -moz-transition: all .1s linear;
    box-sizing: border-box;
    padding: 0 .5rem;
}
.container-InputTextField input:required:invalid + label{
    color: var(--red-1);
}
.container-InputTextField  input:focus:required:invalid{
    border-bottom-color: var(--red-1);
}
.container-InputTextField  input:required:invalid + label:before{
    content: '*';
}
.container-InputTextField  input:focus + label,
.container-InputTextField  input:not(:placeholder-shown) + label{
    font-size: 12px;
    top: -12px;
    color: var(--purple-1);
}

.container-InputTextField  input:not(:focus) + label,
.container-InputTextField  input:not(:placeholder-shown) + label{
    color: rgba(12, 12, 12, 0.651);
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>
<template>
    <div class="container-container-date">
        <input type="date" :disabled="disabled" :value="value" @input="$emit('update:value', $event.target.value)">
        <label>{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'DataInput',
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: Date,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
          id: `inputDatePicker-${this.label.toLocaleLowerCase().replace(/\s/g, '-')}`,
        }
    },
}
</script>

<style scoped>
.container-container-date{
    display: flex;
    flex-direction: column;
    column-gap: 9px;
    width: 100%;
    position: relative;
}
.container-container-date> label{
    pointer-events: none;
    position: absolute;
    top: 25%;
    color: var(--gray-2);
    transition: all .1s linear;
    -webkit-transition: all .1s linear;
    -moz-transition: all .1s linear;
    box-sizing: border-box;
    padding: 0 var(--spacing-xsmall);
    display: none;
}

.container-container-date> input{
    border-bottom: 1px solid var(--gray-2);
    box-sizing: border-box;
    border-top: none;
    border-left: none;
    border-right: none;
    height: var(--spacing-large);
    padding: 0 var(--spacing-xsmall);

    font-family: 'Montserrat';
    font-size: 1rem;
    font-weight: 400;

    transition: all .1s linear;
    -webkit-transition: all .1s linear;
    -moz-transition: all .1s linear;
    background-color: transparent;
    color: var(--black);

}

input[type="date"]::-webkit-calendar-picker-indicator {
    color: var(--gray-1);
    opacity: 1;
    display: block;
    background: url(https://i.imgur.com/pNJ7lTm.png) no-repeat;
    width: var(--spacing-small);
    height: var(--spacing-small);
    border-width: thin;
}

input[type="date"]:focus::-webkit-calendar-picker-indicator {
    background: url(https://i.imgur.com/6G6JMU8.png) no-repeat;
}

.container-container-date > input:hover{
    border-bottom-color: var(--black);
}


.container-container-date> input:focus{
    outline: none;
    border-bottom-color:var(--purple-1);
    transition: all .1s linear;
}

.container-container-date input:focus + label,
.container-container-date  input:not(:placeholder-shown) + label {
    font-size: 12px;
    top: -12px;
    color: var(--purple-1);
    display: block;
}

.container-container-date  input:not(:focus) + label,
.container-container-date  input:not(:placeholder-shown) + label{
    color: var(--gray-1);
}

.container-container-date>  input:not(:focus){
    color: var(--black);
}

</style>
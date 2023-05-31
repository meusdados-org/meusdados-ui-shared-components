<template>
    <div class="container-container-textarea">
        <label>{{ label }}</label>
        <div class="container-textarea">
            <textarea :value="value" :id="id" rows="6" @input="$emit('update:value', $event.target.value)" placeholder="Digite um texto aqui..." :maxlength="maxlength"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputTextArea',
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        maxlength: {
            type: Number,
            required: false,
            default: 255
        },
        height: {
            type: String,
            required: false,
            default: '2.5rem',
        }
    },
    data() {
        return {
            id: `inputTextArea-${this.label.toLocaleLowerCase().replace(/\s/g, '-')}`
        }
    },
}
</script>

<style scoped>
.container-container-textarea{
    display: flex;
    flex-direction: column;
    overflow: auto;
    column-gap: 9px;
    width: 100%;
}

.container-textarea {
    display: flex;
    border: 1px solid var(--gray-2);
    border-radius: var(--border-radius-1);
    padding: var(--spacing-5) 0;
    cursor: text;
}

label{
    color: var(--gray-1);
    font-family: 'Montserrat';
    font-size: 0.86rem;
    font-weight: 400;

    text-align: left;
    padding-bottom: .25rem;
}

textarea {
    width: 100%;
    border: none;
    padding: 0 var(--spacing-5);

    font-family: 'Montserrat';
    font-size: .875rem;
    font-weight: 400;
    line-height: 125%;
    resize: none;
}

textarea:focus {
    outline: none;
}

.container-textarea:hover {
    border-color: var(--black);
}


.container-textarea:has(textarea:focus){
    outline: none;
    border-color:var(--purple-1);
    transition: all .1s linear;
}

.container-textarea:has(textarea:not(:focus)) {
    color: rgba(12, 12, 12, 0.651);
}




</style>
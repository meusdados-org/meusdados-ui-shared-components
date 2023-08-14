<template>
    <button :type="type" :class="{ nohover }" :disabled="disabled"><span class="text-button"><slot></slot></span></button>
</template>

<script>

export default {
    name: 'ButtonPrimary',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'button'
        },
        nohover: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
button {
    padding: 0 1.5rem;
    height: 2.5rem;
    background: var(--blue-1) 0% 0% no-repeat padding-box;
    border-radius: var(--border-radius-1);
    border: none;
    color: var(--white);
    cursor: pointer;
    opacity: 1;
}

.text-button {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 700;
}

button:not(.nohover):hover {
    background-color: var(--purple-1);
    color: var(--white);
}

button:focus {
    outline: 2px solid var(--black);
    outline-offset: var(--spacing-1);
}

button:disabled {
    background-color: var(--gray-2);
    border: 1px solid var(--gray-2);
    color: var(--white);
}

button:disabled:focus {
    outline: none
}
</style>
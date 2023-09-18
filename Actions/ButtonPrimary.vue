<template>
    <button :type="type" :class="{ nohover, sameColorBackground }" :disabled="disabled"><span class="text-button"><slot></slot></span></button>
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
        },
        sameColorBackground: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
button {
    padding: 0 var(--spacing-medium);
    height: 2.5rem;
    background: var(--blue-1) 0% 0% no-repeat padding-box;
    border-radius: var(--border-radius-small);
    border: none;
    color: var(--white);
    cursor: pointer;
    opacity: 1;
}

.text-button {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 600;
}

button:not(.nohover):hover {
    background-color: var(--purple-1);
    color: var(--white);
}

button.sameColorBackground:hover {
    background-color: var(--blue-1);
    color: var(--purple-1);
}

button:focus {
    outline: var(--spacing-xxxsmall) solid var(--black);
    outline-offset: var(--spacing-xxxsmall);
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
<template>
    <vue-feather :type="type" :class="{svg: align}" :size="size" :stroke-width="strokeWidth"></vue-feather>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        type: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: false,
            default: '1rem'
        },
        align: {
            type: Boolean,
            required: false,
            default: true
        },
        strokeWidth: {
            type: Number,
            required: false,
            default: 2
        }
    }
}
</script>

<style>
.svg {
    top: var(--spacing-xxxsmall);
    position: relative;
}
</style>
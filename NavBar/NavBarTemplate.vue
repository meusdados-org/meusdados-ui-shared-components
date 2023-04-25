<template>
    <div class="options">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'NavBarTemplate'
};
</script>

<style scoped>
.options {
    display: flex;
    width: 55rem;
    white-space: nowrap;
    margin-left: 50px;
    overflow-x: auto;
    justify-content: space-between;
}

.options::-webkit-scrollbar {
    background-color: var(--gray-3);
    border-radius: 10px;
    margin-bottom: -1rem;
    margin-top: 1rem;
    height: 5px;
}

.options::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--blue-2);
}
</style>
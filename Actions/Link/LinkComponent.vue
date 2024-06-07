<template>
    <span v-on:click="goTo()" class="link" :class="{ active: isActive, clickable: to }">
        <slot></slot>
    </span>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'BarraLateralLink',
    props: {
        to: { type: String, required: false },
        icon: { type: String, required: true }
    },
    setup(props) {
        const route = useRoute()
        const isActive = computed(() => props.to ? route.path.includes(props.to) : false)

        return { isActive }
    },
    methods: {
        goTo() {
            if (!this.to) return;
            if (this.to === '#') {
                this.$dialog({ title: 'Funcionalidade em construção', message: 'Ops... Estamos construindo ainda nessa funcionalidade.', type: 'alert' });
                return;
            }
            this.$emit('changeRoute', this.to);
            window.location.href = this.to;  
        }
    }
}
</script>

<style scoped>
.link:hover {
    color: var(--purple-1);
}

.link.active {
    color: var(--purple-1);
    font-weight: 600;
}

.clickable {
    cursor: pointer;
}
</style>

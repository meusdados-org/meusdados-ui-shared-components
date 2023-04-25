<template>
    <span class="breadcrumbs">
        <span class="item" v-for="(item, i) in crumbs" :key="i" :class="{ nextItem: i > 0 }">
            <Title3Component class="breadcrumb-title" :class="{ backLink: item.link, currentPage: isTheCurrentPage(i) && i !== 0 }" @click="routeTo(item.link)">{{ item.name }}</Title3Component><Icon v-if="!isTheCurrentPage(i)" type="chevron-right" />
        </span>
    </span>
</template>

<script>
import Icon from '@/components/shared/Icon/Icon.vue';
import Title3Component from '../Font/Title/Title3Component.vue';

export default {
    name: 'BreadCrumbs',
    components: {
        Icon,
        Title3Component
    },
    computed: {
        crumbs() {
            const crumbs = this.$route.meta.breadcrumb;
            return crumbs;
        }
    },
    methods: {
        routeTo(link) {
            if (!link) return;
            this.$router.push({ path: link });
        },
        isTheCurrentPage(index) {
            return index === this.crumbs.length - 1;
        }
    },
};
</script>

<style scoped>

.breadcrumb-title {
    margin-right: 1rem;
}

.backLink {
    cursor: pointer;
}

.backLink:hover {
    color: var(--purple-1);
}

.nextItem {
    margin-left: 1rem;
}

.currentPage {
    color: var(--gray-2);
}

</style>
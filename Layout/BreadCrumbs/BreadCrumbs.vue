<template>
    <span class="breadcrumbs">
        <span class="item" v-for="(item, i) in crumbs" :key="i" :class="{ nextItem: i > 0 }">
            <TitleSmall class="breadcrumb-title" :class="{ backLink: item.link, currentPage: isTheCurrentPage(i) && i !== 0 }" @click="routeTo(item.link)">{{ item.name }}</TitleSmall><Icon class="breadcrumb-icon" v-if="!isTheCurrentPage(i)" type="chevron-right" />
            <LabelMedium class="breadcrumb-title mobile" :class="{ backLink: item.link, currentPage: isTheCurrentPage(i) && i !== 0 }" @click="routeTo(item.link)">
                {{ item.name }}
            </LabelMedium> <Icon class="breadcrumb-icon mobile" size="14px" v-if="!isTheCurrentPage(i)" type="chevron-right" />
        </span>
    </span>
</template>

<script>
import Icon from '@/components/shared/Icon/Icon.vue';
import TitleSmall from '@/components/shared/Typography/Title/TitleSmall.vue';
import LabelMedium from '../../Typography/Label/LabelMedium.vue';
import Tag from '@/components/shared/Inputs/Tag/Tag.vue';

export default {
    name: 'BreadCrumbs',
    components: {
        Icon,
        TitleSmall,
        LabelMedium,
        Tag
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
    margin-right:  var(--spacing-small);
    color: var(--blue-1);
}

.backLink {
    cursor: pointer;
}

.backLink:hover {
    color: var(--purple-1);
}

.nextItem {
    margin-left:  var(--spacing-small);
}

.currentPage {
    color: var(--gray-2);
}

.mobile {
    display: none;
}

@media (max-width: 768px) {
    .breadcrumb-title {
        display: none;
    }

    .breadcrumb-title.mobile {
        display: inline;
    }

    .breadcrumb-icon {
        display: none;
    }

    .breadcrumb-icon.mobile {
        display: inline;
    }
}

</style>
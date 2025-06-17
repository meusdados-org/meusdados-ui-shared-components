<template>
    <span class="breadcrumbs">
        <span class="item" v-for="(item, i) in crumbs" :key="i" :class="{ nextItem: i > 0 }">
            <TitleSmall class="breadcrumb-title" :class="{ backLink: item.link, currentPage: isTheCurrentPage(i) && i !== 0 }" @click="routeTo(item.link)">{{ item.name }}</TitleSmall><Icon class="breadcrumb-icon" v-if="!isTheCurrentPage(i)" type="chevron-right" />
            <LabelMedium class="breadcrumb-title mobile" :class="{ backLink: item.link, currentPage: isTheCurrentPage(i) && i !== 0 }" @click="routeTo(item.link)">
                {{ item.name }}
            </LabelMedium> <Icon class="breadcrumb-icon mobile" size="14px" v-if="!isTheCurrentPage(i)" type="chevron-right" />
        </span>
        <span v-if="allowHelp && helpText" class="tooltip-wrapper">
            <ButtonLink type="help-circle" size="large" onlyIcon />
            <div class="tooltip-text" v-html="helpText"></div>
        </span>
    </span>
    <!-- <ModalHelp v-if="allowHelp && helpText" :open="open" :helpText="helpText" @close="open = false" />-->
</template>

<script>
import Icon from '@/components/shared/Icon/Icon.vue';
import TitleSmall from '@/components/shared/Typography/Title/TitleSmall.vue';
import LabelMedium from '../../Typography/Label/LabelMedium.vue';
import Tag from '@/components/shared/Inputs/Tag/Tag.vue';
import ButtonLink from '@/components/shared/Actions/ButtonLink.vue';
import ModalHelp from '@/components/Modals/ModalHelp.vue';
import { UsuarioEmpresaService } from '@/services/usuarioEmpresa';
import posthog from '@/utils/posthog-handler';

export default {
    name: 'BreadCrumbs',
    components: {
        Icon,
        TitleSmall,
        LabelMedium,
        Tag,
        ButtonLink,
        ModalHelp
    },
    data() {
        return {
            allowHelp: false,
            open: false
        }
    },
    computed: {
        crumbs() {
            const crumbs = this.$route.meta.breadcrumb;
            return crumbs;
        },
        helpText() {
            return this.$route.meta.helpText;
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
    async created() {
        let user = JSON.parse(localStorage.getItem('usuario'));
        if  (!user) {
            const { data } = await new UsuarioEmpresaService().getUserInfo();
            user = data;
        }
        posthog.setPersonPropertiesForFlags({ cnpj: user.cnpj });
        posthog.onFeatureFlags(() => {
            const flag = posthog.getFeatureFlag('help-texts-ab-test');
            const overwriteFlag = posthog.isFeatureEnabled('help-texts');
            this.allowHelp = (flag == 'test' || overwriteFlag);
        })
    }
};
</script>

<style scoped>

.breadcrumbs {
    width: 100%;
    display: flex;
}

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
    opacity: 0.63;
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

    .breadcrumbs, .item {
        display: flex;
    }
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip-text {
  visibility: hidden;
  opacity: 0;
  width: 420px;
  background-color: #8b5cf6; /* roxo principal da sua interface */
  color: #FFFFFF; /* texto branco */
  text-align: justify;
  border-radius: 8px;
  padding: 8px 12px;
  position: absolute;
  z-index: 1500;
  bottom: auto;
  top: 90%;
  left: 200%;
  transform: translateY(-50%);
  transition: opacity 0.3s ease;
  white-space: normal;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(108, 99, 255, 0.4);
  pointer-events: none;
  font-family: "Inter", sans-serif; /* ajusta conforme sua fonte */
  line-height: 1.4;
}

.tooltip-wrapper:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

</style>

<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
        <header>
            <span class="collapse-icon"
                @click="toggleSideBar"
                :class="{ 'rotate-180': collapsed }">
                <Icon size="1.25rem" type="arrow-left" :align="false"/>
            </span>
            <h1 class="logo" :class="{ collapsed }">
                <span v-if="collapsed">
                    <img class="logo-collapsed" :src="meusDados">
                </span>
                <span v-else>
                    <img class="logo-open" :src="meusDadosComTexto">
                </span>
            </h1>
            <div class="notification" v-if="!collapsed">
                <div class="notification-text">
                    <Icon type="bell" size="16px"/> Notificações
                </div>
                <div class="notification-quantitiy">
                    5
                </div>
            </div>
            <div class="notification collapsed" v-else>
                <div class="notification-text">
                    <Icon type="bell" size="16px"/>
                </div>
                <div class="notification-quantitiy">
                    5
                </div>
            </div>
            <hr class="line"/>
        </header>
        <div class="links" :class="{ collapsed: collapsed }">
            <div v-for="link in links" :key="link.titleHeader">
                <template v-if="(!link.permission || permissions[link.permission])">
                    <SideBarLinkGroup
                        v-if="link.children"
                        :titleHeader="link.titleHeader"
                        :iconHeader="link.iconHeader"
                        :children="link.children"
                        :activeGroup="activeGroup === link.titleHeader"
                        :userPermissions="permissions"
                        :currentPage="link.children.some(child => currentPage === child.to)"
                        @activateGroup="activateGroup"
                        @changeRoute="changeRoute"/>
                    <BarraLateralLink
                        v-else
                        :icon="link.iconHeader"
                        :to="link.to"
                        @changeRoute="changeRoute">
                        {{ link.titleHeader }}
                    </BarraLateralLink>
                </template>
            </div>
        </div>
        <div class="create" style="display: none;" :class="{ collapsed }">
            <ButtonPrimary id="button-criar-sidebar" v-if="!collapsed" class="button"><Icon type="plus" size=" var(--spacing-small)"/> Criar</ButtonPrimary>
            <ButtonIcon id="button-criar-minimizado-sidebar" v-else type="plus" />
        </div>
        <hr class="line"/>
        <FooterLateralVue :usuario="usuario" />
    </div>
    <ModalTemplate :open="confirmarEmail">
        <CardConfirmarEmail @refresh="refresh" />
    </ModalTemplate>
</template>

<script>
import { collapsed, toggleSideBar, sidebarWidth } from './state'
import { UsuarioTitularService } from '@/services/usuarioTitular'
import BarraLateralLink from './SideBarLink.vue'
import meusDados from '@/assets/img/meus-dados.png'
import meusDadosComTexto from '@/assets/img/meus-dados-colorido.png'
import FooterLateralVue from './SideBarFooter.vue'
import Icon from '@/components/shared/Icon/Icon.vue'
import BodySmall from '@/components/shared/Typography/Body/BodySmall.vue'
import ButtonPrimary from '@/components/shared/Actions/ButtonPrimary.vue'
import ButtonIcon from '@/components/shared/Actions/ButtonIcon.vue'
import SideBarLinkGroup from './SideBarLinkGroup.vue'
import CardConfirmarEmail from '@/components/Cards/CardConfirmarEmail/CardConfirmarEmail.vue'
import ModalTemplate from '../../Overlay/Modal/ModalTemplate.vue'

export default {
    name: "BarraLateral",
    components: {
        BarraLateralLink,
        FooterLateralVue,
        Icon,
        BodySmall,
        ButtonPrimary,
        ButtonIcon,
        SideBarLinkGroup,
        ModalTemplate,
        CardConfirmarEmail
    },
    data() {
        return {
            usuario: {
            },
            popup: false,
            permissions: {},
            activeGroup: undefined,
            currentPage: '/dashboard',
            links: [
                {
                    titleHeader: 'Dashboard',
                    iconHeader: 'home',
                    to: '/dashboard',
                    children: undefined
                },
                {
                    titleHeader: 'Solicitações',
                    iconHeader: 'file-text',
                    to: '/solicitacoes',
                    children: undefined
                },
                {
                    titleHeader: 'Meus Dados',
                    iconHeader: 'user-check',
                    to: '/meus-dados',
                    children: undefined
                },
            ]
        }
    },
    methods: {
        getUserInfo() {
            new UsuarioTitularService().getUserInfo().then(response => {
                console.log(response.data)
                this.usuario = response.data
                if (!this.usuario.confirmado_email) {
                    this.confirmarEmail = true;
                }
                localStorage.setItem('usuario', JSON.stringify(response.data));
            })
        },
        activateGroup(status, titleHeader) {
            this.activeGroup = status ? titleHeader : undefined;
        },
        changeRoute(to, titleHeader = undefined) {
            console.log(to, titleHeader)
            this.activeGroup = titleHeader;
            this.currentPage = to;
        },
        refresh() {
            this.$router.go();
        }
    },
    setup() {
        return { collapsed, toggleSideBar, sidebarWidth, meusDados, meusDadosComTexto,};
    },
    created() {
        this.getUserInfo();
    },
}

</script>

<style scoped>
.sidebar {
    color: var(--gray-1);
    background-color: var(--white);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.116);
    border-top-right-radius:  var(--spacing-small);
    border-bottom-right-radius:  var(--spacing-small);
    height: 100vh;

    float: left;
    position: fixed;
    justify-content: space-between;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
}

.company-info {
    font-size: 0.9rem;
    font-weight: 300;
    margin-bottom:  var(--spacing-small);
    padding:  var(--spacing-small);
}

.razao-social {
    font-weight: 600;
    font-size:  var(--spacing-small);
    text-align: left;
}

.collapse-icon {
    color: white;
    background-color: var(--blue-1);
    border-radius: 50%;
    position: absolute;
    top: 44px;
    right: -.90rem;

    display: flex;
    justify-content: center;
    min-width: var(--spacing-large);
    max-width: var(--spacing-large);
    height: var(--spacing-large);
    align-items: center;
    cursor: pointer;

    transition: 0.2s linear;
}

.collapse-icon:hover {
    background-color: var(--purple-1);
    transition: none;
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.3s linear;
}

.line {
    height: var(--spacing-xxxsmall);
    background-color: var(--gray-3);
    border: none;
}

.notification {
    display: flex;
    padding: var(--spacing-large);
    padding-top: var(--spacing-small);
    font-size:  var(--spacing-small);
    justify-content: space-between;
    cursor: pointer;
    display: none;
}

.noification:hover > .notification-quantitiy {
    background-color: var(--purple-1);
}

.notification.collapsed {
    padding: var(--spacing-large) var(--spacing-medium);
    justify-content: center;
    column-gap: var(--spacing-xsmall);
}


.notification-quantitiy {
    font-size: 12px;
    background-color: var(--blue-2);
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: var(--spacing-xxsmall);
}

.logo {
    padding: var(--spacing-large) var(--spacing-medium);
    padding-bottom: var(--spacing-small);
}

.logo:has(.logo-open)  {
    display: flex;
    padding: var(--spacing-large);
    padding-bottom: var(--spacing-small);
}


.logo:has(.logo-open) ~ .company-info {
    padding: 0 var(--spacing-large);
}


.logo-open {
    width: 7.1rem;
}

.logo-collapsed {
    width: 3.1rem;
}

.company-info {
    display: flex;
    padding-left: 1.3rem;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
}

.links {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--spacing-large);
    overflow-y: auto;
}

.links > * {
    width: 100%;
    text-align: left;
}

.create {
    padding: var(--spacing-large);
}

.create.collapsed {
    padding: var(--spacing-large) var(--spacing-medium);
}

.create.collapsed > .button {
    width: var(--spacing-xlarge);
    height: var(--spacing-xlarge);
}

.button {
    width: 100% !important;
    height: var(--spacing-xlarge);
}


.links.collapsed {
    margin: 0 auto;
    padding: var(--spacing-large)  var(--spacing-small);
}

@media (max-width: 768px) {
    .sidebar {
        display: none;
    }
}
</style>
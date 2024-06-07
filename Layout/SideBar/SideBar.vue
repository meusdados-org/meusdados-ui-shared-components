<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
        <header>
            <span class="collapse-icon"
                @click="toggleSideBar"
                :class="{ 'rotate-180': collapsed }">
                <ButtonIcon class="icon" type="arrow-left" size="small"/>
            </span>
            <h1 class="logo" :class="{ collapsed }">
                <span v-if="collapsed">
                    <img class="logo-collapsed" :src="meusDados">
                </span>
                <span v-else>
                    <img class="logo-open" :src="meusDadosComTexto">
                </span>
            </h1>
            <h2 class="company-info" v-if="!collapsed">
                <BodyMedium>{{ usuario.empresa.razao_social }} {{ usuario.cnpj }}</BodyMedium>
            </h2>
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
        <div class="help" :class="{ collapsed }">
            <ButtonLink v-if="allowHelp" type="help-circle" v-on:click="help = true">Precisa de ajuda?</ButtonLink>
        </div>
        <hr class="line"/>
        <FooterLateralVue :usuario="usuario" />
    </div>
    <ModalTemplate :open="primeiroAcesso">
        <CardRecuperarAcesso :firstAccessCard="true" @refresh="refresh" />
    </ModalTemplate>
    <ModalTemplate :open="confirmarEmail">
        <CardConfirmarEmail @refresh="refresh" />
    </ModalTemplate>
    <ModalHelp :open="help" :helpText="helpText" @close="help = false"/>
</template>

<script>
import { collapsed, toggleSideBar, sidebarWidth } from './state'
import { usuarioEmpresa } from '@/services/usuarioEmpresa'
import { Token } from '@/utils/token'
import BarraLateralLink from './SideBarLink.vue'
import meusDados from '@/assets/img/meus-dados.png'
import meusDadosComTexto from '@/assets/img/meus-dados-colorido.png'
import FooterLateralVue from './SideBarFooter.vue'
import Icon from '@/components/shared/Icon/Icon.vue'
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue'
import ButtonIcon from '@/components/shared/Actions/ButtonIcon.vue'
import SideBarLinkGroup from './SideBarLinkGroup.vue'
import CardRecuperarAcesso from '@/components/Cards/CardRecuperarAcesso/CardRecuperarAcesso.vue'
import CardConfirmarEmail from '@/components/Cards/CardConfirmarEmail/CardConfirmarEmail.vue'
import ModalTemplate from '../../Overlay/Modal/ModalTemplate.vue'
import ButtonLink from '@/components/shared/Actions/ButtonLink.vue'
import ModalHelp from '@/components/Modals/ModalHelp.vue'
import posthog from '@/utils/posthog-handler'

export default {
    name: "BarraLateral",
    components: {
        BarraLateralLink,
        FooterLateralVue,
        Icon,
        BodyMedium,
        ButtonIcon,
        SideBarLinkGroup,
        ModalTemplate,
        CardRecuperarAcesso,
        CardConfirmarEmail,
        ButtonLink,
        ModalHelp
    },
    data() {
        return {
            usuario: {
                empresa: {
                    razao_social: ''
                }
            },
            popup: false,
            permissions: {},
            activeGroup: undefined,
            currentPage: '/dashboard',
            primeiroAcesso: false,
            confirmarEmail: false,
            allowHelp: false,
            help: false,
            helpText: `
### Como navegar pela plataforma?
- **Dashboard:** Obtenha uma visão geral da sua conta, incluindo atividades recentes, número de titulares e status de configurações.
- **Mapeamento de Dados:** Gerencie os dados pessoais em conformidade com a LGPD com as subopções abaixo:
    - **Área:** Registre setores que lidam com dados pessoais.
    - **Bases Legais:** Veja as bases legais relacionadas à LGPD.
    - **Sistemas:** Cadastre sistemas de TI que armazenam/processam dados pessoais.
    - **Terceiros:** Registre parceiros com acesso a dados pessoais.
    - **Termos de Uso:** Documente políticas de uso e privacidade.
    - **Tipos de Dados:** Classifique os dados pessoais coletados.
    - **Processo:** Documente processos internos de dados, do início ao fim.
- **Titulares:** Gerencie dados pessoais em conformidade com a LGPD:
    - **Todos os Titulares:** Cadastre e administre titulares e suas informações.
    - **Tipos de Titular:** Categorize titulares em grupos, como clientes ou funcionários.
- **Consentimentos:** Solicite e gerencie consentimentos dos titulares conforme a LGPD, garantindo transparência e permissão explícita.
- **Solicitações:** Gerencie solicitações de titulares em conformidade com a LGPD:
    - **Todas as Solicitações:** Visualize todas as solicitações de titulares, incluindo pedidos de acesso, correção ou exclusão de dados.
    - **Respostas Automáticas:** Configure respostas automáticas para solicitações, melhorando a eficiência e experiência dos titulares.
- **Configurações:** Gerencie configurações gerais da conta:
    - **Assinatura e Pagamentos:** Controle sua assinatura, realize upgrades e gerencie pagamentos.
    - **Usuários:** Adicione usuários para gerenciar a conta.
    - **Conta e Cadastro:** Atualize informações de cadastro, como nome fantasia, endereço, representantes legais, DPO e responsável pela segurança da informação.
            `,
            links: [
                {
                    titleHeader: 'Dashboard',
                    iconHeader: 'home',
                    to: '/dashboard',
                    children: undefined
                },
                {
                    titleHeader: 'Mapeamento de Dados',
                    iconHeader: 'hard-drive',
                    permission: 'mapeamento_dados',
                    children: [
                        {
                            title: 'Área',
                            to: '/mapeamento-dados/areas'
                        },
                        {
                            title: 'Bases Legais',
                            to: '/mapeamento-dados/bases-legais'
                        },
                        {
                            title: 'Sistemas',
                            to: '/mapeamento-dados/sistemas'
                        },
                        {
                            title: 'Terceiros',
                            to: '/mapeamento-dados/terceiros'
                        },
                        {
                            title: 'Termos de Uso',
                            to: '/mapeamento-dados/termos-uso'
                        },
                        {
                            title: 'Tipos de Dados',
                            to: '/mapeamento-dados/tipos-dados'
                        },
                        {
                            title: 'Processos',
                            to: '/mapeamento-dados/processos'
                        }
                    ]
                },
                {
                    titleHeader: 'Relatórios',
                    iconHeader: 'file-text',
                    to: '/relatorio',
                    children: undefined,
                },
                {
                    titleHeader: 'Titulares',
                    iconHeader: 'users',
                    permission: 'titulares',
                    children: [
                        {
                            title: 'Todos Titulares',
                            to: '/titulares'
                        },
                        {
                            title: 'Tipos de Titular',
                            to: '/tipos-titular'
                        }
                    ]
                },
                {
                    titleHeader: 'Consentimentos',
                    iconHeader: 'user-check',
                    to: '/consentimentos',
                    children: undefined
                },
                {
                    titleHeader: 'Solicitações',
                    iconHeader: 'inbox',
                    children: [
                        {
                            title: 'Todas Solicitações',
                            to: '/solicitacoes/todas-solicitacoes'
                        },
                        {
                            title: 'Respostas Automáticas',
                            to: '/solicitacoes/resposta-automatica'
                        },
                    ],
                },
                {
                    titleHeader: 'Configurações',
                    iconHeader: 'settings',
                    children: [
                    // {
                    //     title: 'Conta e cadastro',
                    //     to: '#',
                    //     icon: 'settings'
                    // },
                    {
                        title: 'Assinatura e Pagamentos',
                        to: '/configuracoes/assinaturas',
                        icon: 'settings'
                    },
                    {
                        title: 'Usuários',
                        permission: 'usuarios',
                        to: '/configuracoes/usuarios',
                        icon: 'settings'
                    },
                    // {
                    //    title: 'Perfis',
                    //    permission: 'usuarios',
                    //    to: '/configuracoes/perfis',
                    //    icon: 'settings'
                    // },
                  ]
                }
            ]
        }
    },
    methods: {
        getUserInfo() {
            usuarioEmpresa.getUserInfo().then(response => {
                this.usuario = response.data;
                if (this.usuario.first_login) {
                    this.primeiroAcesso = true;
                }
                if (!this.usuario.confirmado_email) {
                    this.confirmarEmail = true;
                }
                localStorage.setItem('usuario', JSON.stringify(response.data));
                if (this.usuario.perfil_obj.nome === 'Master') {
                    this.links[6].children.push({
                        title: 'Conta e cadastro',
                        to: '/configuracoes/conta-cadastro',
                        icon: 'settings'
                    })
                }
                const user = response.data;
                this.manageFeatureToggling(user);
            })
        },
        manageFeatureToggling(user) {
            posthog.setPersonPropertiesForFlags({ cnpj: user.cnpj });
            let optionAdded = false;
            posthog.onFeatureFlags(() => {
                const helpTextsFlag = posthog.getFeatureFlag('help-texts-ab-test');
                const overwriteHelpTextsFlag = posthog.isFeatureEnabled('help-texts');
                this.allowHelp = (helpTextsFlag == 'test' || overwriteHelpTextsFlag);

                const treinamentosFlag = posthog.getFeatureFlag('treinamentos-ab-test');
                const overwriteTreinamentosFlag = posthog.isFeatureEnabled('treinamentos');
                if ((treinamentosFlag == 'test' || overwriteTreinamentosFlag) && !optionAdded) {
                    optionAdded = true;
                    this.links.splice(1, 0, {
                        titleHeader: 'Treinamentos',
                        to: '/treinamentos',
                        iconHeader: 'book-open'
                    })
                }
            })
        },
        activateGroup(status, titleHeader) {
            this.activeGroup = status ? titleHeader : undefined;
        },
        changeRoute(to, titleHeader = undefined) {
            this.activeGroup = titleHeader;
            this.currentPage = to;
        },
        refresh() {{
            this.$router.go();
        }}
    },
    setup() {
        return { collapsed, toggleSideBar, sidebarWidth, meusDados, meusDadosComTexto,};
    },
    created() {
        this.getUserInfo();
        const token = new Token(localStorage).getToken()
        this.permissions = token;
        this.currentPage = this.$route.path.split('/criar')[0].split('/editar')[0];
        this.links.forEach(link => {
            if(!link.children) return;
            link.children.forEach(child => {
                if (this.currentPage === child.to) {
                    this.activeGroup = link.titleHeader;
                }
            })
        })
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

.icon {
    border-radius: var(--border-radius-full);
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.3s linear;
}

.line {
    height: 1px;
    background-color: var(--gray-2);
    opacity: 0.75;
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
    padding: var(--spacing-large);
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo:has(.logo-open)  {
    display: flex;
    justify-content: flex-start;
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

.help {
    padding: var(--spacing-small);
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
</style>

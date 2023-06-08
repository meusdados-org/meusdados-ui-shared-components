<template>
    <footer>
        <div class="user" :class="{ userCollapsed: collapsed }">
            <img :src="defaultProfilePic" class="profile-pic" :class="{ collapsed }"/>
            <span v-if="!collapsed" v-on:click="ativarPopup" class="username">{{ usuario.nome }}</span>
            <Icon class="icon" v-on:click="ativarPopup"  type="chevron-right" :class="{popup}" size="1rem"/>
        </div>
        <div v-if="popup">
            <SideBarPopUp @close="ativarPopup" :nome="usuario.nome" />
        </div>
    </footer>
</template>

<script>

import { collapsed } from './state'
import defaultProfilePic from '@/assets/img/default.png'
import Icon from '@/components/shared/Icon/Icon.vue'
import SideBarPopUp from './SideBarPopUp.vue';

export default {
    name: "FooterBarraLateral",
    props: {
        usuario: Object
    },
    data() {
        return {
            popup: false,
        }
    },
    methods: {
        ativarPopup(){
            this.popup = !this.popup;
        }
    },
    setup() {
        return { collapsed, defaultProfilePic };
    },
    components: { Icon, SideBarPopUp }
}
</script>

<style scoped>
.user {
    padding: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    color: var(--blue-1);
}

.user > span {
    cursor: pointer;
    max-width: 60%;
}

.user > span:hover .icon {
    color: var(--purple-1)
}

.user.userCollapsed {
    padding: 32px 24px;
}

.icon {
    transition: transform 0.8s;
    cursor: pointer;
}

.popup {
    transform: rotateY(180deg);
    color: var(--gray-2);
}

.profile-pic {
    width: 48px;
    height: 48px;
    border-radius: 100px;
}

</style>
<template>
    <div class="popup-wrapper" @click="$emit('close')">
    </div>
    <Card class="grid-card" @click.stop="">
        <BarraLateralLink class='text' to="/conta/editar" icon="user">Minha Conta</BarraLateralLink>
        <BarraLateralLink class='text' to="/login" v-on:click="logout" icon="log-out">Sair</BarraLateralLink>
    </Card>
</template>

<script>
import { authService } from '@/services/auth'
import Card from '@/components/shared/PageBlocks/Card/CardTemplate.vue'
import BarraLateralLink from './SideBarLink.vue'

export default {
    name: "FooterBarraLateral",
    props: ['nome'],
    data() {
        return {
            usuario: {}
        }
    },
    components:{
        Card,
        BarraLateralLink
    },
    methods: {
        async logout() {
            localStorage.clear();
            await authService.logout();
            window.location.reload();

            // make it work on mobile too
            if (window.innerWidth < 768) {
                window.location.href = '/login';
            }
        }
    },
}
</script>
<style scoped>

.grid-card{
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;

    float: left;
    position: fixed;
    left: 271px;
    padding:  var(--spacing-small);
    bottom: var(--spacing-large);
    z-index: 2;

    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.192);
}

.popup-wrapper {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
}

.text{
    font-weight: 400;
    font-size:  var(--spacing-small);
}
</style>
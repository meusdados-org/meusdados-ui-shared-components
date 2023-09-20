<template>
    <LinkComponent :to="to" class="link">
        <ButtonLink v-if="icon" class="icon">
            <IconVue :type="icon" size="1.25rem"/>
        </ButtonLink>
        <span v-if="!collapsed">
            <BodyMedium>
                <transition name="fade">
                    <slot/>
                </transition>
            </BodyMedium>
        </span>
    </LinkComponent>
</template>

<script>
import { collapsed } from './state'
import LinkComponent from '@/components/shared/Actions/Link/LinkComponent.vue'
import IconVue from '@/components/shared/Icon/Icon.vue';
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import ButtonLink from '../../Actions/ButtonLink.vue';

export default {
    name: "BarraLateralLink",
    props: {
        to: { type: String, required: false },
        icon: { type: String, required: false }
    },
    setup() {
        return { collapsed };
    },
    components: { LinkComponent, IconVue, ButtonLink }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.link {
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    font-weight: 400;
    font-size:  var(--spacing-small);
    user-select: none;

    margin: 0.1em 0;
    padding: 0.4em 0;
    border-radius: 0.25em;
    /* height: 1.5em; */

    color: inherit;
    text-decoration: none;
}

.link:hover {
    color: var(--purple-1);
}

.link.active {
    color: var(--blue-1);
}

.link .icon {
    flex-shrink: 0;
    width: 1.563rem;
    margin-right: 0.625rem;
}

.icon.collapsed {
    margin: 0;
}
</style>
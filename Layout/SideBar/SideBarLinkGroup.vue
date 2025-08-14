<template>
  <div class="link-group-container">
    <div class="link-group-header" v-on:click="toggleActive">
      <SideBarLink :icon="iconHeader">
        <span>{{ titleHeader }}</span>
      </SideBarLink>
      <Icon type="arrow-down-circle" :class="{ activeGroup: isActive }"/>
    </div>
    <ul class="link-group-children" :class="{ activeChildren: isActive }">
      <li v-for="child in children" :key="child.to || child.titleHeader">
        <BodyMedium v-if="!child.permission || userPermissions[child.permission]">
          <SideBarLinkGroup
            v-if="child.children"
            :titleHeader="child.title"
            :iconHeader="child.icon"
            :children="child.children"
            :userPermissions="userPermissions"
            @changeRoute="changeRoute"
          />
          <SideBarLink 
            v-else
            class="child" 
            :to="child.to" 
            v-on:changeRoute="to => $emit('changeRoute', to, titleHeader)" 
          >
            {{ child.title }}
          </SideBarLink>
        </BodyMedium>
      </li>
    </ul>
  </div>
</template>

<script>
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import Icon from '@/components/shared/Icon/Icon.vue';
import SideBarLink from './SideBarLink.vue';

export default {
  name: 'SideBarLinkGroup',
  components: {
    SideBarLink,
    BodyMedium,
    Icon,
    SideBarLinkGroup: () => import('./SideBarLinkGroup.vue')
  },
  props: {
    iconHeader: {
      type: String,
      required: true
    },
    titleHeader: {
      type: String,
      required: true
    },
    children: {
      type: Array,
      required: true
    },
    userPermissions: {
      type: Object,
      required: true
    },
    to: {
      type: [String, Object],
      required: false,
      default: null,
    },
  },
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
    changeRoute(to) {
        this.$emit('changeRoute', to);
    }
  },
};
</script>

<style scoped>
.link-group-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.link-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.link-group-header:hover {
  color: var(--purple-1);
  cursor: pointer;
}

.link-group-children {
  list-style-type: none;
  text-align: left;
  display: none;
}

.link-group-children.activeChildren {
  display: block;
}

.activeGroup {
  transform: rotate(180deg);
}

.child {
  font-size: 12px;
}

</style>
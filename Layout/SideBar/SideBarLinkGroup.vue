<template>
  <div class="link-group-container">
    <div class="link-group-header" v-on:click="activate">
      <SideBarLink :icon="iconHeader" :class="{active: currentPage}">
        <span>{{ titleHeader }}</span>
      </SideBarLink>
      <Icon type="chevron-down" :class="{ activeGroup }"/>
    </div>
    <ul class="link-group-children" :class="{ activeChildren: activeGroup }">
      <li v-for="child in children" :key="child.to">
        <BodyMedium v-if="!child.permission || userPermissions[child.permission]">
          <SideBarLink class="child" :to="child.to" v-on:changeRoute="to => $emit('changeRoute', to, titleHeader)" @isActive="mantainActive">{{ child.title }}</SideBarLink>
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
    Icon
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
    activeGroup: {
      type: Boolean,
      required: false,
      default: false
    },
    currentPage: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  methods: {
    activate() {
      this.$emit('activateGroup', !this.activeGroup, this.titleHeader)
    }
  },
  created() {
    this.children.forEach(child => {
      if(this.$route.path === child.to) {
        this.$emit('activateGroup', true, this.titleHeader);
      }
    })
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
<template>
  <div class="card-wrapper" :class="{ isModal }">
      <div class="card-container" :style="{ padding: customPadding }">
          <div class="card-header">
              <BodyMedium class="main-title" v-if="loaded_">{{ title }}</BodyMedium>
              <span class="skeletion labelmedium-skeleton" v-else></span>
              <slot name="action" v-if="hasAction">
                <ButtonLink class="icon-desktop" @click="$emit('close')" v-if="hasAction" type="x" onlyIcon>
                </ButtonLink>
                <ButtonLink class="icon-mobile" size="large" @click="$emit('close')" v-if="hasAction" type="x" onlyIcon>
                </ButtonLink>
              </slot>
          </div>
          <hr v-if="!isMobile"/>
          <div class="card-content">
            <slot name="content"></slot>
          </div>
          <div class="card-footer" v-if="footer">
            <slot name="footer"></slot>
          </div>
      </div>
  </div>
</template>


<script>
import Icon from '@/components/shared/Icon/Icon.vue';
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue'
import ButtonLink from '@/components/shared/Actions/ButtonLink.vue';

export default {
  name: "Card",
  props: {
    title: {
      type: String,
      required: false
    },
    to: {
      type: String,
      required: false
    },
    hasAction: {
      type: Boolean,
      required: false,
      default: true
    },
    customPadding: {
      type: String,
      required: false,
      default: 'var(--spacing-small)'
    },
    loaded: {
      type: Boolean,
      required: false,
      default: undefined
    },
    isModal: {
      type: Boolean,
      required: false,
      default: true
    },
    footer: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
      Icon,
      ButtonLink,
      BodyMedium
  },
  computed: {
    loaded_() {
      if (this.loaded === undefined) {
        return true;
      }
      return this.loaded;
    },
    isMobile() {
      return window.innerWidth <= 768;
    }
  }
}
</script>

<style scoped>
.card-wrapper{
  border-radius: var(--border-radius-small);
  background-color: white;
  overflow: hidden;
  box-shadow: 0px 0px var(--spacing-xxsmall) 0px rgba(0, 0, 0, 15%);
  display: flex;
  flex-direction: column;
}

.main-title {
  color: var(--gray-2);
}

.card-container{
  display: flex;
  flex-direction: column;
  padding:  var(--spacing-small);
  flex-grow: 1;
  row-gap: var(--spacing-xsmall);
}

.card-header{
  display: flex;
  text-align: left;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  font-size: 100%;
  color: var(--gray-2);
}

.card-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.action {
  text-decoration: none;
  color: inherit;
}

.x-icon {
  color: var(--gray-2) !important;
}


.skeletion {
  background-color: var(--black);
  border-radius: var(--border-radius-small, 8px);
  height: 66px;
  animation: loading 1.5s infinite ease-in-out;
}


.labelmedium-skeleton {
  width: 200px;
  height: 20px;
  border-radius: var(--border-radius-mini, 4px);
}

@keyframes loading {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.2;
  }
}

.icon-mobile {
  display: none;
}

hr {
  display: none;
}

@media (max-width: 768px) {
  .card-wrapper{
    border-radius: 0;
    box-shadow: none;
  }

  .card-wrapper.isModal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .card-container {
    overflow-y: auto;
    align-items: stretch;
  }

  .icon-desktop {
    display: none;
  }

  .icon-mobile {
    display: block;
  }

  .card-header {
    justify-content: space-between;
    padding: 0 var(--spacing-small);
    padding-top: var(--spacing-small);
    padding-bottom: var(--spacing-xsmall);
    width: inherit;
    align-items: center;
  }

  hr {
    display: block;
    width: 100%;
  }

}
</style>

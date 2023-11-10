<template>
  <div class="card-wrapper" :class="{ isModal }">
      <div class="card-container" :style="{ padding: customPadding }">
          <div class="card-header">
              <BodyMedium class="main-title">{{ title }}</BodyMedium>
              <slot name="action">
                <ButtonLink class="icon-desktop" @click="$emit('close')" v-if="hasAction" type="x" onlyIcon>
                </ButtonLink>
                <ButtonLink class="icon-mobile" size="large" @click="$emit('close')" v-if="hasAction" type="x" onlyIcon>
                </ButtonLink>
              </slot>
          </div>
          <hr/>
          <div class="card-content">
            <slot name="content"></slot>
          </div>
          <div class="card-footer">
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
    isModal: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  components: {
      Icon,
      ButtonLink,
      BodyMedium
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
    width: 100%;
    height: 100vh;
  }

  .card-wrapper.isModal {
    position: absolute;
    top: 0;
    left: 0;
  }

  .icon-desktop {
    display: none;
  }

  .icon-mobile {
    display: block;
  }

  .card-header {
    justify-content: space-between;
    align-items: center;
  }

  hr {
    display: block;
    margin: var(--spacing-small) calc(var(--spacing-small) * -1);
    margin-top: 6px;
    width: 108%;
  }

}
</style>

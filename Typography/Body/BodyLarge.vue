<script setup>

defineProps({
  b: {
    type: Boolean,
    default: false
  },
  strong: {
    type: Boolean,
    default: false
  },
  italic: {
    type: Boolean,
    default: false
  },
  sub: {
    type: Boolean,
    default: false
  },
  sup: {
    type: Boolean,
    default: false
  },
  i: {
    type: Boolean,
    default: false
  },
  u: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <span class="body-large"
    :class="{ b, strong, italic, sub, sup, i, u }">
    <slot></slot>
  </span>
</template>

<style scoped>
.body-large {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 125%;
}

.b {
  font-weight: 600;
}

.strong {
  font-weight: 600;
}

.italic {
  font-style: italic;
}

.sub {
  font-size: 12px;
  line-height: 100%;
}

.sup {
  font-size: 12px;
  line-height: 100%;
}

.i {
  font-style: italic;
}

.u {
  text-decoration: underline;
}
</style>



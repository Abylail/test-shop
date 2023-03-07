<template>
  <span
    class="base-icon mdi"
    :class="[iconName]"
    :style="[{color: color}, {fontSize: `${size}px`}, {maxHeight: `${size}px`}]"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: "BaseIcon",
  props: {
    size: {
      type: String,
      default: "24"
    },
    color: {
      type: String,
      default: "black"
    }
  },
  computed: {
    // Название иконки
    iconName() {
      return this.$slots.default?.[0]?.text.trim();
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@mdi/font/css/materialdesignicons.min.css";
.base-icon {
  display: inline-block;
  color: black;
}
</style>

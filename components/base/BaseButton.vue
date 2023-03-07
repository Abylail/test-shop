<template>
  <button
    class="base-button"
    :class="[`base-button--type-${type}`, {'base-button--full-width': fullWidth}]"
    v-on="$listeners"
  ><slot/></button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String,
      default: "default",
      validator: val => ["default","primary", "no-background"].includes(val),
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-button {
  display: block;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  padding: 8px;
  transition: $transition--fast;
  font-size: 14px;
  line-height: 16px;
  &:hover {opacity: .8}
  &:active {opacity: .7}

  // Типы кнопок
  &--type-primary {
    background-color: $color--blue;
    color: white;
  }

  &--type-default {
    border: 1px solid $color--gray;
  }

  &--type-no-background {
    background: none;
  }

  // Доп опции
  &--full-width {
    width: 100%;
  }

}
</style>

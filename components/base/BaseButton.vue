<template>
  <button
    class="base-button"
    :class="[`base-button--type-${type}`, `base-button--size-${size}`, {'base-button--full-width': fullWidth}]"
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
      validator: val => ["default","primary","red-outlined","no-background"].includes(val),
    },
    size: {
      type: String,
      default: "middle",
      validator: val => ["big", "middle"].includes(val),
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

  &--type-red-outlined {
    color: $color--red;
    background: transparent;
    border: 1px solid $color--red;
    &:hover {
      background: $color--red;
      color: white;
    }
  }

  // Размеры
  &--size-middle {
    font-size: 14px;
    line-height: 16px;
    padding: 8px;
  }
  &--size-big {
    font-size: 18px;
    line-height: 20px;
    padding: 12px;
  }

  // Доп опции
  &--full-width {
    width: 100%;
  }

}
</style>

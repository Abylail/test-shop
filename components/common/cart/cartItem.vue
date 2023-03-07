<template>
  <div class="cart-item">
    <div class="cart-item__image" :style="{backgroundImage: `url(${product.image})`}"/>
    <div class="cart-item__name">{{ product.title }}</div>
    <div class="cart-item__price">{{ product.price }}</div>
    <div class="cart-item__count">{{ info.count }}</div>
    <div class="cart-item__sum">{{ sum }}</div>
    <div class="cart-item__delete"></div>
  </div>
</template>

<script>
export default {
  name: "cartItem",
  props: {
    info: {
      type: Object,
      require: false
    }
  },
  computed: {
    // Информация о продукте
    product() {
      return this.info.product || {};
    },

    // Общая сумма
    sum() {
      return 10;
    }
  }
}
</script>

<style scoped>

</style>

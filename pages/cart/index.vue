<template>
  <div class="cart">
    <h1 class="cart__title">Корзина</h1>

    <div class="cart__list">
      <cart-item
        v-for="cartItem in cartList" :key="cartItem.product.product_code"
        :info="cartItem"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CartItem from "~/components/common/cart/cartItem.vue";

export default {
  name: "index",
  components: {CartItem},
  computed: {
    ...mapGetters({
      cartList: "account/cart/getList",
    }),
  }
}
</script>

<style lang="scss" scoped>
.cart {

  &__title {
    margin: 0;
    font-size: 30px;
  }

}
</style>

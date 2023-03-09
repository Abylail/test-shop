<template>
  <div class="my-orders" v-if="myOrders.length">
    <h2 class="my-orders__title">Мои заказы</h2>

    <!-- Список -->
    <div class="my-orders__list" v-for="(orders, index) in myOrders" :key="index">
      <div class="my-orders__subtitle">Заказ {{ index + 1 }}</div>
      <cart-item
        v-for="order in orders" :key="order.product.product_code"
        :info="order" old
      />
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/common/cart/cartItem.vue";
import {mapGetters} from "vuex";

export default {
  name: "myOrders",
  components: {CartItem},
  computed: {
    ...mapGetters({
      myOrders: "account/myOrders/getList",
    })
  }
}
</script>

<style lang="scss" scoped>
.my-orders {

  &__title {
    margin: 40px 0;
    font-size: 30px;
  }

  &__subtitle {
    margin: 20px 0;
    font-size: 20px;
  }

}
</style>

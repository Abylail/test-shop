<template>
  <div class="cart">

    <!-- Старые заказы -->
    <slide>
      <my-orders v-if="myOrders.length"/>
    </slide>

    <h1 class="cart__title">Корзина</h1>
    <!-- Если корзина не пустая -->
    <div v-if="cartList.length" class="cart__content">
      <!-- Список -->
      <div class="cart__list">
        <cart-item
          v-for="cartItem in cartList" :key="cartItem.product.product_code"
          :info="cartItem"
        />
      </div>
      <!-- Оплата и сумма -->
      <div class="cart__pay">
        <div class="cart__pay-sum">К оплате {{ overallSum }} ₸</div>
        <base-button type="primary" size="big" @click="payHandle()">Оплатить</base-button>
      </div>
    </div>

    <!-- Если пусто -->
    <div class="cart__empty" v-else>
      <div class="cart__empty-title">Корзина пуста</div>
      <base-button class="cart__empty-button" size="big" type="primary" @click="goMain()">Перейти к покупкам <base-icon size="20" color="white">mdi-cart-variant</base-icon></base-button>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CartItem from "~/components/common/cart/cartItem.vue";
import Slide from "@/components/transitions/Slide.vue";
import MyOrders from "@/components/common/cart/myOrders.vue";

export default {
  name: "index",
  components: {MyOrders, Slide, CartItem},
  computed: {
    ...mapGetters({
      cartList: "account/cart/getList",
      myOrders: "account/myOrders/getList",
    }),

    // Общая сумма
    overallSum() {
      return this.cartList.reduce((acc, item) => acc + item.product.price*item.count, 0);
    }
  },
  methods: {
    ...mapActions({
      _addOrder: "account/myOrders/addOrder",
      _fetchOrder: "account/myOrders/fetchList",
      _clearCart: "account/cart/clear"
    }),

    // Перейти на главную
    goMain() {
      this.$router.push("/")
    },

    // Оплатить
    payHandle() {
      this._addOrder(this.cartList);
      this._clearCart();
    },
  },
  mounted() {
    this._fetchOrder();
  }
}
</script>

<style lang="scss" scoped>
.cart {

  &__title {
    margin: 40px 0;
    font-size: 30px;
  }

  &__subtitle {
    margin: 20px 0;
    font-size: 20px;
  }

  &__content {
    margin-top: 20px;
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 100px;
    font-size: 24px;
  }

  &__empty-button {
    margin-top: 10px;
  }

  &__pay-sum {
    margin-right: 10px;
    font-size: 20px;
    font-weight: bold;
  }

  &__pay {
    text-align: right;
    & > * {display: inline-block}
  }

}
</style>

<template>
  <header class="main-header" :class="{'main-header--mobile': $isMobile}">
    <div class="main-header__content container">
      <div class="main-header__left">
        <div class="main-header__logo" @click="goMain()">
          <base-icon class="main-header__logo-image" size="30">mdi-image-filter-drama-outline</base-icon> Cloud shop logo
        </div>
      </div>
      <div class="main-header__right">
        <button class="main-header__cart" @click="goCart()">
          <span class="main-header__cart-count" v-if="cartCount">{{ cartCount }}</span>
          <base-icon>mdi-cart-outline</base-icon>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "mainHeader",
  computed: {
    ...mapGetters({
      cartCount: "account/cart/getCount",
    })
  },
  methods: {
    // Перейти в корзину
    goCart() {
      this.$router.push("/cart");
    },

    // Перейти на главную
    goMain() {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.main-header {
  position: sticky;
  top: 0;
  padding: 20px 0;
  border-bottom: 1px solid #b4b4b4;
  background: white;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    line-height: 24px;
  }

  &__logo-image {
    display: inline-block;
    margin-right: 5px;
  }

  &__cart {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 50px;
    &:hover {background: $color--light-gray}
  }

  &__cart-count {
    display: inline-block;
    margin-right: 5px;
  }

}
</style>

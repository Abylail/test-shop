<template>
  <div class="product-item">
    <div class="product-item__image" :style="{backgroundImage: `url(${info.image})`}"/>
    <div class="product-item__info">
      <div class="product-item__title">{{ info.title }}</div>
      <div class="product-item__price">{{ info.price }} ₸</div>
      <div class="product-item__tools">

        <base-button class="product-item__cart" v-if="!isInCart" type="primary" full-width @click="addCartHandle()">В корзину</base-button>
        <base-button class="product-item__cart" v-else type="default" full-width @click="goCart()">В корзину</base-button>

        <base-button type="no-background" @click="toggleFavoriteHandle()">
          <base-icon v-if="!isFavorite" color="gray" size="20" key="no">mdi-heart-outline</base-icon>
          <base-icon v-else color="red" size="20" key="yes">mdi-heart</base-icon>
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "productItem",
  props: {
    info: {
      type: Object,
      require: true
    },
  },
  computed: {
    ...mapGetters({
      cartCodes: "account/cart/getCodes",
      favoriteCodes: "account/favorite/getCodes",
    }),
    // Выбран ли продукт
    isFavorite() {
      return this.favoriteCodes.includes(this.info.product_code);
    },

    // В корзине
    isInCart() {
      return this.cartCodes.includes(this.info.product_code);
    },
  },
  methods: {
    ...mapActions({
      _addCart: "account/cart/add",
      _addFavorite: "account/favorite/add",
      _removeFavorite: "account/favorite/remove",
    }),

    // В избранное
    toggleFavoriteHandle() {
      if (!this.isFavorite) this._addFavorite(this.info);
      else this._removeFavorite(this.info);
    },

    // В корзину
    addCartHandle() {
      this._addCart(this.info);
    },

    // Перейти а корзину
    goCart() {
      this.$router.push("/cart");
    },
  }
}
</script>

<style lang="scss" scoped>
.product-item {
  padding: 10px;
  background: white;
  border-radius: 4px;
  margin: 10px 10px 10px 0;
  width: 100%;
  max-width: 200px;

  &__image {
    height: 150px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("https://www.technodom.kz/images/global/product-card-thumbnail.jpg");
  }

  &__title {
    margin-top: 10px;
  }

  &__price {
    margin-top: 10px;
    font-weight: bold;
  }

  &__tools {
    display: grid;
    grid-template-columns: 1fr 50px;
    margin-top: 10px;
  }
}
</style>

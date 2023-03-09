<template>
  <div class="cart-item" :class="{'cart-item--mobile': $isMobile}">
    <div class="cart-item__image" :style="{backgroundImage: `url(${product.image})`}"/>
    <div class="cart-item__name">{{ product.title }}</div>
    <div class="cart-item__price">{{ product.price }} ₸</div>
    <div class="cart-item__count">
      <div class="cart-item__count-wrapper">
        <button class="cart-item__count-input-arrow" @click="decreaseCount()"><base-icon>mdi-minus</base-icon></button>
        <input class="cart-item__count-input" :value="info.count" type="number" @input="inputCount($event.target.value)"/>
        <button class="cart-item__count-input-arrow" @click="increaseCount()"><base-icon>mdi-plus</base-icon></button>
      </div>
    </div>
    <div class="cart-item__sum">{{ sum }} ₸</div>
    <div class="cart-item__delete">
      <base-button type="red-outlined" @click="deleteHandle()">Удалить</base-button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "cartItem",
  props: {
    info: {
      type: Object,
      require: false
    },
    old: { // Старый заказ?
      type: Boolean,
      default: false
    }
  },
  computed: {
    // Информация о продукте
    product() {
      return this.info.product || {};
    },

    // Общая сумма
    sum() {
      return this.info.count * this.product.price;
    }
  },
  methods: {
    ...mapActions({
      _delete: "account/cart/remove",
      _setCount: "account/cart/setCount",
    }),

    // Удалить (Кнопка)
    deleteHandle() {
      this._delete(this.product);
    },

    // Изменить колличество
    inputCount(count) {
      if (count <= 0) this._delete(this.product);
      else this._setCount({product: this.product, count})
    },

    // Увеличить колличество
    increaseCount() {
      this.inputCount(+this.info.count+1);
    },

    // Уменшить колличество
    decreaseCount() {
      this.inputCount(this.info.count-1);
    },
  }
}
</script>

<style lang="scss" scoped>
.cart-item {
  display: grid;
  grid-template-columns: 100px 4fr 1fr 140px 1fr 100px;
  grid-column-gap: 20px;
  height: 100px;
  margin-top: 20px;

  & > * {
    display: inline-grid;
    align-items: center;
  }

  &--mobile {
    display: grid;
    grid-template-columns: 140px 1fr 100px;
    grid-row-gap: 10px;
    margin: 40px 0;
  }

  &__image {
    height: 100%;
    width: 100px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  &__count-wrapper {
    display: flex;
    flex-direction: row;
    border-radius: 5px;
    overflow: hidden;
  }

  &__count-input-arrow {
    background: white;
  }

  &__count-input {
    width: min-content;
    max-width: 50px;
    padding: 10px;
    border: none;
    text-align: center;
    outline: none;
    appearance: textfield;
  }

}
</style>

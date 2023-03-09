<template>
  <div class="favorite">
    <h1 class="favorite__title">Избранные</h1>

    <div class="favorite__list" v-if="favoriteList.length">
      <product-item
        v-for="item in favoriteList" :key="item.product_code"
        :info="item"
      />
    </div>

    <div class="favorite__empty" v-else>
      <div class="favorite__empty-title">Избранные отсутсвуют</div>
      <base-button class="favorite__empty-button" size="big" type="primary" @click="goMain()">Перейти к товарам</base-button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ProductItem from "@/components/common/list/productItem.vue";

export default {
  name: "favorite",
  components: {ProductItem},
  computed: {
    ...mapGetters({
      favoriteList: "account/favorite/getList",
    })
  },
  methods: {
    // Перейти на главную
    goMain() {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.favorite {

  &__title {
    margin: 40px 0;
    font-size: 30px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
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

}
</style>

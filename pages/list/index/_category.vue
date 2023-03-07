<template>
  <div class="product-list">
    <product-item
      v-for="product in products" :key="product.product_code"
      :info="product"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ProductItem from "~/components/common/list/productItem.vue";

export default {
  components: {ProductItem},
  computed: {
    ...mapGetters({
      products: "product/list/getList",
    }),

    // Код категории (из урла)
    category() {
      return this.$route.params.category;
    },
  },
}
</script>

<style lang="scss" scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
</style>

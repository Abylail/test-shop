<template>
  <div class="list-layout">
    <category-navigator/>
    <div class="list-layout__main">
      <div class="list-layout__head">
        <h1 class="list-layout__title">{{ categoryTitle }}</h1>
<!--        <div class="list-layout__description"></div>-->
        <div class="list-layout__filter">

        </div>
      </div>
      <nuxt-child/>
    </div>
  </div>
</template>

<script>
import CategoryNavigator from "~/components/common/list/categoryNavigator.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "index",
  components: {CategoryNavigator},
  data: () => ({
    // Поисковый текст
    searchText: null,

    isLoading: false,
  }),
  computed: {
    ...mapGetters({
      categoryInfo: "category/single/getInfo",
      productList: "product/list/getList",
    }),

    // Код категории (из урла)
    category() {
      if (this.isAll) return null;
      return this.$route.params.category;
    },

    // Тайтл категории
    categoryTitle() {
      if (this.isAll) return "Все категории";
      return this.categoryInfo?.title;
    },

    // Все категории ?
    isAll() {
      return this.$route.params.category === "all";
    },
  },
  watch: {
    // Запрашиваю катгорию на изменение (включая инициализацию)
    category: {
      handler() {
        this.categoryInit();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      fetchCategory: "category/single/fetchInfo",
      _searchProducts: "product/list/searchProducts",
    }),

    // Инициализация категории
    categoryInit() {
      this.searchText = null;
      this.fetchCategory(this.category);
      this.searchProducts()
    },

    // Поиск продуктов
    searchProducts() {
      this._searchProducts({
        categoryCode: this.category,
        searchText: this.searchText,
      })
    }
  },

  // Перехожу во все категории если не выбрано
  middleware({ redirect, route }) {
    if (!route.params.category) redirect(301, "/list/all");
  },
}
</script>

<style lang="scss" scoped>
.list-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-column-gap: 100px;

  &__title {
    margin: 0;
    font-size: 30px;
  }

  &__description {
    color: $color--gray;
  }
}
</style>

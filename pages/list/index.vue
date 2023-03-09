<template>
  <div class="list-layout" :class="{'list-layout--mobile': $isMobile}">
    <category-navigator/>
    <div class="list-layout__main">
      <div class="list-layout__head">
        <h1 class="list-layout__title">{{ categoryTitle }}</h1>

        <!-- Блок фильтров -->
        <div class="list-layout__filter">
          <input class="list-layout__filter-input" placeholder="Поиск по названию" :value="searchText" @input="searchProducts($event.target.value)"/>
          <div class="list-layout__filter-sort">
            <div>Сортировать:</div>
            <div class="list-layout__filter-sort-chip" :class="{active: code === sortBy}"
                 v-for="(sort, code) in sortEnum" :key="code"
                 @click="selectSort(code)"
            >{{ sort.title }}</div>
          </div>
        </div>

      </div>
      <nuxt-child/>
    </div>
  </div>
</template>

<script>
import CategoryNavigator from "~/components/common/list/categoryNavigator.vue";
import {mapActions, mapGetters} from "vuex";
import {sortEnum} from "@/store/product/list";

export default {
  name: "index",
  components: {CategoryNavigator},
  data: () => ({
    // Поисковый текст
    searchText: null,

    // Сортировка по
    sortBy: "default",

    // Сортировки
    sortEnum,

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
      this.searchProducts();
    },

    // Поиск продуктов
    searchProducts(searchText = null) {
      this.searchText = searchText;
      this._searchProducts({
        categoryCode: this.category,
        searchText: this.searchText,
        sortBy: this.sortBy
      })
    },

    // Сортировать по (кнопка)
    selectSort(code) {
      this.sortBy = code;
      this.searchProducts(this.searchText);
    },
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

  &--mobile {
    display: block;
  }

  &__title {
    margin: 0;
    font-size: 30px;
  }

  &__description {
    color: $color--gray;
  }

  &__filter {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    margin: 10px 0;
  }

  &--mobile .list-layout__filter {
    display: block;
  }

  &__filter-input {
    border: none;
    border-radius: 5px;
    padding: 10px;
    outline: none;
    width: calc(100% - 20px);
  }

  &__filter-sort {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__filter-sort-chip {
    padding: 3px 5px;
    margin: 0 3px;
    cursor: pointer;
    &.active {
      background: $color__blue;
      color: white;
    }
  }
}
</style>

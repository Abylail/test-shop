<template>
  <aside class="category-navigator">

    <!-- Все категории -->
    <nuxt-link class="category-navigator__link" to="/list/all">Все</nuxt-link>

    <!-- Список категорий -->
    <nuxt-link
      class="category-navigator__link"
      v-for="category in categories" :key="category.code"
      :to="`/list/${category.code}`"
    >{{ category.title }}</nuxt-link>

  </aside>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "categoryNavigator",
  computed: {
    ...mapGetters({
      categories: "category/list/getList",
    })
  },
  methods: {
    ...mapActions({
      fetchCategories: "category/list/fetchList",
    })
  },
  mounted() {
    this.fetchCategories()
  }
}
</script>

<style lang="scss" scoped>
.category-navigator {
  margin-top: 10px;
  background: white;
  border-radius: 4px;
  padding: 10px;
  height: min-content;

  &__link {
    display: block;
    padding: 10px;
    margin: 5px 0;
    border-radius: 4px;
    text-decoration: none;
    color: black;
    transition: $transition--fast;

    &.nuxt-link-active {
      background: rgba(229, 227, 227, 0.55);
    }
    &:hover {background: #BBBBBB8C;}
  }

}
</style>

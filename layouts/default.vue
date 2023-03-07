<template>
  <div class="default-layout">
    <main-header/>

    <main class="default-layout__main container">
      <Nuxt/>
    </main>

  </div>
</template>

<script>
import MainHeader from "~/components/common/layout/mainHeader.vue";
import {mapActions} from "vuex";

export default {
  name: "default",
  components: {MainHeader},
  methods: {
    ...mapActions({
      initCart: "account/cart/fetchList",
      initFavorite: "account/favorite/fetchList",
    })
  },
  mounted() {
    this.initCart();
    this.initFavorite();
  }
}
</script>

<style lang="scss" scoped>
.default-layout {

  &__main {
    padding-top: 10px;
  }

}
</style>

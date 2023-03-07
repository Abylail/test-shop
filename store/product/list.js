import products from "@/config/products.json";

export const state = () => ({
  // Список продуктов
  list: null,
})

export const getters = {
  // Список продуктов
  getList: state => state.list || [],
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Поиск продуктов
  searchProducts({ commit }, {categoryCode, searchText}) {
    // Поиск по типа базе
    const result = products.filter(product => {
      console.log(categoryCode);
      if (categoryCode && product.category_code !== categoryCode) return false;
      if (searchText && product.title.toLowerCase().includes(searchText)) return false;
      return true;
    });

    console.log(result);

    commit("set", ["list", result]);
  },
}

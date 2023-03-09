import products from "@/config/products.json";

export const sortEnum = Object.freeze({
  default: {title: "Все", code: "default"},
  cheap: {title: "Дешевые", code: "cheap"},
  orders: {title: "Количество заказов", code: "orders"}
})


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
  searchProducts({ commit }, {categoryCode, searchText, sortBy}) {
    const searchTextLower = searchText?.toLowerCase() || null;
    // Поиск по типа базе
    const result = products
      .filter(product => {
        if (categoryCode && product.category_code !== categoryCode) return false;
        if (searchText && !product.title.toLowerCase().includes(searchTextLower)) return false;
        return true;
      })
      .sort((p1, p2) => {
        if (sortBy === sortEnum.cheap.code) return p1.price - p2.price;
        if (sortBy === sortEnum.orders.code) return p1.order_count - p2.order_count;
        return 0;
      })

    commit("set", ["list", result]);
  },
}

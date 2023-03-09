export const state = () => ({
  // Список продуктов корзины
  list: [],
})

export const getters = {
  // Список избранных
  getList: state => state.list || [],

  // Колличество избранных
  getCount: state => state.list.length,

  // Список кодов избранных
  getCodes: state => (state.list || []).map(({product_code}) => product_code)
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  },

  // Добавить
  add(state, product) {
    state.list = [...state.list, product];
  },

  // Добавить
  remove(state, product) {
    let newList = state.list.slice();
    const productIndex = newList.findIndex(({product_code}) => product_code === product.product_code)
    if (productIndex >= 0) {
      newList.splice(productIndex, 1)
      state.list = newList;
    }
  },
}

export const actions = {

  // Достать список
  fetchList({ commit }) {
    let list = null;
    try {
      list = JSON.parse(this.$storage.favorite.get())
    } catch (e) {}

    if (list) commit("set", ["list", list]);
  },

  // Добавить
  add({ commit, dispatch }, product) {
    commit("add", product);
    dispatch("_save")
  },

  // Добавить
  remove({ commit, dispatch }, product) {
    commit("remove", product);
    dispatch("_save")
  },

  // Сохранить
  _save({ state }) {
    this.$storage.favorite.set(JSON.stringify(state.list));
  }
}

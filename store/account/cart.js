export const state = () => ({
  // Список продуктов корзины
  list: [],
})

export const getters = {
  // Список продуктов корзины
  getList: state => state.list || [],

  // Колличество
  getCount: state => state.list.length,

  // Список кодов продуктов в корзине
  getCodes: state => (state.list || []).map(({product: {product_code}}) => product_code)
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  },

  // Добавить
  add(state, product) {
    state.list = [...state.list, {product, count: 1}];
  },

  // Изменить колличество
  setCount(state, {productCode, count}) {
    let newList = state.list.slice();
    const productIndex = newList.findIndex(({product}) => product.product_code === productCode);
    if (productIndex >= 0) {
      newList[productIndex] = {...newList[productIndex], count}
    }
    state.list = newList;
  },

  // Удалить
  remove(state, {product_code}) {
    state.list = state.list.filter(({product}) => product.product_code !== product_code)
  },
}

export const actions = {

  // Достать список
  fetchList({ commit }) {
    let list = null;
    try {
      list = JSON.parse(this.$storage.cart.get())
    } catch (e) {}

    if (list) commit("set", ["list", list]);
  },

  // Добавить
  add({ commit, dispatch }, product) {
    commit("add", product);
    dispatch("_save")
  },

  // Добавить
  setCount({ commit, dispatch, state }, {product, count}) {
    commit("setCount", {productCode: product.product_code, count});
    dispatch("_save");
  },

  // Удалить
  remove({ commit, dispatch }, product) {
    commit("remove", product);
    dispatch("_save")
  },

  // Очистить корзину
  clear({ commit, dispatch }) {
    commit("set", ["list", []]);
    dispatch("_save")
  },

  // Сохранить
  _save({ state }) {
    this.$storage.cart.set(JSON.stringify(state.list));
  }
}

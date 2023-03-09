export const state = () => ({
  // Список моих заказов
  list: [],
})

export const getters = {
  // Список моих заказов
  getList: state => state.list || [],
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  },

  // Добавить
  add(state, order) {
    state.list = [...state.list, order];
  },
}

export const actions = {

  // Достать список
  fetchList({ commit }) {
    let list = null;
    try {
      list = JSON.parse(this.$storage.myOrders.get())
    } catch (e) {}

    if (list) commit("set", ["list", list]);
  },

  // Добавить заказ
  addOrder({ commit, dispatch }, order) {
    console.log(order);
    commit("add", order);
    dispatch("_save");
  },

  // Сохранить
  _save({ state }) {
    this.$storage.myOrders.set(JSON.stringify(state.list));
  }
}

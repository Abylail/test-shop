import categories from "@/config/categories.json"

export const state = () => ({
  // Список категорий
  list: null,
})

export const getters = {
  // Список категорий
  getList: state => state.list || [],
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Запросить список категорий (типа api)
  fetchList({ commit }) {
    commit("set", ["list", categories]);
  }
}

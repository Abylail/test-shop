import categories from "@/config/categories.json";

export const state = () => ({
  // Категорий
  info: null,
})

export const getters = {
  // Список категорий
  getInfo: state => state.info || {},
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Запросить категорию (типа api)
  fetchInfo({ commit }, code) {
    const category = categories.find(_category => _category.code === code);
    commit("set", ["info", category]);
  }
}

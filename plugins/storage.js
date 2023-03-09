/**
 * HOW TO USE
 * this.$storage.userToken.get() to get user_token
 * this.$storage.userToken.set(<some value>) to set user_token
 * this.$storage.userToken.remove() to remove user_token
 */


/**
 * Создание инструмента
 * @param serviceName {string}
 * */
const createTool = serviceName => ({
  get: () => localStorage.getItem(serviceName),
  remove: () => {},
  set: (value, options = {}) => localStorage.setItem(serviceName, value),
})

// Сюда вписать куку для использования
const createTools = () => ({
  cart: createTool("cart"),
  favorite: createTool("favorite"),
  myOrders: createTool("myOrders"),
})

export default({  }, inject) => {
    inject("storage", createTools());
}

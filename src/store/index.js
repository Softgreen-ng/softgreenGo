  import { createStore } from 'vuex'

const cart = JSON.parse(localStorage.getItem("cart")) ?? {}
export default createStore({
  state: {
    user: {},
    products: [],
    cart,
    orders:[],
    categories:[],
    order:{},
    zones:[]
  },
  mutations: {
    update(state, {value, name}){
      state[name] = value
    },
    updateCart(state, cart){
      state.cart = cart
      localStorage.setItem("cart", JSON.stringify(cart))
    },
    updateAttr(state, { parent, name, value}){
      state[parent][name] = value
    },
    updateLocalObject(state, {name, value}){
      state[name] = value
      localStorage.setItem(name, JSON.stringify(value))
    },
    login(state, user){
      state.user = user
      localStorage.setItem("token", user.token)
    },
    logout(){
      localStorage.clear()
    },
    delete(state, object){
      state[object.object][object.index] = null
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    auth() {
      return localStorage.getItem("token")
    },
    order(){
      return JSON.parse(localStorage.getItem("order"))
    },
    totalPrice(state){
      let sum = 0
      let allSelectedProduct = Object.entries(state.cart)
      allSelectedProduct.forEach((e) => {
        sum += (e[1].price * e[1].quantity)
      })

      return sum
    }
  }
})

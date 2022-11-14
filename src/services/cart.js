import store from "../store"

export const AddOrUpdateCart = ({ id, title, price, weight, unit, status}, quantity) => {
    let currentCart = store.state.cart
    let product = { id, title, price, weight, unit, status}
    if(currentCart[product.id])
        currentCart[product.id].quantity = quantity
    else {
        currentCart[product.id] = {...product, quantity}
    }

    store.commit('updateCart', currentCart)
}

export const deleteCartProduct = (product_id) => {
    let currentCart = store.state.cart
    delete(currentCart[product_id])
    store.commit('updateCart', currentCart)
}
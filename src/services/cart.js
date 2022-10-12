import store from "../store"

export const AddOrUpdateCart = (product, quantity) => {
    let currentCart = store.state.cart
    
    if(currentCart[product.id])
        currentCart[product.id].quantity = quantity
    else
        currentCart[product.id] = {...product, quantity}

    store.commit('updateCart', currentCart)
}

export const deleteCartProduct = (product_id) => {
    let currentCart = store.state.cart
    delete(currentCart[product_id])
    store.commit('updateCart', currentCart)
}
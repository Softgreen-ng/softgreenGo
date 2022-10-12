import http from "./http"
import store from "../store"

export const getOrders = (formdata) => {
    return http.get("order", { params: { ...formdata } })
        .then((response) => {
            store.commit('update', {
                name: "orders",
                value: response.data.orders
            })
            return response
        })

}

export const createOrder = (formdata) => {
    return http.post('order', formdata, {
        transformRequest: [(data, headers) => {
            headers["Content-Type"] = "multipart/formdata"
            return data
        }]
    })
    .then(() => {

    })
}
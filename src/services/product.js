import http from "./http"
import store from "../store";

export const getProducts = (formdata) => {
    return http.get('post', {params:{ ...formdata}})
    .then((response) => {
        store.commit('update',{
            name:"products",
            value: response.data.products.data
        })
        store.commit('update',{
            name:"totalProducts",
            value: response.data.products.total
        })
        return response;
    })
}

export const getTemporaryProducts = (formdata) => {
    return http.get('post', {params:{ ...formdata}})
    .then((response) => {
        const product = [...store.state.products , ...response.data.products.data]
        store.commit('update',{
            name:"products",
            value:product
        })
        return response.data.products;
    })
}

export const getZones = (formdata) => {
    return http.get('zone', {params:{ ...formdata}})
    .then((response) => {
        store.commit('update',{
            name:"zones",
            value: response.data.zones
        })
        return response;
    })
}

export const getSingleProduct = (id, formdata) => {
    return http.get(`post/${id}`, {params:{ ...formdata}})
    .then((response) => {
        return response;
    })
}

export const getCategories = (formdata) => {
    return http.get('category', { ...formdata})
    .then((response) => {
        store.commit('update',{
            name:"categories",
            value: response.data.categories
        })
        return response;
    })
}

export const requestProduct = (formdata) => {
    return http.post('request', {...formdata})
    .then((response) => {
        return response
    })
}
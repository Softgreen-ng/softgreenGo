import http from "./http"
import store from "../store";

const location = { location_id: store.getters.location }
const flatPrice = (products) => {
    console.log(products)
    let newProducts = []
    products.forEach(product => {
        // console.log(product)
        let price = { ...product }.price[0]
        delete (product.price)
        product = { ...price, ...product }
        newProducts.push(product)
        return product;
    });
    console.log(newProducts)
    return newProducts
}

export const getProducts = (formdata) => {
    return http.get('post', { params: { ...formdata, ...location } })
        .then((response) => {
            const productData = flatPrice(response.data.products.data)
            store.commit('update', {
                name: "products",
                value: productData
            })
            store.commit('update', {
                name: "totalProducts",
                value: response.data.products.total
            })
            return response;
        })
}

export const getTemporaryProducts = (formdata) => {
    return http.get('post', { params: { ...formdata, ...location } })
        .then((response) => {
            const productData = flatPrice(response.data.products.data)
            const product = [...store.state.products, ...productData]
            store.commit('update', {
                name: "products",
                value: product
            })
            return response.data.products;
        })
}

export const getZones = (formdata) => {
    return http.get('zone', { params: { ...formdata, ...location } })
        .then((response) => {
            store.commit('update', {
                name: "zones",
                value: response.data.zones
            })
            return response;
        })
}

export const getSingleProduct = (id, formdata) => {
    return http.get(`post/${id}`, { params: { ...formdata, ...location } })
        .then((response) => {
            let product = response.data.product
            let price = { ...product }.price[0]
            delete (product.price)
            response.data.product = { ...price,...product  }
            return response;
        })
}

export const getCategories = (formdata) => {
    return http.get('category', { ...formdata })
        .then((response) => {
            store.commit('update', {
                name: "categories",
                value: response.data.categories
            })
            return response;
        })
}

export const requestProduct = (formdata) => {
    return http.post('request', { ...formdata })
        .then((response) => {
            return response
        })
}
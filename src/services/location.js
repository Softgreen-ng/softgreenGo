import http from "./http"
import store from "../store"

export const getLocations = (formdata) => {
    return http.get('location',{ ...formdata })
    .then((response) => {
        store.commit('update',{
            name:"locations",
            value: response.data.locations
        })
        return response.data
    })
}

export const createAddress = (formdata) => {
    return http.post('address',{ ...formdata })
    .then((response) => {
        store.commit('update',{
            name:"addresses",
            value: response.data.addresses
        })
        return response.data
    })
}

export const getAddresses = (formdata) => {
    return http.get('address',{ ...formdata })
    .then((response) => {
        store.commit('update',{
            name:"addresses",
            value: response.data.addresses
        })
        return response.data
    })
}

export const deleteAddress = (formdata) => {
    return http.delete('address/'+ formdata.id,{ ...formdata })
    .then((response) => {
        return response.data
    })
}
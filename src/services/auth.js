import http from "./http"
import store from "../store"
// import { getProfile } from "./user"

export const signup = (formdata) => {
    return http.post('register',{ ...formdata })
    .then((response) => {
        if(response.data.errors === false){
            store.commit('login',{ token: response.data.token})
        }
        return response
    })
}

export const login = (formdata) => {
    return http.post('login',{ ...formdata })
    .then((response) => {
        if(response.status == 200){
            const user = {...(response.data.user), token:response.data.access_token}
            store.commit('login', user)
        }
        return response
    })
}

export const recoverPassword = (formdata) => {
    return http.post('password/email',{ ...formdata })
    .then((response) => {
        return response.data
    })
}

export const resetPassword = (formdata) => {
    return http.post('password/reset',{ ...formdata })
    .then((response) => {
        return response.data
    })
}

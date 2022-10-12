import store from "../store"
import http from "./http"

export const getProfile = () => {
    return http.get("user")
    .then((response) => {
        if(response.data){
            store.commit('update', {
                name:"user",
                value: response.data // Add .user in Backend
            })
            return response.data
        }
    })
}
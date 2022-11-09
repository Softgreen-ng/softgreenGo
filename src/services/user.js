import store from "../store"
import http from "./http"

export const getProfile = async () => {
    const response = await http.get("user")
    if (response.data) {
        store.commit('update', {
            name: "user",
            value: response.data // Add .user in Backend
        })
        return response.data
    }
}

export const updateProfile = async (formdata, id) => {
    const response = await http.put("users/" + id, formdata)
    if (response.data.status) {
        store.commit('update', {
            name: "user",
            value: response.data.user // Add .user in Backend
        })
        return response.data
    }
}
import http from "./http"
import store from "../store";

export const getSettings = (formdata) => {
    return http.get('setting', { params:{ ...formdata} })
    .then((response) => {
        store.commit('update',{
            name:"settings",
            value: response.data.settings
        })
        return response;
    })
}
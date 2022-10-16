import axios from "axios"
import Widget from "@/functions/widget"
import { createToaster } from "@meforma/vue-toaster"
import store from "../store";

const toast = createToaster({
    position: "top",
    maxToasts: 1,
    opacity: .8
});
const url = process.env.VUE_APP_API_HOST
const accessToken = store.getters.auth

const http = axios.create({
    baseURL: url,
    transformRequest: [
        function (data, headers) {
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`
            } else {
                delete headers.Authorization;
            }
            return JSON.stringify(data);
        },
    ],
    headers: {
        "Authorization": "Bearer " + accessToken,
        accept: 'application/json',
        'Content-Type': 'application/json',
    },
    // responseType: "application/json"
})
// "content-type": "application/json",

http.interceptors.request.use((request) => {
    // console.log("Request Successfull", request);
    return request
},
    error => {

        console.error("Request Unuccessfull", error);
    }
);

http.interceptors.response.use((response) => {
    // console.log("Response recieved", response);
    return response;
},
    (error => {
        try{ 
            Widget.dismiss()
        }
        catch(e){
            console.log(e.message)
        }
        
        // console.log("Response Error", error);
        if (error.response) {
            // console.log("Error, Request was made though", error)
            // toast.show('unknown error occured');
        }
        else if (error.request) {
            toast.show("No response recieved");
            // The request was made but no response was received
        }
        else {
            // toast.show(error.message);
        }
        return error;
    })

)

export default http;
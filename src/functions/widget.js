import { useLoading } from 'vue-loading-overlay';
import { createToaster } from "@meforma/vue-toaster";
let load
var toast = createToaster({
    position: "top",
    maxToasts: 1,
    opacity: .8
})
export default class Widget {
    static openLoading = () => {
        load = useLoading().show({
            loader: "dots",
            color: "orange"
        })
        // document.getElementById("loading").classList.remove("d-none")
    }
    static dismiss = () => {
        load.hide()
        // console.log(load)
        // document.getElementById("loading").classList.add("d-none")
    }
    static goTo = (link) => {
        setTimeout(function () {
            this.$router.push(link)
        }, 2000)
    }

    static toast(message, type) {
      if(type == "error"){
        toast.error(message)
        return
      }
      if(type == "success"){
        toast.success(message)
        return
      }
        toast.show(message)
    }
}




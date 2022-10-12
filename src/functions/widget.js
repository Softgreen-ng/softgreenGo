import { useLoading } from 'vue-loading-overlay';
let load

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
        setTimeout(function(){
            this.$router.push(link)
        }, 2000)
    }
}




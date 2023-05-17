<template>
    <div class="d-flex flex-wrap justify-content-center bg-body p-3 mx-3 " style="min-height:h !important;">
        <div class="p-3 p-md-4 bg-white bg-mobile my-5 mx-auto text-center rounded-20" style="">
            <div class="text-sg-secondary w-1 mt-2">
                <b class="h4 font-1-bold">
                    Forgot Your Password
                </b>
            </div>
            <form @submit.prevent="recoverPassword" class="mt-3 px-2 px-md-2 mx-auto w-100" _style="max-width:300px">
                <div class="d-flex flex-wrap justify-content-around w-100">
                    <div class="mt-3 mb-2 form-input">
                        <label class="my-2">
                            Input Your Email Here
                        </label>
                        <input v-model="email" placeholder="Email" type="email"
                            class="btn bg-white text-start form-control font-1 shadow py-3 px-4" required />
                    </div>
                </div>

                <button class="btn btn-sg-primary text-sg-primary ms-2 mt-4 mb-2 p-2 px-5 font-1 fw-bold ">
                    <span class="h6 text-white">
                        Recover
                    </span>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import Widget from "@/functions/widget"
import { recoverPassword } from "@/services/auth"

export default {
    name: '',
    components: {},
    data() {
        return {
            email: ""
        }
    },
    methods: {
        async recoverPassword() {
            Widget.openLoading()
            recoverPassword({
                email: this.email
            })
                .then((res) => {
                    if(!res){
                        this.$toast.show("Could not find account with such email")
                    }
                    console.log("fufu",res)
                    Widget.dismiss()
                    if (res.status == 200) {
                        this.$router.push("recover/sent")
                        return
                    }
                })
                
                .catch((errors) => {
                    console.log("error",errors)
                    // const error = errors.response.data.errors
                    // const msg = error[Object.keys(error)[0]]
                })
        }
    },
    async created() {

    }
}
</script>

<style lang="less" scoped>
/* input:focus, .password:focus{
    border: none !important;
} */
// .form-input {
//     width: 300px;

//     @media(min-width:768px) {
//         width: 40%;
//     }

//     margin-left: 4px;
// }


.text-sm-sm {
    font-size: 1.6vh !important
}

.btn,
label,
div,
span,
input {
    font-size: 11px
}

input {
    .bg-white !important;
}

label {
    .font-1-bold !important
}

// // Pseudo Classes
.text-sm-sm {}

.bg-white {}

.font-1-bold {}
</style>

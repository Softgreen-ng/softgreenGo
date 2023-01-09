<template>
    <div class="d-flex flex-wrap justify-content-center bg-body my-5 mx-3 mx-auto" style="">

        <div class="shadow p-3 px-4 bg-white my-1 mx-auto text-center rounded-20 bg-mobile" style="max-width:400px">
            <img src="../../public/kit/icons/icon.png" style="width:10%" class="my-2" />
            <br>
            <div class="text-sg-secondary w-1 mt-2 ">
                <p class="h4 font-1-bold">
                    Login
                </p>
            </div>
            <form @submit.prevent="login" class="mt-3 px-2  w-100 " _style="max-width:400px">
                <div class="mt-3 mb-2 ">
                    <label class="my-2">
                        Email
                    </label>
                    <input v-model="user.email" placeholder="Example@email.com" type="email"
                        class="_max-300 btn bg-white text-start form-control font-1 shadow py-3 px-4" required="true" />
                </div>

                <div class="mt-3 mb-2 ">
                    <label class="my-2">
                        Password
                    </label>
                    <div class="btn text-start p-0 d-flex form-control font-1 shadow bg-white _max-300 ">
                        <input v-model="user.password" placeholder="********" :type="passconfType"
                            class="btn border-0 shadow-none text-start form-control w-100 border-0 py-3 px-4 "
                            required="true" />
                        <icon icon="ph:eye" width="25" class="my-auto me-3" v-if="passconfType == 'text'"
                            @click="this.passconfType = 'password'" />
                        <icon icon="ph:eye-closed-fill" width="25" class="my-auto me-3" v-else
                            @click="this.passconfType = 'text'" />
                    </div>
                    <div class="text-danger mt-2 text-center text-sm" v-if="isLoginBad" ref="badLogin">
                        * incorrect login credentials
                    </div>
                </div>

                <div class="d-flex justify-content-center mt-5">
                    <button class="btn btn-sg-primary p-2 ms-2 px-4 px-md-5 " id="confirm" type="submit">
                        <div class="font-1-s-bold fs-6 text-sm-sm">
                            login
                        </div>
                    </button>
                </div>

                <div class="mt-5">
                    <span class="small text-gray">
                        Don't have an account ?
                    </span>
                    <br>
                    <span class="text-sg-primary fw-bold small" @click="this.$router.push('/signup')">
                        Sign up
                    </span>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import Widget from "@/functions/widget"
import { login } from "@/services/auth"

export default {
    name: '',
    components: {},
    data() {
        return {
            passconfType: "password",
            user: {},
            isLoginBad: false
        }
    },
    methods: {
        async login() {
            Widget.openLoading()
            try {
                const response = await login(this.user)
                Widget.dismiss()
                if (response.status == 200) {
                    this.$toast.success("Login Successfull")
                    location.href = "./" + ( this.$route.params.continue ?? '' )
                    // return
                }
            }
            catch(e){
                e;
                this.$toast.show("Email or Password Incorrect")
            }
        }
    },
    mounted() { }
}
</script>

<style lang="less" scoped>
/* input:focus, .password:focus{
    border: none !important;
} */
.bg-body {
    // background: url('../../public/kit/vectors/home.svg') no-repeat;
    background-size: 100% 100%;
}

// @media (max-width: 768px) {
.bg-mobile {
    background-color: #ffffff00 !important;
    box-shadow: none !important;
}

// }

label {
    .text-sm-sm
}

.btn,
label,
div,
span,
input {
    font-size: 11px !important
}

label {
    .font-1-bold !important
}

// // Pseudo Classes
.text-sm-sm {}

.font-1-bold {}
</style>

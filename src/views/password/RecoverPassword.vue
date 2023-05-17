<template>
    <div class="d-flex flex-wrap justify-content-center bg-body p-3 mx-3 " style="min-height:h !important;">
        <div class="p-3 p-md-4 bg-white bg-mobile my-5 mx-auto text-center rounded-20" style="">
            <div class="text-sg-secondary w-1 mt-2">
                <b class="h4 font-1-bold">
                    Input your New Password
                </b>
            </div>
            <form @submit.prevent="resetPassword" class="mt-3 px-2 px-md-2 mx-auto w-100" _style="max-width:300px">
                <div class="d-flex flex-wrap justify-content-around w-100">
                    <div class="mt-3 mb-2 form-input">
                        <label class="my-2">
                            New Password
                        </label>
                        <input v-model="password.password" placeholder="**********" type="password"
                            class="btn bg-white text-start form-control font-1 shadow py-3 px-4" required="true" min="6" />
                    </div>
                    <small class="text-sm text-danger" v-if="!isConfirmed">
                        Password does not match
                    </small>

                    <div class="mt-3 mb-2 form-input">
                        <label class="my-2">
                            Confirm Password
                        </label>
                        <input v-model="password.password_confirmation" placeholder="**********" type="password"
                            class="btn bg-white text-start form-control font-1 shadow py-3 px-4" required="true" min="6" />
                    </div>
                </div>

                <button class="btn btn-sg-primary text-sg-primary ms-2 mt-4 mb-2 p-2 px-5 font-1 fw-bold "
                    :disabled="!isConfirmed">
                    <span class="h6 text-white">
                        Reset
                    </span>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import Widget from "@/functions/widget"
import { resetPassword } from "@/services/auth"

export default {
    name: '',
    components: {},
    data() {
        return {
            password: {

            }
        }
    },
    computed: {
        isConfirmed() {
            return this.password.password == this.password.password_confirmation
        }
    },
    methods: {
        resetPassword() {
            Widget.openLoading()
            resetPassword({
                id: this.$route.params.id,
                token: this.$route.params.token,
                ...this.password
            })
                .then((res) => {
                    Widget.dismiss()
                    if (res) {
                        if (res.status == 200) {
                            this.$toast.show("Password changed, You can now log in to your account")
                            this.$route.push("/login")
                        }
                    }
                    this.$toast.show("Password recovery link expired")
                })
                // .catch((err) => {
                //     console.log("err", err)
                // })
        },

    },
    async created() {

    }
}
</script>

<style lang="less" scoped>
/* input:focus, .password:focus{
    border: none !important;
} */
.form-input {
    width: 300px;

    @media(min-width:768px) {
        width: 40%;
    }

    margin-left: 4px;
}

.bg-body {
    // background: url('../../public/kit/vectors/home.svg') no-repeat;
    background-size: 100% 100%;
}

@media (max-width: 768px) {
    .bg-body {
        // background-Image: url('../../public/kit/vectors/welcome-mobile.svg');
    }

    .bg-mobile {
        background-color: #ffffff00 !important;
        box-shadow: none !important;
    }
}

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

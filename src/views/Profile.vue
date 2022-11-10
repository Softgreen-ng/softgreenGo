<template>
    <div class="mx-auto pt-5 px-5 h-100 bg-anger">
        <div class="mx-auto px-md-5 mt-5 text-center">
            <div class="row align-items-center">
                <div class="col-12 col-md-4">
                    <div class="rounded-circle shadow-none text-center mx-auto mb-5 mb-md-0" style="max-width:200px;">
                        <img :src="this.$store.state.user.avatar" class="w-100 text-rt-orange" style="font-size:200px">
                    </div>
                </div>
                <div class="col-12 col-md-8">
                    <div class="row --align-items-center w-100 pt-md-0">
                        <div class="col-12 col-sm-6 mt-3">
                            <div class="">
                                <b class="text-sm">
                                    Name
                                </b>
                                <h6 class="nuinto-bold">
                                    {{ this.$store.state.user.name }}
                                </h6>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 mt-3">
                            <div class="">
                                <b class="text-sm">
                                    Email
                                </b>
                                <h6 class="nuinto-bold">
                                    {{ this.$store.state.user.email }}
                                </h6>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 mt-3">
                            <div class="">
                                <b class="text-sm">
                                    Phone Number
                                </b>
                                <h6 class="nuinto-bold">
                                    {{ this.$store.state.user.phone.whatsapp }}
                                </h6>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 mt-3" v-if="this.$store.state.user.phone.contact">
                            <div class="">
                                <b class="text-sm">
                                    Phone Number
                                </b>
                                <h6 class="nuinto-bold">
                                    {{ this.$store.state.user.phone.contact }}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center d-flex justify-content-center mt-3">
            <div class="btn btn-sg-primary" @click="showChangePassword">
                Change Password
            </div>
            <div class="btn btn-sg-secondary ms-2">
                Update Profile
            </div>
        </div>
        <Dialog v-model:visible="isPasswordToChange">
            <form @submit.prevent="changePassword" class="mt-3 px-2 px-md-2 mx-auto w-100 text-center" _style="max-width:300px">
                <div class="mt-3 mb-2 form-input">
                    <label class="my-2">
                        Old Password
                    </label>
                    <div type="text" class="btn text-start p-0 d-flex font-1 shadow bg-white">
                        <input v-model="user.password" placeholder="*******" :type="passType"
                            class="btn text-start form-control w-100 border-0 py-3 px-4 " required="true" />
                        <icon icon="ph:eye" width="25" class="my-auto me-3" v-if="passType == 'text'"
                            @click="this.passType = 'password'" />
                        <icon icon="ph:eye-closed-fill" width="25" class="my-auto me-3" v-else
                            @click="this.passType = 'text'" />
                    </div>
                </div>
                <div class="mt-3 mb-2 form-input">
                    <label class="my-2">
                        New Password
                    </label>
                    <div type="text" class="btn text-start p-0 d-flex font-1 shadow bg-white">
                        <input v-model="user.password" placeholder="*******" :type="passType"
                            class="btn text-start form-control w-100 border-0 py-3 px-4 " required="true" />
                        <icon icon="ph:eye" width="25" class="my-auto me-3" v-if="passType == 'text'"
                            @click="this.passType = 'password'" />
                        <icon icon="ph:eye-closed-fill" width="25" class="my-auto me-3" v-else
                            @click="this.passType = 'text'" />
                    </div>
                </div>
                <div class="mt-3 mb-2 form-input">
                    <label class="my-2">
                        New Password Confirmation
                    </label>
                    <input v-model="user.password" placeholder="*******" :type="passType"
                        class="btn text-start shadow form-control w-100 border-0 py-3 px-4 " required="true" />
                </div>
                <button type="submit"
                    class="btn btn-sg-secondary text-sg-primary ms-2 mt-4 mb-2 p-2 px-5 font-1 fw-bold ">
                    <span class="h6 text-white">
                        Continue
                    </span>
                </button>
            </form>
        </Dialog>
        </div>
</template>

<script>
import Dialog from "primevue/dialog"

export default {
    name: "Profile",
    components: {
        Dialog
    },
    data() {
        return {
            user:{},
            isPasswordToChange: false
        }
    },
    methods: {
        showChangePassword() {
            this.isPasswordToChange = true
        }
    }
}
</script>

<style scoped>
label {
    font-size:12px;
}
</style>
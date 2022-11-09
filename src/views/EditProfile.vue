<template>
    <div class="d-flex flex-wrap justify-content-center bg-body p-3 mx-3 " style="min-height:h !important;">
        <div class="p-3 p-md-4 bg-white bg-mobile my-5 mx-auto text-center rounded-20" style="">
            <div class="text-sg-secondary w-1 mt-2">
                <b class="h4 font-1-bold">
                    Edit Profile
                </b>
            </div>
            <form @submit.prevent="update" class="mt-3 px-2 px-md-2 mx-auto w-100" _style="max-width:300px">
                <div class="d-flex flex-wrap justify-content-around w-100">
                    <div class="mt-3 mb-2 form-input">
                        <label class="my-2">
                            Email
                        </label>
                        <input v-model="user.email" placeholder="IamSoftgreen@email.com" type="email"
                            class="btn bg-white text-start form-control font-1 shadow py-3 px-4" required="true" />
                    </div>

                    <div class="mt-3 mb-2 form-input">
                        <label class="my-2">
                            Preferred Title
                        </label>
                        <select v-model="user.title" placeholder="IamSoftgreen@email.com" type="email"
                            class="btn bg-white text-start form-control font-1 shadow py-3 px-4" required="true">
                            <option value="MR.">MR.</option>
                            <option value="Miss">Miss.</option>
                            <option value="Mrs.">MRs.</option>
                        </select>
                    </div>

                    <div class="mt-3 mb-2 form-input">
                        <label class="my-2">
                            Full Name
                        </label>
                        <input v-model="user.name" placeholder="Jhon Doe" type="text"
                            class="btn bg-white text-start form-control font-1 shadow py-3 px-4" required="true" />
                    </div>

                    <div class="mt-3 mb-2 form-input">
                        <label class="my-2">
                            Whatsapp Number
                        </label>
                        <input v-model="user.phone.whatsapp" type="tel" inputmode="numeric" minlength="11" maxlength="13"
                            class="btn bg-white text-start form-control font-1 shadow py-3 px-4" />
                    </div>

                    <div class="mt-3 mb-2 form-input">
                        <label class="my-2">
                            Contact Number
                        </label>
                        <input v-model="user.phone.contact" type="tel" inputmode="numeric" minlength="11" maxlength="13"
                            class="btn bg-white text-start form-control font-1 shadow py-3 px-4"/>
                    </div>
                </div>

                <button type="update"
                    class="btn btn-sg-secondary text-sg-primary ms-2 mt-4 mb-2 p-2 px-5 font-1 fw-bold ">
                    <span class="h6 text-white">
                        Update
                    </span>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import Widget from "@/functions/widget"
import { updateProfile, getProfile } from "@/services/user"

export default {
    name: '',
    components: {},
    data() {
        return {
            user: {
                phone: {
                    whatsapp:"",
                    contact:""
                }
            },
            validations: {}
        }
    },
    methods: {
        update() {
            Widget.openLoading()
            updateProfile(this.user, this.user.id)
            .then((data) => {
                Widget.dismiss()
                if(data.status){
                    this.$toast.success("Profile succesfully updated")
                    this.$router.push("/profile")
                    return
                }
                this.$toast.error("User could not be updated")
            })
        }

    },
    async created() {
        getProfile()
        .then(() => {
            this.user = this.$store.state.user
            console.log(this.$store.state.user)
        })
        this.user = this.$store.state.user
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

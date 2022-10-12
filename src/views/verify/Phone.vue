<template>
<div class="d-flex justify-content-center flex-wrap  px-md-0" style="">
    <div class="mx-md-auto w-100 pt-5 px-4 h-100 bg-anger font-1-bold" style="max-width:500px">
        <!-- Alright !<br>
        <span class="">
            we just need to confirm it is really You !
        </span> -->
        
        <div class="mb-4 font-1-bold text-center mx-auto fs-6">
            Kindly input the OTP sent to your phone.<br>
            <div class="small font-1-s-bold" >
                expires in 
                <span class="text-sg-primary fw-bold" >
                    TEN
                </span>
                minutes
            </div>
        </div>
        <div class="w-100" >
            <img src="../../../public/kit/vectors/verify-phone.svg" class="w-100 bg-dange" style="max-width:300px !important"/>
        </div>
        <form  @submit.prevent="verifyPhone" style="">
            <div class="d-flex mt-4" style="">
                <input type="text" v-model="otpCode" placeholder="N1UTVS" class="btn text-start form-control font-1 shadow px-4" required/>
                <button class="btn btn-sg-secondary ms-2 p-2 px-4 px-md-5 font-1-bold fs-1" type="submit">
                    <span class="fs-6">
                        Confirm
                    </span>
                </button>
            </div>
            <div class="text-danger mx-sm5 mt-2 text-sm-sm text-start" v-if="isBadCode">
                * incorrect code
            </div>
        </form>

    </div>
</div>
</template>

<script>
import { verifyPhone } from "@/services/auth"
import Widget from "../../functions/widget"

export default {
    name: '',
    components: {

    },
    data(){
        return {
            otpCode:'',
            isBadCode:false
        }
    },
    methods: {
        verifyPhone(){
            Widget.openLoading()
            verifyPhone({
                otp_code : this.otpCode,
                instance_id: this.$route.params.instanceId
            })
            .then((responseData) => {
                Widget.dismiss()
                if(responseData.success) {
                    this.$toast.success("Phone number verified")
                    this.$router.push("/welcome")
                }
                else { 
                    this.$toast.error(responseData.data.otp_code ?? "OTP not valid")
                    this.isBadCode = true
                }
            })
        }
    },
    
}
</script>

<style>

</style>

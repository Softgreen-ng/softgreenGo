<template>
    <div class="">
        <h4 class="text-center text-sg-secondary mt-5">
            You're paying ₦{{ this.$store.getters.order.delivery.price + this.$store.getters.totalPrice }}
        </h4>
        <div class="d-flex justify-content-center px-5 py-2 text-sm">
            <div class="shadow-sm p-3 rounded-20 font-1 text-sg-primary me-4">Payment by Transfer</div>
            <div class="shadow-sm p-3 rounded-20 font-1 text-sg-gray opacity-25" @click="this.$toast.show('Feature is comming soon')">Online Payment</div>
        </div>
        <div class="d-flex flex-wrap justify-content-center px-2 p-2 font-2">
            <div class="w-50 text-start ps-5">
                NAME
            </div>
            <div  class="w-50 text-sg-primary text-capitalize text-start">
               {{ account.name }}
            </div>
            <div class="w-50 text-start ps-5">
                BANK
            </div>
            <div  class="w-50 text-sg-primary text-capitalize text-start">
                {{ account.bank }}
            </div>
            <div class="w-50 text-start ps-5">
                ACCOUNT
            </div>
            <div  class="w-50 text-sg-primary text-capitalize text-start">
                {{ account.number }}
                <icon icon="ion:copy" class="ms-1" @click="copyAccount" />
            </div>
        </div>
        <form class="text-center py-3" @submit.prevent="completeOrder">
            <div class="text-gray">
                Upload proof of payment to complete Order
            </div>
            <div v-if="image" class="px-3">
                <img :src="image" style="height:200px" class="" />
            </div>
            <input type="file" required accept="image/*" ref="orderImage" placeholder="Proof of Payment" @change="previewImage" class="mt-4 shadow-sm btn form-control max-300"/>
            <button class="btn btn-sg-primary ms-2 mt-4" type="submit">
                Complete Order
            </button>
        </form>
    </div>
</template>

<script>
import { createOrder } from "@/services/order"
import Widget from "@/functions/widget"
import { getNextDate } from "@/functions/date"

export default {
    name:"Payment",
    data(){
        return {
            image:"",
            account: {
                name:process.env.VUE_APP_BANK_NAME,
                number:process.env.VUE_APP_BANK_NUMBER,
                bank:process.env.VUE_APP_BANK
            }
        }
    },
    methods: {
        previewImage(){
            const image = this.$refs.orderImage.files[0]
            this.image = URL.createObjectURL(image)
        },
        getFormData(){
            var form = new FormData()
            var order_details = {
                    products: this.$store.state.cart
            }
            var d_date = getNextDate().start
            console.log(d_date)

            form.append('order_details', JSON.stringify(order_details))
            form.append('location', this.$store.getters.order.delivery.location)
            form.append('image', this.$refs.orderImage.files[0])
            form.append('zone', this.$store.getters.order.delivery.zone)
            form.append('delivery_date', new Date(d_date).toISOString())
            return form
        },
        completeOrder() {
            Widget.openLoading()
            const formdata = this.getFormData()

            createOrder(formdata)
            .then((response)=> {
                if(response.data.status){
                    this.$store.commit('updateLocalObject', {
                        name:"cart",
                        value: {}
                    })
                    this.$store.commit('updateLocalObject', {
                        name:"order",
                        value: {}
                    })
                }
                Widget.dismiss()
                this.$router.push("order/completed")
            })
        },
        copyAccount(){
            navigator.clipboard.writeText(this.account.number);
            this.$toast.show("Account number copied !")
        }   
    },
    created(){
        if(!this.$store.getters.order.delivery)  {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped lang="less">
.w-50 {
    margin-bottom: 20px;
}
</style>

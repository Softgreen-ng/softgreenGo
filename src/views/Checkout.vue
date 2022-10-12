<template>
    <form class="h-100 d-flex mt-5 align-items-center justify-content-center" @submit.prevent="proceedToPayment">
        <div class=" p-4 text-start rounded-20 w-100">
            <h2 class="fw-bold text-sg-primary">
                Checkout
            </h2>
            <h6 class="font-1 mt-4 text-l-gray text-center mb-3">
                Order Summary
            </h6>
            <div class="d-flex justify-content-between w-100 p-1 small">
                <div class="text-center">
                    <div class="d-flex align-items-center justify-content-center w-100">
                        <icon icon="fluent:select-all-on-24-regular" class="text-sg-primary font-2 fs-1" />
                        <span class="text-gray fs-3 ms-1">
                            {{ Object.entries(this.$store.state.cart).length}}
                        </span>
                    </div>
                    <div class="font-1 small text-sm">
                        Selected Items
                    </div>
                </div>
                <div class="text-center">
                    <div class="d-flex align-items-center justify-content-center w-100">
                        <icon icon="iconoir:delivery-truck" class="text-sg-tertiary font-2 fs-1" />
                        <span class="text-gray fs-3 ms-1">
                            ₦{{ delivery.price }}
                        </span>
                    </div>
                    <div class="font-1 small text-sm">
                        Delivery Fee
                    </div>
                </div>
                <div class="text-center">
                    <div class="d-flex align-items-center justify-content-center w-100">
                        <icon icon="fluent:money-20-regular" class="text-sg-secondary font-2 fs-1" />
                        <span class="text-gray fs-3 ms-1">
                            ₦{{ this.$store.getters.totalPrice + this.delivery.price }}
                        </span>
                    </div>
                    <div class="font-1 small text-sm">
                        Total Fee
                    </div>
                </div>
            </div>
            <h6 class="font-1 mt-4 text-l-gray text-center mb-3">
                Delivery Details
            </h6>
            <div class="row justify-content-center">
                        <select v-model="delivery.zone" placeholder="Select"
                            class="btn w-75 required mb-2 bg-white text-start form-control font-1 shadow-sm py-3 px-4 mx-300" required="true">
                            <option v-for="zone in zones" :key="zone.id" :value="zone.name">{{ zone.name }}</option>
                            <option :value="''" disabled>Select delivery Zone</option>
                        </select>
                <input class="btn w-75 shadow-sm mt-2 p-3 text-start" required v-model="delivery.location"
                    placeholder="Enter Deliver location" type="" />
            </div>
            <div class="text-center text-md-start pt-4">
                <span class="small font-2">
                    <v-calendar :available-dates='getNextDate' :attributes="[{
                            bar: 'green',  // Boolean, String, Object
                            dates: this.getNextDate.start,
                            content:'green'

                    }]" class="border-0" is-expanded nav-visibility="hidden"></v-calendar>
                    <small class="font-2">
                        Next Delivery Date takes place on 
                        <b>
                            {{ new Date(this.getNextDate.start).toDateString() }}
                        </b>
                    </small>
                </span>
            </div>
            <div class="mt-5 mb-3 text-center">
                <button type="submit" class="btn btn-sg-primary">
                    Proceed to Payment
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import { getZones } from "@/services/product"

export default {
    name: "CheckOut",
    data() {
        return {
            delivery: {
                price:0,
                zone:""
            },
            zones:[]
        }
    },
    computed: {
        getNextDate(){
            let day = new Date().getDate()
            let date
            if( day > 6 || day < 2){
                date = this.getNextTuesday()
            }
            else {
                date = this.getNextSaturday()
            }
            let nextDate = {
                start:date,
                end: date
            }
            return nextDate
        }
    },
    methods: {
        proceedToPayment() {
            this.$store.commit('updateLocalObject', {
                name: "order",
                value: { delivery:this.delivery }
            })
            this.$router.push('/payment')
        },
        getNextTuesday(){
            return new Date().setDate(new Date().getDate() + ((7 - new Date().getDay()) % 7 + 2) % 7);
        },
        getNextSaturday(){
            return new Date().setDate(new Date().getDate() + ((7 - new Date().getDay()) % 7 + 6) % 7);
        },
    },
    watch: {
        'delivery.zone': {
            handler(zone){
                this.delivery.price = this.$store.state.zones.filter((e) => e.name == zone)[0].price
            }
        }
    },
    created(){
        getZones()
        .then((response) => {
            this.zones = response.data.zones
        })
    }
}
</script>

<style scoped lang="less">

</style>
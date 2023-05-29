<template>
    <form class="h-100 d-flex mt-3 mt-md-5 align-items-center justify-content-center" @submit.prevent="proceedToPayment">
        <div class=" p-4 text-start rounded-20 w-100">
            <h2 class="fw-bold text-sg-secondary _text-center text-md-start d-md-none">
                Checkout
            </h2>
            <h6 class="font-1 mt-3 text-l-gray text-center mb-3 ">
                Order Summary
            </h6>
            <div class="d-flex justify-content-around w-100 p-1 small">
                <div class="text-center">
                    <div class="d-flex align-items-center justify-content-center w-100">
                        <icon icon="fluent:select-all-on-24-regular" class="text-sg-primary font-2 fs-1" />
                        <span class="text-gray fs-3 ms-1">
                            {{ Object.entries(this.$store.state.cart).length }}
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
            <select-button class="shadow-none w-100 fw-normal text-sm mx-auto p-2 text-center" v-model="delivery_type"
                :options="['delivery', 'pickup']"></select-button>
            <div class="row px-3 max-600 mx-auto justify-content-center mt-2" v-if="delivery_type == 'delivery'">
                <select v-model="delivery.zone" placeholder="Select"
                    class="btn _w-75 required mb-2 bg-white text-start form-control font-1 shadow-sm py-3 _px-4 mx-300"
                    required>
                    <option v-for="zone in zones" :key="zone.id" :value="zone.id">{{ zone.name }}</option>
                    <option :value="''" disabled>Select delivery Zone</option>
                </select>
                <input class="btn _w-75 shadow-sm mt-2 p-3 text-start"
                    :required="delivery_type == 'delivery' ? true : false" v-model="delivery.location"
                    placeholder="Enter Delivery Address" type="" />
                <div class="text-start mt-3">
                    <button type="button" class="btn btn-sg-primary px-2" style="" @click="saveAddress"
                        :disabled="shouldNotSave">
                        save address
                    </button>
                    <div class="my-2 w-100" >
                        <div class="my-2 d-flex" v-for="address in  this.$store.state.addresses" :key="address.location">
                            <div class="" @click="this.delivery = { ...address }">
                                <RadioButton :inputId="address.location" :value="address.location"
                                    v-model="delivery.location" :selected="true" />
                                <label class="font-2 text-dark text-sm ps-1" :for="address.location">{{ address.zone + ':' +
                                    address.location }}</label>
                            </div>

                            <icon icon="material-symbols:close-rounded" style="font-size:30px;"
                                class="ms-3 fw-bold text-danger" @click="deleteAddress(address)" />
                        </div>
                        <div ref="loadingAddress">
                            <progress-spinner style="width:40px;height:40px" strokeWidth="7"
                                class="my-1 text-sm text-sg-primary py-2" />
                        </div>
                    </div>
                </div>

            </div>
            <div class="row justify-content-center mt-2" v-else>
                <select v-model="delivery.zone" placeholder="Select"
                    class="btn _w-75 required mb-2 bg-white text-start form-control font-1 shadow-sm py-3 px-4 mx-300"
                    required>
                    <option v-for="zone in pickup" :key="zone.id" :value="zone.id">{{ zone.name }}</option>
                    <option :value="''" disabled>Select Pickup location</option>
                </select>
            </div>

            <!-- <div class="text-center _text-md-start pt-4">
                <span class="small font-2">
                    <v-calendar :available-dates='getNextDate' :min-Date="this.getNextDate.start" :attributes="[{
                        highlight: 'green',  // Boolean, String, Object
                        dates: this.getNextDate.start,
                        content: 'white'

                    }]" class="border-0 font-2 d-none" is-expanded :nav-visibility="false">
                    </v-calendar>
                    <small class="font-2">
                        Your Delivery date is
                        <b class="fs-3">
                            {{ new Date(this.getNextDate.start).toDateString() }}
                        </b>
                    </small>
                </span>
            </div> -->
            <div class="mt-5 mb-3 text-center">
                <button type="submit" class="btn btn-sg-primary px-3">
                    Proceed to Payment
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import { getZones } from "@/services/product"
import { getNextDate } from "@/functions/date"
import SelectButton from 'primevue/selectbutton';
import RadioButton from 'primevue/radiobutton';
import ProgressSpinner from 'primevue/progressspinner';
import { createAddress, getAddresses, deleteAddress } from "@/services/location"
import Widget from "@/functions/widget"

export default {
    name: "CheckOut",
    components: {
        SelectButton,
        RadioButton,
        ProgressSpinner
    },
    data() {
        return {
            delivery: {
                price: 0,
                zone: ""
            },
            zones: [],
            pickup: [],
            delivery_type: 'delivery'
        }
    },
    computed: {
        getNextDate() {
            return getNextDate()
        },
        shouldNotSave() {
            let addressExist = this.$store.state.addresses.filter(e => (e.zone == this.delivery.zone && e.location == this.delivery.location))
            // console.log(addressExist)
            return !this.delivery.location || !this.delivery.zone || addressExist[0] ?
                true :
                false
        }
    },
    methods: {
        saveAddress() {
            // let location, zone
            Widget.openLoading()
            let { location, zone } = this.delivery
            createAddress({ location, zone })
                .then(() => {
                    console.log(this.$store.state.addresses)
                    this.$store.commit('updateAttr', {
                        parent: "addresses",
                        value: { location, zone },
                        name: this.$store.state.addresses.length +1
                    })
                    console.log(this.$store.state.addresses)
                })
            Widget.dismiss()
        },
        deleteAddress(address) {
            let addresses = this.$store.state.addresses.filter((e) => e.location != address.location)
            this.$store.commit('update', {
                name: "addresses",
                value: addresses
            })
            deleteAddress(address)
                .then(() => {

                })
        },
        proceedToPayment() {
            this.$store.commit('updateLocalObject', {
                name: "order",
                value: { delivery: this.delivery }
            })
            this.$router.push('/payment')
        },
    },
    watch: {
        'delivery.zone': {
            handler(zone) {
                this.delivery.price = this.$store.state.zones.filter((e) => e.name == zone)[0].price
            }
        },
        'delivery_type': {
            handler(type) {
                setTimeout(() => {type == 'delivery' ?
                    this.$refs.loadingAddress.style.display = 'none' :
                    ''}, 2000)
            }
        }
        // 'delivery': {

        // }
    },
    created() {
        // Widget.openLoading()
        getZones()
            .then((response) => {
                this.zones = response.data.zones
                this.pickup = response.data.pickup
                // Widget.dismiss()
            })
        getAddresses()
            .then(() => {
                this.$refs.loadingAddress.style.display = 'none'
            })


        // Restore Previously Choosed Dates
        if (Object.keys(this.$store.getters.order) > 1) {
            const delivery = this.$store.getters.order.delivery
            this.delivery = delivery
        }
    }
}
</script>

<style scoped lang="less">
.max-400 {
    max-width: 400px
}

@keyframes p-progress-spinner-color {

    100%,
    0% {
        stroke: var(--softgreen-primary) !important;
    }

    40% {
        stroke: var(--softgreen-secondary) !important;
    }

    66% {
        stroke: var(--softgreen-tertiary) !important;
    }

    80%,
    90% {
        stroke: var(--softgreen-primary) !important;
    }
}
</style>

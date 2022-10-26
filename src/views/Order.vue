<template>
    <div class="text-center pt-5">
        <span class="h1 text-sg-secondary fw-bold">
            Your Orders
        </span><br>
        <div class="row justify-content-center justify-content-md-start p-3">
            <div class="col-12 col-md-6 " v-for="order in this.$store.state.orders" :key="order">
                <div class="d-flex max-600 justify-content-between align-items-center shadow-sm rounded-20 p-3 my-2">
                    <div style="" class=" ">
                        <div style="overflow: hidden;"
                            class="my-auto btn-sg-primary rounded-20 _shadow-sm text-sg-primary bg-gradient w-100 py-3 px-4">
                            <span class="fs-1 fw-bold text-white">
                                {{ Object.entries(order.order_details.products).length }}
                            </span>
                        </div>
                    </div>
                    <div class="text-start w-100 p-2    ">
                        <div class="">
                            <span class="font-2 fs-6">
                                Order <b>
                                    #{{ order.id }}
                                </b>
                            </span>
                            <div class="rounded small text-white float-end p-1" :class="order.status">
                                {{ order.status }}
                            </div>
                        </div>
                        <div class="text-sg-secondary font-2 fw-bold">
                            &#x20A6;{{ order.price }}
                        </div>
                        <small class="text-gray">
                            {{ order.location }}
                        </small>
                    </div>
                </div>
            </div>
            <div class="h-100 p-5 my-5 opacity-50" v-if="!this.$store.state.orders[0]">
                <div>
                    <icon icon="entypo:shopping-bag" class="text-sg-secondary"  style="font-size:130px"/>
                </div>
                <div class="text-gray mt-2">
                    Your order would apper here
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getOrders } from "@/services/order"
import Widget from "@/functions/widget"

export default {
    name: '',
    components: {},
    created() {
        Widget.openLoading()
        getOrders()
        .then(() => {
            Widget.dismiss()
        })
    }
}
</script>

<style lang="less">
.pending {
    background-color: gray !important;
}

.delivered {
    background-color: rgb(17, 172, 123) !important;
}

.confirmed {
    .btn-sg-primary {}

    background-color: orange;
}

.max-600 {
    max-width: 600px;
}

.btn-sg-secondary {}

.btn-sg-primary {}
</style>

<template>
    <div class="" style="">
        <div class="px-2">
            <div class="row px-md-2 mt-3 align-items-stretch">
                <div class="col-12 col-md-5">
                    <div class="pt-md-5 _d-flex justify-content-center w-100">
                        <cart-product v-for="product in this.$store.state.cart" :key="product.id" :product="product"></cart-product>
                        <div class="h-100 p-5 my-5 opacity-50" v-if="Object.keys(this.$store.state.cart).length < 1">
                            <div>
                                <icon icon="fluent-emoji-high-contrast:basket" class="text-sg-secondary"  style="font-size:130px"/>
                            </div>
                            <div class="text-gray mt-2">
                                Products you add to Basket will appear here <br>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-7 ">
                    <div class="h-100">
                        <check-out class="d-none d-md-block"></check-out>

                    <div v-if="Object.keys(this.$store.state.cart).length > 0">
                        <a class="btn d-md-none btn-sg-primary p-2 mt-5" @click="goToLogin" v-if="!this.$store.getters.auth">
                            Proceeed to Checkout
                        </a>
                        <a class="btn d-md-none btn-sg-primary p-2 mt-5" href="/checkout" v-else>
                            Proceeed to Checkout
                        </a>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import CartProduct from "@/components/Cart"  
import CheckOut from "@/views/Checkout"

export default {
    name: '',
    components: {
        CartProduct,
        CheckOut
    },
    data() {
        return {
        }
    },
    methods: {
        goToLogin(){
            this.$toast.show("You have to be logged in to checkout")
            this.$router.push("/login/checkout")
        }
    },
    created() {
    }
}
</script>

<style>
input {
    border: none !important;
    box-shadow: none !important;
}

input#vertical {
    height: 10px !important;
}

/* p-inputnumber-input */
.blur {
    opacity: .2;
}

@media(max-width:768px) {
    .shadow {
        /* box-shadow: none !important; */
    }
}
</style>


<template>
    <div class="home bottom">
        <div class="px-4 px-md-5 pt-4">
            <div class="row align-items-stretch ">
                <div class="col-12 col-md-6">
                    <div class="shadow-sm _bg-l-gray p-3 rounded-20 h-100" style="overflow-x: hidden;">
                        <img class="my-auto rounded-20 h-100" :src="product.thumbnail" style="max-height:300px" />
                    </div>
                    <!-- <div style="overflow: hidden;" class="my-auto w-100 hadow-sm bg-l-gray rounded-20 h-100">
                        <img style="object-fit:cover;height: 400px;" class="rounded" _width="120"
                            :src="product.thumbnail" />
                    </div> -->
                </div>
                <div class="col-12 col-md-6">
                    <div class="py-4 px-3 text-start">
                        <div class="h4 text-dark fw-bolder">
                            {{ getFullProductName(product) }}
                        </div>
                        <div class="text-sg-secondary font-2 fs-5 fw-bold">
                            &#x20A6;{{ product.price }}
                            <del class="text-sm text-gray" v-if="product.discounted_price">&#x20A6;{{ product.discounted_price }}</del>
                        </div>
                        <div class="my-auto d-none">
                            <review-star review="2" class="small" />
                        </div>
                        <div class="mt-2">
                            <p class="text-gray my-auto font-2 pe-2 text-wrap">
                                <span v-html="product.content"></span>
                            </p>
                        </div>

                    </div>
                    <form class="row text-start" @submit.prevent="AddtoCart">
                        <div class="col-12 _col-sm-6 col-md-12">
                            <div class="px-2 w-100">
                                <InputNumber :min="0" inputId="vertical" style="" v-model="quantity" required
                                    mode="decimal" showButtons buttonLayout="horizontal"
                                    class="small-inp border-0 w-100"
                                    decrementButtonClass="square p-button-text text-white  btn-sg-secondary rounded-circle"
                                    incrementButtonClass="square p-button-success  rounded-circle"
                                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                                <div class="text-sm p-1 text-sg-primary" v-if="this.$store.state.cart[this.product.id]">
                                    <icon icon="mdi:basket-check" />
                                    <span class="font-2 fw-bold">
                                        Added to basket
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 _col-sm-6 col-md-12" v-if="!this.$store.state.cart[this.product.id]">
                            <button class="btn btn-sg-primary m-2 mt-2" type="submit">
                                <!-- <span class="fs-5"> -->
                                Add to basket
                                <!-- </span> -->
                            </button>
                        </div>

                        <div class="col-12" v-else>
                            <div class="mt-3 d-flex justify-content-start" style="max-width: 500px;">
                                <button class="btn btn-sg-primary p-2 px-3 me-2">
                                    Continue Shopping
                                </button>
                                <button class="btn btn-sg-secondary p-2 px-3">
                                    <span class="text-dark">
                                        Complete your order
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- <div class="mt-3 mt-sm-5 text-start">
                    <div class="h5 pt-5 text-sg-secondary fw-bold d-flex justify-content-between"
                        style="max-width: 300px">
                        Reviews
                        <span>
                            <review-star review="4" class="fs-4" />
                        </span>
                        <span> 3.7/4 </span>
                    </div>
                </div>

                <div class="mt-5 row">
                    <div class="col-12 col-md-6" v-for="review in reviews" :key="review.id">
                        <div class="d-flex mb-3">
                            <img height="70" class="rounded-circle" :src="review.reviewed_by.image" />
                            <div class="my-auto w-10 d-flex ms-3 text-gray  text-start small">
                                <span class="text-sm-sm">
                                    {{ review.body }}
                                </span>
                                <span class="ms-1">
                                    <review-star :review="review.value" class="my-auto" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div> -->
            <section class="h4 text-sg-primary text-start  mb-3 mt-5 fw-bold">Related Products</section>
            <div class="d-flex overflow-auto w-100">
                <div class="mx-2" v-for="product in relatedProducts" :key="product.id">
                    <product :product="product" class="" style="min-width:180px" />
                </div>
            </div>
            <!-- eslint-disable -->
        </div>
    </div>
</template>

<script>
import Product from "@/components/Product";
import ReviewStar from '@/components/ReviewStar'
import InputNumber from "primevue/inputnumber"
import { getSingleProduct, getProducts } from "@/services/product"
import { addOrUpdateCart, deleteCartProduct } from "@/services/cart"
import Widget from "@/functions/widget"
import indexMixin from "@/functions/mixins/indexMixin";

export default {
    name: "ProductPage",
    components: {
        Product,
        ReviewStar,
        InputNumber,
    },
    mixins: [indexMixin],
    data() {
        return {
            product: {},
            relatedProducts: [],
            quantity: 0,
            isAddedtoCart: false
        };
    },
    computed: {
    },
    methods: {
        async getProduct() {
            const response = await getSingleProduct(this.$route.params.id)
            this.product = response.data.product
        },
        checkisAddedtoCart() {
            console.log(this.$store.state.cart[this.product.id].quantity)
            if(this.$store.state.cart[this.product.id]){
                this.quantity = this.$store.state.cart[this.product.id].quantity
            }
                
        },
        AddtoCart() {
            Widget.openLoading()
            addOrUpdateCart(this.product, this.quantity)
            this.isAddedtoCart = true
            Widget.dismiss()
        },
        getRelatedProducts() {
            getProducts({
                category_id: this.product.category_id,
                limit: 10

            })
                .then((response) => {
                    this.relatedProducts = response.data.products.data
                    this.relatedProducts.splice(this.relatedProducts.indexOf(this.product) - 1, 1)
                })
        }
    },
    watch: {
        quantity(qty) {
            if (qty == 0) {
                this.$toast.success("Product removed from basket")
                deleteCartProduct(this.product.id)
            }
            if (this.$store.state.cart[this.product.id]) {
                addOrUpdateCart(this.product, qty)
            }
        }
    },
    async created() {
        Widget.openLoading()
        await this.getProduct()
        Widget.dismiss()
        this.getRelatedProducts()
        this.checkisAddedtoCart()
    },
};
</script>

<style lang="less">
input {
    border: none !important;
    box-shadow: none !important;
}

input#vertical {
    height: 10px !important;
}

@media(max-width:768px) {
    .shadow-none {
        box-shadow: none !important;
    }
}
</style>

<template>
    <div class="home bottom">
        <div class="px-4 px-md-5 pt-4">
            <div class="row align-items-stretch ">
                <div class="col-12 col-md-6">
                    <div class="shadow-sm bg-l-gray p-5 py-4 rounded-20 h-100" style="overflow-x: hidden;">
                        <img class="my-auto" :src="product.thumbnail" height="300" />
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="py-4 px-3 text-start">
                        <div class="h4 text-dark fw-bolder">
                            {{ product.title }}
                        </div>
                        <div class="text-sg-secondary font-2 fs-5 fw-bold">
                            &#x20A6;{{ product.price }}
                        <del class="text-sm text-gray">&#x20A6;{{ product.discounted_price }}</del>
                        </div>
                        <div class="my-auto d-none">
                            <review-star review="2" class="small" />
                        </div>
                        <div class="mt-2">
                            <div class="text-gray my-auto font-2 pe-2 text-wrap">
                                {{ product.content }}
                            </div>
                        </div>

                    </div>

                    <div class="" v-if="isAddedtoCart">
                        <div class="bg-gray p-2 rounded px-5" style="max-width: 300px;">
                            <h5 class="text-gray font-2 fw-bold" >
                                Added to Basket
                            </h5>
                        </div>
                    </div>

                    <form class="row text-start" @submit.prevent="AddtoCart" v-else>
                        <div class="col-12 _col-sm-6 col-md-12">
                            <div class="px-2 w-50">
                                <InputNumber :min="1" inputId="vertical" style="max-width:20px !important" v-model="quantity" required mode="decimal" showButtons
                                    buttonLayout="horizontal" class="small-inp border-0 w-100"
                                    decrementButtonClass="square p-button-text text-white  btn-sg-secondary rounded-circle"
                                    incrementButtonClass="square p-button-success  rounded-circle"
                                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                            </div>
                        </div>
                        <div class="col-12 _col-sm-6 col-md-12">
                            <button class="btn btn-sg-primary m-2 mt-4" type="submit">
                                <!-- <span class="fs-5"> -->
                                    Add to Basket
                                <!-- </span> -->
                            </button>
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
            <section class="h5 text-sg-primary mb-3 mt-5 fw-bold">Related Products</section>
            <div class="d-flex overflow-auto w-100 justify-content-between justify-content-sm-center">
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
import { AddOrUpdateCart } from "@/services/cart"
import Widget from "@/functions/widget"

export default {
    name: "ProductPage",
    components: {
        Product,
        ReviewStar,
        InputNumber,
    },
    data() {
        return {
            product: {},
            relatedProducts: [],
            quantity:1,
            isAddedtoCart: false
        };
    },
    computed: {
    },
    methods: {
        async getProduct(){
            const response = await getSingleProduct(this.$route.params.id)
            this.product = response.data.product
        },
        checkisAddedtoCart(){
            this.$store.state.cart[this.product.id] ?
            this.isAddedtoCart = true :
            this.isAddedtoCart = false
        },
        AddtoCart(){
            Widget.openLoading()
            AddOrUpdateCart(this.product, this.quantity)
            this.isAddedtoCart = true
            Widget.dismiss()
        },
        getRelatedProducts(){
            getProducts({
                category_id:this.product.category_id
            })
            .then((response) => {
                this.relatedProducts = response.data.products
                this.relatedProducts.splice(this.relatedProducts.indexOf(this.product) -1,1)
            })
        }
    },
    async created() {
        await this.getProduct()
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

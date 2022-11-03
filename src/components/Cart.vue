<template>
    <div>
        <div class="d-flex align-items-center border-bottom bottom _shadow-sm py-5_rounded-20 w-100 overflow-hidden"
            style="max-height:120px">
            <div style="max-width:130px;" class="p-3">
                <div style="overflow: hidden;" class="my-auto shadow-sm rounded-20 w-100">
                    <img style="object-fit:cover;height: 100px;" class="" _width="120"
                        :src="product.thumbnail" />
                </div>
            </div>
            <div class="p-3 w-100 text-start text-dark">
                <div class="fw-bold fs-6">
                    {{ product.title }}
                </div>
                <div class="text-sg-secondary fw-bold font-2">
                    ₦{{ product.price*product.quantity}}
                </div>
                <div class="text-danger d-flex align-items-center font-2 text-gray text-sm mt-2" @click="confirmDelete">
                    <icon icon="entypo:trash" /> 
                    <small class="ms-1">
                        Remove
                    </small>
                </div>
            </div>
            <div class="p-3 ps-4 smalll">
                <InputNumber inputId="vertical" v-model="quantity" :min="1" mode="decimal" showButtons buttonLayout="vertical"
                    style="width:2rem" class="small-inp"
                    decrementButtonClass="square p-button-text text-white  btn-sg-secondary rounded-circle"
                    incrementButtonClass="square p-button-success  rounded-circle" incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus" />
            </div>
        </div>
    </div>
</template>

<script>
import InputNumber from "primevue/inputnumber"
import { deleteCartProduct, AddOrUpdateCart } from "../services/cart"
export default {
    name: "CartProduct",
    props: {
        product:Object
    },
    components: {
        InputNumber
    },
    data(){
        return {
            quantity: 1
        }
    },
    methods:{
        confirmDelete(){
            this.$confirm.require({
                message: this.product.title + " would be removed from Basket, you can add again later.",
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.removeFromCart()
                }
            })
        },
        removeFromCart(){
            deleteCartProduct(this.product.id)
        }
    },
    watch:{
        quantity(newQty){
            AddOrUpdateCart(this.product, newQty)
        }
    },
    created(){
        this.quantity = this.product.quantity
        // console.log(this.product)
    }

}
</script>

<style scoped>
    .bottom {
        padding-bottom: 70px !important;
        padding-top: 70px !important
    }
    .p-inputwrapper{
        width:50px !important;
    }
    </style>
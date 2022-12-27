import { deleteCartProduct, addOrUpdateCart } from "@/services/cart"
// im
const mixin = {
    data(){
        return {
            quantity: 1
        }
    },
    methods: {
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
        },
        // getProductMeasure(unit){
        //     return getProductMeasure(unit)
        // }
    },
    watch:{
        quantity(newQty){
            addOrUpdateCart(this.product, newQty)
        }
    },
}

export default mixin
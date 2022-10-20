<template>
	<div class="" style="max-width:160px;">
		<div class="shadow-sm rounded-20 position-relative bg-l-gray position-relative product-image"
			style="height:180px;overflow: hidden;" :_style="'background-image:url('+product.thumbnail+')'">
			<div class="text-end w-100 p-2 position-absolute" v-if="!this.$store.state.cart[product.id]"
				@click="this.modal.isVisible = true">
				<icon icon="bi:cart-plus-fill" class="text-sg-primary fs-2 m-1" :horizontalFlip="true" />
			</div>
			<div style="overflow: hidden;" class="my-auto w-100" @click="goToPage">
				<img style="object-fit:cover;height: 190px;" class="rounded" _width="120" :src="product.thumbnail" />
			</div>

		</div>
		<div class="text-end font-2 p-1 mt-1 small fw-bold text-sg-secondary" @click="goToPage">
			<del class="text-sm text-gray fw-normal" v-if="product.discounted_price">&#x20A6;{{ product.discounted_price }}</del>
			&#x20A6;{{ product.price  }}
		</div>
		<div class="text-start small font-1 fs-6 fw-bold">
			{{ product.title + " " + product.weight ?? }} {{ getProductMeasure(product.unit) }}<br>
			<span class="small text-rt-yellow font-1 font-2">
				{{ product.location }}
			</span>
		</div>
		<Dialog v-model:visible="modal.isVisible">
			<div class="text-center mw-100">
				<h5 class="font-2 text-sg-secondary fw-bold mb-3">
					{{ product.title}}
				</h5>

					<div class="px-2 mx-auto">
						<InputNumber :min="1" v-model="quantity"
							required mode="decimal" showButtons buttonLayout="horizontal"
							class="small-inp text-center` border-0 w-100"
							decrementButtonClass="square p-button-text text-white  btn-sg-secondary rounded-circle"
							incrementButtonClass="square p-button-success  rounded-circle"
							incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
					</div><br>
					<div class="btn btn-sg-primary p-2 mt-3" @click="AddtoCart">
						Add to Cart
					</div>
				</div>
		</Dialog>

	</div>
</template>

<script>
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import { AddOrUpdateCart } from "@/services/cart"

export default {
	name: 'Footer',
	props: {
		product: Object
	},
	components: {
		Dialog,
		InputNumber
	},
	data() {
		return {
			modal: {
				isVisible: false,
				product: {},
			},
			quantity: 0

		}
	},
	methods: {
		goToPage() {
			location.href = '/product/' + this.product.id
		},
		AddtoCart() {
			AddOrUpdateCart(this.product, this.quantity)
			this.modal.isVisible = false
			this.$toast.success("Product Added to Cart")
		},
		getProductMeasure(unit){
			let value = unit == "kilo" : "kg" ? "g"
			return value
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.text-sm {
	font-size: 10px !important;
}

.product-image {
	background-size: 80% 100%;
	background-repeat: no-repeat;
}
</style>

<syyle>

</syyle>


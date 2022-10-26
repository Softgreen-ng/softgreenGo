<template>
  <div
    class="d-flex flex-wrap justify-content-center bg-body my-5 mx-auto"
    style=""
  >
  <div>
    <img
        src="https://thumbs.dreamstime.com/b/online-shopping-abstract-concept-vector-illustration-wishlist-buy-my-orders-list-add-to-cart-product-stock-retail-store-e-224143008.jpg"
        style="width: 75%;max-width:400px"
        class="my-2"
        />
    </div>  
    <br />
    <form
      @submit.prevent="sendRequest"
      class="w-100"
      style="max-width:300px"
    >
      <div class="mt-3 mb-2">
        <span class="my-1 fs-2"> Suggest a new product and we'll add it 😃 </span><br />
        <Chips v-model="request.products" placeholder="Enter the product and click enter" class="text-sm mt-3 rounded-20 shadow border-0"></Chips>
      </div>
      <textarea v-model="request.message" class="p-3 shadow rounded-20 w-100 mt-4 border-0 h-50" placeholder="Have Any message for us?"></textarea>

      <div class="mb-5 pb-5 pt-3">
      <button
          class="btn btn-sg-primary p-2 px-4"
          id="confirm"
          type="submit"
        >
          Add to Suggestions
        </button>
    </div>
    </form>
  </div>
</template>

<script>
import Widget from "@/functions/widget";
import Chips from "primevue/chips";
import { requestProduct } from "@/services/product"

export default {
  name: "",
  components: {
    Chips,
  },
  data() {
    return {
      request: {},
    };
  },
  methods: {
    sendRequest() {
      Widget.openLoading();
      requestProduct({
        products: JSON.stringify(this.request.products),
        message: this.request.message
    })
      .then((response) => {
        if(response.data.status){
            this.$router.push('/request/success')
        }
        else {
            this.$toast.show("unknown error occured")
        }
        Widget.dismiss()
      })
    },
  },
  watch: {
    // 'request.products': {
    //     handler(cal){
    //         console.log(cal)
    //     }
    // }
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
/* input:focus, .password:focus{
    border: none !important;
} */
.bg-body {
  // background: url('../../public/kit/vectors/home.svg') no-repeat;
  background-size: 100% 100%;
}

// @media (max-width: 768px) {
.bg-mobile {
  background-color: #ffffff00 !important;
  box-shadow: none !important;
}
// }

label {
  .text-sm-sm;
}

.btn,
label,
div,
span,
input {
  font-size: 11px !important;
}

label {
  .font-1-bold !important;
}

// // Pseudo Classes
.text-sm-sm {
}

.font-1-bold {
}
</style>

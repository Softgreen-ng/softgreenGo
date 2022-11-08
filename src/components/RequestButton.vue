<template>
  <button style="z-index:10000;" class="btn btn-sg-primary px-2" @click="this.$router.push('/request')">Request a New Product</button>
</template>

<script>
export default {
  name: "CartIcon",
  components: {},
};
</script>

<style scoped>
.position-absolute {
  top: 0;
  right: 100% !important;
}
.text-sm {
  font-size: 10px !important;
}
</style>
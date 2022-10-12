<template>
    <div class="position-relative p-0 m-0">
        <icon icon="emojione-monotone:shopping-cart" />
        <span class="bg-warning fw-bold position-absolute font-2 badge p-1 text-sm ">
            {{ Object.keys(this.$store.state.cart).length }}
        </span>
    </div>
</template>

<script>
    export default {
        name:"CartIcon",
        components: {}
    }
</script>

<style scoped>
.position-absolute{
    top:0;
    right: 100% !important
}
.text-sm {
    font-size:10px !important
}
</style>
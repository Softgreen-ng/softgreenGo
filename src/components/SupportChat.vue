<template>
    <div class="_position-absolute text-end justify-content-end d-flex fixed-bottom" v-if="this.$route.name == 'Home'" style="bottom:0;right:10px">
        <a href="https://wa.me/2349130714128">
            <Button class="btn-sg-primary border-0 p-0 d-flex p-ripple align-items-center justify-content-center rounded-circle mx-4"
                style="width:max-content;" v-tooltip="'Chat with customer care'">
                <icon icon="fa:whatsapp" class="fs-3" />
            </Button>
        </a>
    </div>
</template>

<script>
import Button from "primevue/button"
export default {
    name: 'SupportChat',
    components: {
        Button
    }
}
</script>

<style scoped lang="less">
.rounded-circle {
    @media(min-width:768px) {
        margin-bottom: 1
        00px;
    }

    margin-bottom:80px;
    width:50px !important;
    height:50px !important;
    z-index: 100000;
}
</style>
<template>
    <Button @click="openWhatsapp"
        class="btn-sg-primary border-0 p-0 d-flex p-ripple align-items-center fixed-bottom float-end justify-self-end justify-content-center rounded-circle mx-4"
        style="width:max-content;left:auto !important;" v-tooltip="'Chat with customer care'">
        <icon icon="fa:whatsapp" class="fs-3" />
    </Button>
</template>

<script>
import Button from "primevue/button"
export default {
    name: 'SupportChat',
    components: {
        Button
    },
    methods: {
        openWhatsapp() {
            location.href = 'https://wa.me/2349130714128'
        }
    }
}
</script>

<style scoped lang="less">
.rounded-circle {
    @media(min-width:768px) {
        margin-bottom: 1 00px;
    }

    margin-bottom:80px;
    width:50px !important;
    height:50px !important;
    z-index: 100000;
}
</style>
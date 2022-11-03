<template>
<div class="bottom">
    <div class=" d-none d-md-block bg-l-gray w-100 bg-gray" id="footer">
        <div class="row p-5">
            <div class="col-sm-12 col-md-6 col-lg-6 mb-4 m-md-0 text-start">
                <div class="ms-5">
                    <img src="../../public/logo.png" class="mb-3" height="30" />
                    <br>
                    Abeokuta, Ogun state
                </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6 text-end">
                <div>
                    <div class="d-flex justify-content-end p-2 text-sg-primary">
                        <Icon v-for="social in socials" :key="social.name" :icon="social.icon" class="icon ms-5 " />
                    </div>
                    <b class="text-sg-secondary">
                        support@softgreen.ng<br>
                    </b>
                    <span class="text-gray">
                        <b>Copyright 2022</b> SoftgreenGO
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="p-3 px-3 d-md-none bg-white shadow-lg d-flex position-fixed fixed-bottom justify-content-around align-items-center">
        <icon icon="healthicons:market-stall" :class="this.$route.name == 'Home' ? 'text-sg-primary' : 'text-gray'" class="pe-point" height="25" @click="this.$router.push('/')" />
        <div icon="entypo:shopping-bag" :class="this.$route.name == 'Cart' ? 'text-sg-primary' : 'text-gray'" class="pe-point" height="25" @click="this.$router.push('/cart')">
            <cart-icon class="fs-2"></cart-icon>
        </div>
        <icon icon="entypo:shopping-bag" :class="this.$route.name == 'Order' ? 'text-sg-primary' : 'text-gray'" class="pe-point" height="25" @click="this.$router.push('/order')" />

        <!-- MOBILE VIEW -->
    </div>
</div>
</template>

<script>
import CartIcon from "@/components/CartIcon"
export default {
    name: 'Footer',
    props: {
        msg: String
    },
    components: {
        CartIcon
    },
    data() {
        return {
            socials: [{
                    name: "Instagram",
                    icon: "akar-icons:instagram-fill",
                    link: "#"
                },
                {
                    name: "Facebook",
                    icon: "dashicons:facebook-alt",
                    link: "#"
                },
                {
                    name: "LinkedIn",
                    icon: "akar-icons:linkedin-box-fill",
                    link: "#"
                },
                {
                    name: "Twitter",
                    icon: "akar-icons:twitter-fill",
                    link: "#"
                },
            ]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
.bottom {
    // position: absolute !important;
    bottom: 0;
}

.icon {
    font-size: 30px !important;
}

@media(max-width:768px) {
    .bottom {
        padding-bottom: 50px !important;
    }
}
.rounded-circle {
    width:40px;
    height:40px;
}
</style>

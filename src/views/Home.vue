<template>
    <div class="home mb-5 mb-md-0">
        <div class="">
            <div class="row p-3 px-1 px-sm-3 bg-l-gray align-items-center">
                <div class="col-12 col-sm-12 col-md-4">
                    <div class="px-md-0 pr-5 me-5 text-start my-auto">
                        <request-button class="d-none d-md-block"></request-button>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-8 my-auto">
                    <form class="mt-2 d-flex align-items-center p-1 px-2 bg-white mx-4"
                        style="border-radius: 20px; max-width: 600px" @submit.prevent="filterProducts">
                        <input type="text" v-model="filters.keyword" class="
                form-control
                bg-transparent
                shadw-none
                btn
                text-start
                w-100
                p-2
                text-dark
                border-0
              " style="width: 100%" placeholder="Search..." />
                        <button class="bg-transparent border-0" type="submit">
                            <icon icon="fa:search" class="mx-2 text-sg-primary my-auto" />
                        </button>
                    </form>
                </div>
                <div></div>
            </div>


            <swiper :slides-per-view="1" :autoplay="true" :navigation="false" :space-between="5" @swiper="onSwiper" @_slideChange="onSlideChange"
                _class="default-slider" style="max-height:400px;max-width:600px">
                <swiper-slide class="p-2">
                    <div @click="this.$router.push('/login')">
                        <img src="../../public/img/slides/one.png" class="h-100 w-100" />
                    </div>
                </swiper-slide>
                <swiper-slide class="p-2">
                    <div>
                        <img src="../../public/img/slides/two.png" class="h-100 w-100" />
                    </div>
                </swiper-slide>
            </swiper>


            <div class="p-4 text-center">
                <span class="text-start fs-4 font-1-bold fw-bold">
                    Available products
                </span>
            </div>
            <div class="row py-md-3">
                <div class="col-12 col-md-3">
                    <div class="py-3 overflow-auto ps-5 text-start d-flex d-md-block"
                        v-if="!this.$store.state.categories[0]">
                        <div v-for="cat in ['', '', '', '']" class="" :key="cat">
                            <div class="
                  spinner-grow
                  btn
                  bg-l-gray
                  my-md-2
                  small
                  me-3
                  text-nowrap
                " style="min-width: 100px">
                                <!-- {{cat.name}} -->
                            </div>
                        </div>
                    </div>

                    <div class="
              py-3
              overflow-auto
              ps-5
              text-start
              d-flex
              justify-content-start
              justify-content-md-center
              d-md-block
            ">
                        <div v-for="cat in this.$store.state.categories" class="" :key="cat.id">
                            <div class="btn bg-l-gray my-md-2 small me-3 text-nowrap"
                                :class="filters.category_id == cat.id ? 'text-sg-primary' : ''"
                                @click="filterByCategory(cat)">
                                {{ cat.title }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-9">
                    <div class="mt-4 mt-md-0">

                        <div class="row pe-md-5 ms-md-5 px-3 px-md-0 ms-md-0">
                            <div class="col-6 col-md-4 col-lg-3" v-for="product in this.$store.state.products"
                                :key="product.id">
                                <div class="text-center mb-4">
                                    <product :product="product" class="mx-auto" />
                                </div>
                            </div>
                        </div>

                        <!-- Loading  Skeleton-->
                        <div class="row pe-md-5 ms-md-5 px-3 px-md-0 ms-md-0" style="" v-if="!loaded">
                            <div class="col-6 col-md-4 col-lg-3 col-center" v-for="product in ['', '', '', '']"
                                :key="product">
                                <div class="text-center mb-4 w-100">
                                    <div class="mx-auto" style="max-width: 160px">
                                        <div class="shadow rounded-20 p-2 bg-l-gray spinner-grow"
                                            style="min-width: 150px; height: 190px"></div>
                                        <div class="pt-3 text-start small nuinto-">
                                            <div class="spinner-grow bg-l-gray w-100 rounded-0"
                                                style="max-height: 20px"></div>
                                            <br />
                                            <span class="spinner-grow bg-l-gray w-100 rounded-0"
                                                style="max-height: 20px"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End of Skeleton -->


                        <div class="btn btn-sg-primary mx-auto" @click="getTemporaryProduct" v-if="isPageNext">
                            View more
                        </div>
                        <div class="d-md-none p-2 mt-4" v-if="!isPageNext && loaded && this.$store.state.products[0]">
                            <request-button></request-button>
                        </div>
                        <!-- <div class="d-md-none p-2 mt-4" v-if="this.$store.state.products[0]">
                            <request-button></request-button>
                        </div> -->

                        <!-- No Product Found -->
                        <div class="h-100 p-5 my-5" v-if="!this.$store.state.products[0] && loaded">
                            <div>
                                <icon icon="heroicons-solid:emoji-sad" class="text-sg-secondary"
                                    style="font-size: 130px" />
                            </div>
                            <div class="fs-4 text-gray">
                                No Products found<br />
                                <request-button class="mt-2"></request-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Product from '@/components/Product'
import RequestButton from '@/components/RequestButton'
import { getProducts, getCategories } from "@/services/product"
import Widget from "@/functions/widget"
import { getTemporaryProducts } from '../services/product'
import { Swiper } from "swiper/vue/swiper";
import { SwiperSlide } from "swiper/vue/swiper-slide";
import SwiperCore, { Pagination, Autoplay } from "swiper";
// import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';

SwiperCore.use([Pagination, Autoplay]);


export default {
    name: 'Home',
    components: {
        Product,
        RequestButton,
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            filters: {
                page: 1,
                limit: 100
            },
            loaded: false,
            modal: {
                isVisible: false,
                product: {}
            },
            prev: 0,
        }
    },
    computed: {
        isPageNext() {
            var current = this.filters.limit * this.filters.page
            console.log(this.$store.state.totalProducts, current)
            if (this.$store.state.totalProducts <= current)
                return false
            else
                return true
        }
    },
    methods: {
        getProducts(filter) {
            Widget.openLoading()
            getProducts(filter)
                .then(() => {
                    Widget.dismiss()
                })
        },
        getTemporaryProduct() {
            Widget.openLoading()
            this.loaded = false
            getTemporaryProducts(this.filters)
                .then(() => {
                    this.filters.page += 1
                    Widget.dismiss()
                })
            this.loaded = true
        },
        // getCategories() {
        //     getCategories()
        // },
        throttleFunction(func, delay) {
            return (...args) => {
                let now = new Date().getTime();
                if (now - this.prev > delay) {
                    this.prev = now;
                    return func(...args);
                }
            }
        },
        filterProducts() {
            this.getProducts(this.filters)
        },
        removeCat(cat) {
            if (this.filters.category_id == cat.id) {
                this.filters.category_id = null
                delete (this.filters.category_id)
            }
        },
        filterByCategory(cat) {
            if (this.filters.category_id == cat.id) {
                this.filters.category_id = null
                this.getProducts()
                delete (this.filters.category_id)
                return;
            }
            this.filters.category_id = cat.id
            this.throttleFunction(this.getProducts(this.filters), 5000)
        }
    },
    watch: {
        // 'filters': {
        //     deep: true,
        //     handler(newFilters) {
        //         console.log("Watched")
        //     }
        // }
    },
    created() {
        getProducts(this.filters)
            .then(() => {
                this.loaded = true
            })
        getCategories()
    },
}
</script>

<style lang="less">
.dropdown-menu {
    z-index: 1050 !important;
    // left:0 !important;
    // right: 0 !important;
}

.states {
    position: relative;
}

.states-md {
    max-width: 100% !important;
    box-shadow: 100vh 100vh 100vh 200vh #bbbbbb99 !important;
    border-radius: 30px 30px 0px 0px !important;
}

.close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px;
}

.dropdown.show:before {
    .body {
        opacity: 0.2;
    }

    background: rgba(100, 100, 100, 0.5);
    content: "";
    z-index: 1;
}

.size {
    font-size: 4vw !important;

    @media (max-width: 768px) {
        font-size: 5vw !important;
    }
}

.size icon {
    // height: 20vh
}
</style>

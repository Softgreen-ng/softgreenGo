<template>
    <div class="fixed-top w-100 shadow-sm" style="">
        <div>
            <div class="d-flex justify-content-between position-relative align-items-center bg-white p-3">
                <div class="">
                    <img src="../../public/logo.png" width="120" @click="this.$router.push('/')" />
                </div>
                <div class="d-flex align-items-center">
                    <div class="align-items-center d-none d-md-flex"   >
                        <small class="text-sm me-3">
                            Cart
                        </small>
                        <cart-icon width="35" class="me-2 text-l-gray fs-2"></cart-icon>
                    </div>
                    
                    <div class="align-items-center d-none d-md-flex" >
                        <small class="text-sm me-2 ms-1">Orders</small>
                        <icon width="25" class="me-2 text-l-gray fs-2 d-none d-md-block" icon="entypo:shopping-bag"
                            @click="$this.router.push('/order')" />
                    </div>
                    <div class="px-1" v-if="!this.$store.getters.auth">
                        <button class="btn text-sm py-1 text-gray me-2 px-4" @click="this.$router.push('/signup')">
                            Signup
                        </button>
                        <button class="btn btn-sg-secondary mx-2 py-1 text-sm px-4"
                            @click="this.$router.push('/login')">
                            Login
                        </button>

                    </div>
                    <!-- Button trigger modal -->
                    <div class="d-flex align-items-center dropdown position-relative" v-else id="">

                        <div class="d-flex rt-drp-ignore pe-point" @click="dropItDown">
                            <span class="text-sm py-1 d-none d-md-block text-gray my-auto mx-2 rt-drp-ignore pe-point">
                                {{ user.name }}
                            </span>
                            <icon icon="bxs:user-circle" width="35" class="rt-drp-ignore my-auto text-l-gray fs-1" />
                        </div>
                    </div>



                    <!-- MODAL -->
                    <div class="position-absolute bottom max-300 bg-white d-none rt-drpdwn shadow text-end rt-drp-ignore text-sm pt-5 pb-3 px-4 animate__animated animate__slideInDown "
                        ref="dropdown" id="rt-dropdown" style="z-index:1000000;">


                        <!-- INSIDE THE MODAL -->
                        <div class="d-flex pt-5 justify-content-end d-md-none rt-drp-ignore pe-point"
                            v-if="this.$store.getters.auth">
                            <span class="text-sm text-nowrap py-1 text-gray my-auto mx-2 rt-drp-ignore pe-point">
                                {{ user.name }}
                            </span>
                            <icon icon="bxs:user-circle" width="30" class="rt-drp-ignore my-auto text-sg-primary" />
                        </div>
                        <a class="dropdown-item w-100 p-2  pt-3 border-bottom border-sm d-md-none" v-else
                            href="/login">Login / SignUp</a>
                        <!-- <a class="dropdown-item w-100 p-2 pt-3 border-bottom border-sm" href="/terms">Terms and
                            Condition</a>
                        <a class="dropdown-item w-100 p-2 pt-3 border-bottom border-sm" href="/policy">Privacy
                            Policy</a> -->
                        <a class="dropdown-item w-100 p-2 pt-3 border-bottom border-sm text-l-gray" @click="logout">
                            <span class="">
                                Logout
                            </span>
                        </a>
                        <div class="text-start d-md-none mt-3 d-none">
                            <div class="d-flex p-2 text-sg-primary justify-content-end rt-drp-ignore">
                                <icon v-for="social in socials" :key="social.name" :icon="social.icon"
                                    class="icon mx-1 " width="15" />
                            </div>
                            <b class="text-sg-secondary rt-drp-ignore">
                                Hello@SoftgreenGO.app<br>
                            </b>
                            <span class="text-gray rt-drp-ignore">
                                <b>Copyright 2021</b> SoftgreenGO.app
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Button from 'primevue/button';
// import InputText from 'primevue/inputtext';
import CartIcon from "@/components/CartIcon"

export default {
    name: 'Head',
    props: {},
    components: {
        // Button,
        // InputText
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
            ],
            isLoggedIn: false,
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    methods: {
        dropItDown() {
            let body = document.getElementById('app');

            const eventFunction = (event) => {
                if (Array.from(document.getElementsByClassName('rt-drp-ignore')).includes(event.target) != true && Array.from(document.getElementsByClassName('dropdown-item')).includes(event.target) != true) {
                    console.log(event.target)
                    setTimeout(() => {
                        this.$refs.dropdown.classList.add('d-none')
                    }, 0)
                    // this.$refs.dropdown.classList.add('animate__slideOutUp')
                    body.removeEventListener('click', eventFunction)
                }
            }
            // this.$refs.dropdown.classList.remove('animate__slideOutUp')
            this.$refs.dropdown.classList.toggle('d-none')
            body.addEventListener('click', eventFunction)
        },
        dropResDown() {
            let body = document.getElementById('app');
            const eventFunction = (event) => {
                if (Array.from(document.getElementsByClassName('rt-drp-ignore')).includes(event.target) != true && Array.from(document.getElementsByClassName('dropdown-item')).includes(event.target) != true) {
                    console.log(event.target)
                    setTimeout(() => {
                        this.$refs.res.classList.add('d-none')
                    }, 0)
                    // this.$refs.res.classList.add('animate__slideOutUp')
                    body.removeEventListener('click', eventFunction)
                }
            }
            // this.$refs.res.classList.remove('animate__slideOutUp')
            this.$refs.res.classList.toggle('d-none')
            body.addEventListener('click', eventFunction)
        },
        logout() {
            this.$store.commit("logout");
            location.href = "/"
        }
    },
    created() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
b icon {
    font-size: 18px !important;
}

.rt-drpdwn {

    a,
    span {
        color: gray !important;
        border-bottom: .1rem solid whitesmoke !important;
    }

    .dropdown-item:hover {
        color: lightgray !important;
        background-color: initial;
    }

    width:150%;
    min-width:200px;
    // padding-bottom:50px !important;
    right:0;
    border-radius: 0px 0px 20px 20px;
}

.icon {
    font-size: 30px !important;
}

.pe-point,
.btn,
.text-sm-sm {
    @media(max-width: 768px) {
        font-size: 11px !important;
    }
}
</style>

<template>
    <div class="px-sm-5 px-3" style="min-height:60vh !important">
        <div class="shadow-sm d-flex justify-content-between align-items-center w-100 rounded-20 p-2 px-4 mt-4 mb-3 ">
            <span class="fs-5 text-sm">
                My Dashboard
            </span>
            <span class="" >
                <div class="d-flex justify-content-center" v-if="user.status">
                    <img src="../../public/kit/icons/briefcase.svg" class="text-sg-secondary me-1 my-auto" width="15" />
                    <div class="fw-bold fs-6 my-auto text-sm">
                       Verified Renta
                    </div>
                </div>
                 <div class="d-flex justify-content-center" v-else>
                    <img src="../../public/kit/icons/briefcase-disable.svg" class="text-gray me-1 my-auto" width="15" />
                    <div class="fw-bold fs-6 my-auto text-sm text-gray">
                       Pending Verification
                    </div>
                </div>
            </span>
        </div> 
        <div class="shadow-sm d-flex justify-content-between align-items-center rounded-20 fs-4 fw-bolder p-3 px-4" @click="this.$router.push('/product/add')">
            Add Items
            <icon icon="fluent:add-square-20-filled" class="text-sg-primary me-md-4 my-auto" height="70" />
        </div> 
        <br>
        <div class="p-2 px-3 px-md-5 shadow-sm text-start rounded-20 mt-5 fw-bold text-sm" style="max-width:200px">
            All Items
        </div>

        <div class="mx-auto px-5 h-100 bg-anger mb-5" v-if="!products[0]">
            <div class="w-100 mx-auto py-3 mt-5" style="max-width:400px !important">
                <img src="../../public/kit/vectors/add-item.svg" class="w-100 bg-dange" />
            </div>
            <div class="text-center mt-4" >
                <span class="text-sg-primary h5 text-now font-1-e-bold" >
                    Add items to start renting out
                </span>
            </div>
        </div>

        <div class="py-4 overflow-auto w-100 d-none d-md-block" v-if="products[0]">
            <div class="d-flex justify-content-between align-items-center border-bottom py-4" style="min-width:350px;" v-for="prod in products"  :key="prod.id">
                <span class="fw-bold me-3">
                    {{ prod.title }}
                </span>
                <div class="d-flex justify-content-between">
                    <span class="me-4 pe-point text-sg-primary">
                        make unavailable
                    </span>
                    <span class="me-4 pe-point text-gray fst-italic">
                        edit
                    </span>
                    <span class="me-4 pe-point text-sg-primary fst-italic">
                        delete
                    </span>
                 </div>
                <span class="">
                    <img src="../../public/kit/icons/product-available.svg" v-if="prod.status == 1" height="50" />
                    <img src="../../public/kit/icons/product-unavailable.svg" v-else-if="prod.status == 0" height="50" />
                    <img src="../../public/kit/icons/product-pending.svg" v-else height="50" />
                </span>
            </div>
        </div>

        <!-- MOBILE VIEW -->

         <div class="py-4 w-100 d-md-none" v-if="products[0]">
            <div class="d-flex align-items-stretch overflow-auto mx-0 px-2 w-100 animate__animated" style="min-width:100% !important"  v-for="(prod, index) in products"  :key="prod.id" :id="'editBox' + index"  @click="openEdit(index)">
                <div class="d-flex justify-content-between w-100 shadow mb-3 rounded-20 p-3 align-items-center py-4" style="min-width:100%;">
                    <span class="fw-bold me-3">
                        {{ prod.title }}
                    </span>
                    <div class="form-check form-switch text-white">
                        <input class="form-check-input btn-sg-secondary border-0 shadow-none text-light btn-lg opacity-100" disabled checked type="checkbox" role="switch" v-if="prod.status == 1" />
                        <input class="form-check-input btn-sg-primary border-0 shadow-none text-white btn-lg opacity-100" type="checkbox" role="switch" v-else-if="prod.status == 2" />
                        <input class="form-check-input btn-sg-primary border-0 shadow-none text-light btn-lg opacity-100"  checked type="checkbox" v-else role="switch" />
                    </div>
                </div>
                <div class="pb-3 ps-3 d-none d-flex " :id="'editPanel' + index" >
                    <div class="btn btn-sg-primary h-100 pt-3 px-4" style="min-width:80px " >
                        <img src="../../public/kit/icons/edit.svg" /><br>
                        <div class="mt-2">
                            edit
                        </div>
                    </div>
                    <div class="btn btn-sg-primary h-100 pt-3 px-4 ms-2" >
                        <img src="../../public/kit/icons/delete.svg" /><br>
                         <div class="mt-2">
                            delete
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="btn btn-sg-tertiary font-2 px-4 py-3 my-5 text-sg-primary" v-if="0">
            <icon icon="uit:ellipsis-h" class="text-sg-secondary fs-1" />
            <span class="fs-6 fw-bold my-auto">
                Show more
            </span>
        </div>
    </div>
</template>

<script>


export default {
    name:'',
    components: {
    },
    data(){
        return { 
            user:{},
            products: [
                { name:"Mata head", status:1 },
                { name:"Mala Chest", status:0 },
                { name:"Somebody's Babe", status:2 }
            ]
        }
    },
    methods: {
    },
    created(){
       
        
    }
}
</script>

<style scoped>
.form-switch .form-check-input {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e") !important;
}
</style>
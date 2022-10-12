<template>
<div class="d-flex flex-wrap" style="min-height:80vh !important">
    <div class="mx-auto pt-5 px-5 h-100 bg-anger">
        <div class="w-100 mx-auto py-3 mt-5" style="max-width:400px !important">
            <img src="../../public/kit/vectors/welcome.svg" class="w-100 bg-dange" />
        </div>
        <div class="mx-auto px-md-5 mt-5 txext-center" style="max-width:500px">
            <span class="h1 fw-bold">
               Welcome on board!
            </span>
            <br>
            <div class="fs-5 text-rt-blue pt-3 font-1-s-bold">
               Femi
                <span class="text-sg-primary">
                     just reached out to you via your email on next steps, we look forward to having you on 
                </span>
                Rentout
            </div>

            <div class="btn btn-sg-primary px-4 mt-5 mb-3" @click="this.$router.push('/')">
                <span class="fs-6" >
                    Return Home
                </span>
            </div>
        </div>

    </div>
</div>
</template>

<script>
export default {
    name: '',
    components: {

    },
}
</script>

<style>

</style>

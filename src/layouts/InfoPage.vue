<template>
<div class="d-flex flex-wrap" style="min-height:80vh !important">
    <div class="mx-auto px-3 h-100 bg-anger">
        <div class="w-100 mx-auto py-3 mt-4" style="max-width:400px !important">
            <img :src="image" class="w-100 bg-dange" />
        </div>
        <div class="mx-auto px-md-5 mt-2 txext-center" style="max-width:500px">
            <span class="h2 text-sg-secondary fw-bold">
               {{ title }}
            </span>
            <br>
            <div class="fs-6 text-rt-blue pt-3 font-2 text-gray" v-html="message">
            </div>

            <div class="btn btn-sg-primary px-4 mt-5 mb-3" @click="this.$router.push(this.link)" v-if="buttonText">
                <span class="fs-6" >
                   {{ buttonText }}
                </span>
            </div>
        </div>

    </div>
</div>
</template>

<script>
export default {
    name: 'InfoPage',
    props: ['image', 'title' , 'message', 'link', 'buttonText'],
    components: {

    },
}
</script>

<style>

</style>

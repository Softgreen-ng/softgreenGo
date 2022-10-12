<template>
<div class="" style="min-height:100vh !important">
    <div class="pt-5 px-md-5 px-3 h-100 bg-anger">
        <div class="w-100 mx-auto py-3 mt-5" style="max-width:400px">
            <img src="../../public/kit/vectors/faq.svg" class="w-100 bg-dange" />
        </div>
        <div class="px-md-5 text-center" style="">
             <div class="row w-100 justify-content-center" style="">
                <div class="col-12 col-sm-6 col-center" v-for="faq in faqs" :key="faq.id">
                    <div class="p-4 text-center"> 
                        <h6 class="text-sg-secondary font-1-bold">
                            Q: {{ faq.question }} ?
                        </h6>
                        <span class="text-sg-secondary">
                            A: {{ faq.answer }}
                        </span>
                    </div>
                </div>
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
    data(){
        return { 
            faqs: [
                { question:"What is RentOut about", answer:"It is about renting and leasing" },
                { question:"What is RentOut about", answer:"It is about renting and leasing" },
                { question:"What is RentOut about", answer:"It is about renting and leasing" },
                { question:"What is RentOut about", answer:"It is about renting and leasing" },
            ]
        }
    }
}
</script>

<style>

</style>

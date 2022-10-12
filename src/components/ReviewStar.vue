<template>
    <div class="d-inline-flex justify-content-between" >
        <icon icon="clarity:star-solid" class="my-auto mb-1 mx-1 " v-for="(elem,index) in reviews" :key="index" :class="review >= index+1 ? 'text-sg-tertiary': 'text-gray'" />
    </div>
</template>

<script>

export default {
    name:'',
    props:['review'],
    components:{
    },
    data(){
        return { 
            reviews:[1,2,3,4]
        }
    }
}
</script>

<style scoped>
    div{ 
        max-width: min-content;
    }
</style>
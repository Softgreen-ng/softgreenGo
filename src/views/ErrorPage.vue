<template >
    <div class="d-flex align-items-center p-5 justify-content-center" style="min-height:65vh" >
        <div class="" >
            <img src="../../public/kit/vectors/404.png"  class="mx-auto w-100" style="max-height:300px"/>
            <div class="mt-4 px-3 mx-auto my-auto font-1-bold" >
                OOPS !, We can't find the page you are looking for
            </div><br>
            <div class="btn btn-sg-primary px-4"  @click="this.$router.go(-1)">
                <span class="fs-6 font-1-s-bold" >
                    Go back
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
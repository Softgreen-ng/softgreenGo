<template>
    <div class="text-center w-100 text-center mx-auto" style="max-width:300px">
        <info-page
            image="https://www.svgrepo.com/show/261944/send.svg"
            title="Request Recieved" message="We have recieved your suggestions and we are reviewing em." buttonText="Go back home"
            link="/"></info-page>
    </div>
</template>

<script>
import InfoPage from "@/layouts/InfoPage"
export default {
    name: "OrderSuccess",
    components: {
        InfoPage
    }
}
</script>
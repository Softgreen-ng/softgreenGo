<template>
    <div>
        <info-page
            image="https://static.vecteezy.com/system/resources/previews/002/111/111/original/order-confirmation-page-concept-vector.jpg"
            title="Order Recieved" message="Your order woud be confirmed in a few minutes" buttonText="Go back home"
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
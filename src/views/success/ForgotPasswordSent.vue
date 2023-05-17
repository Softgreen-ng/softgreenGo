<template>
    <div>
        <info-page
            image="https://img.freepik.com/free-photo/3d-illustration-hand-cursor-green-password-bar_107791-16566.jpg"
            title="Password Sent" message="Your password reset instruction has been sent to your mail" buttonText="Go back home"
            link="/"></info-page>
    </div>
</template>

<script>
import InfoPage from "@/layouts/InfoPage"
export default {
    name: "ForgotPasswordSent",
    components: {
        InfoPage
    }
}
</script>
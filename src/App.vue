<template>
	<div class="h-100 maintain-bg v-100 d-flex align-items-center justify-content-center p-5 p-md-5"
		style="min-height: 100svh;" v-if="isMaintenance == true">
		<app-header class="w-100 " style="" />
		<div>
			<img src="https://img.freepik.com/free-vector/maintenance-concept-illustration_114360-3928.jpg"
				style="max-width: 350px;" />
			<div>
				<h1 class="font-1 text-gray fw-bold text-sg-primary">Maintenance Ongoing</h1>
				<span class="fs-6">
					We're currently ongoing our website maintentance to make sure we serve you the best
				</span><br>

				<a class="btn bg-sg-primary mt-5 text-white font-1" href="https://wa.me/234913071412">
					<div class="fs-6 px-2 shadow-sm">
						Proceed to Whatsapp
					</div>
				</a>
			</div>
		</div>
	</div>
	<div class="position-relative header-padding" v-else>
		<support-chat></support-chat>
		<confirm-dialog></confirm-dialog>
		<app-header class="w-100 " style="" />
		<div class="h-100" style="min-height:50vh !important">
			<router-view v-slot="{ Component }">
				<transition name="slide">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
		<app-footer class="w-100 mt-5" />
	</div>
</template>

<script >
import ConfirmDialog from 'primevue/confirmdialog';
import { getProfile } from './services/user';
import SupportChat from './components/SupportChat.vue';

export default {
	name: '',
	components: {
		ConfirmDialog,
		SupportChat
	},
	computed: {
		isMaintenance() {
			return true
		}
	},
	created() {
		if (this.$store.getters.auth) {
			getProfile()
		}
	},
	mounted() {
		if (this.isMaintenance == true){
			const _this =this
			setTimeout(function(){
				_this.$toast.success("...Redirecting to whatsapp")
				setTimeout(function(){
					location.href = "https://wa.me/234913071412"
				}, 1000)
			}, 2000)
		}
	}
}
</script>

<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.bg-secondary {
	--bs-bg-opacity: .5 !important;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

.header-padding {
	padding-top: 75px;

	@media(min-width:768px) {
		padding-top: 75px;
	}
}

.maintain-bg {
	background-repeat: no-repeat;
	background-size: cover;

	@media screen and (min-width:768px) {
		// background-image: url('https://img.freepik.com/free-photo/fresh-vegetables-circular-frame_23-2148724958.jpg?t=st=1688531078~exp=1688531678~hmac=12a2c784d0c8542bbab009615d5602c4166f33e26a8e05c1a5b32049fa6d2f01');
	}

	@media screen and (max-width:768px) {
		// background-image: url('https://media.istockphoto.com/id/515856750/photo/healthy-eating-background.jpg?s=612x612&w=0&k=20&c=yfOFP_fUFrUFdNM3nb1g0S5FNzbm28-0fSQrqaVar_M=');
	}
}
</style>

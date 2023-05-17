<template>
	<div class="position-relative header-padding">
		<support-chat></support-chat>
		<confirm-dialog></confirm-dialog>
		<app-header class="w-100 " style="" />
		<Dialog v-model:visible="isNotLocated" :closable="false" :modal="true">
			<template #header>
				<h5>Hi, Where are you shopping from ?</h5>
			</template>

			<div>
				<button class="w-100 my-2 btn-sg-secondary p-3 border-0" v-for="location in this.$store.state.locations" :key="location.id" @click="storeLocation(location.id)">
					{{ location.title }}
				</button>
			</div>

			<!-- <template #footer>
				<Button label="No" icon="pi pi-times" class="p-button-text" />
				<Button label="Yes" icon="pi pi-check" autofocus />
			</template> -->
		</Dialog>
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
import Dialog from 'primevue/dialog';
import { getProfile } from '@/services/user';
import SupportChat from '@/components/SupportChat.vue';
import { getSettings } from '@/services/setting';
import { getLocations } from '@/services/location';

export default {
	name: '',
	components: {
		ConfirmDialog,
		Dialog,
		SupportChat
	},
	data(){
		return {
			
		}
	},
	computed:{
		isNotLocated(){
			if(this.$store.getters.location)
				return false
			return true
		}
	},
	methods:{
		storeLocation($id){
			localStorage.setItem("location", $id)
			location.href = '/'
		}
	},
	created() {
		getSettings()
		if (this.$store.getters.auth) {
			getProfile()
		}
		getLocations()
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
</style>

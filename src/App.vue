<template>
   <div class="wrapper">
		<selector-component/>
		<cars-list-component/>
	</div>
</template>

<script>
import CarsListComponent from './components/CarsListComponent.vue';
import SelectorComponent from './components/SelectorComponent.vue';

export default {
    name: 'App',
    components: {
		SelectorComponent,
		CarsListComponent
	},
}
</script>

<style lang="scss">
.wrapper{
	display: flex;
	gap: 30px;
	max-width: 90vw;
	margin: 50px auto;
}
</style>

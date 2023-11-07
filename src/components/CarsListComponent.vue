<template>
	<div v-if="isListEmpty" class="error">Немає таких варіантів</div>
	<div v-else class="container">
		<div v-for="car in getFilteredCarsList" :key="car.id" class="card">
			<img :src="car.img">
			<div class="card__descr">
				<p>{{ car.title }}</p>
				<p class="card__price">{{ car.price }} $</p>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';

	export default {
		name: 'CarsListComponent',

		computed: {
			...mapGetters(['getCarsData', 'getFilteredCarsList']),

			isListEmpty(){
				return this.getFilteredCarsList.length == 0;
			}
		},
	}
</script>

<style lang="scss" scoped>
.container{
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}
.card{
	padding: 10px;
	flex-basis: 350px;
	display: flex;
	gap: 15px;
	border-bottom: 1px solid darkblue;
	img{
		width: 200px;
		height: 200px;
		object-fit: cover; 
	}
	p{
		font-size: 18px;
		font-weight: 600;
	}
}
p.card__price{
	color: green;
	font-size: 22px;
}
.error{
	font-size: 22px;
	font-weight: 600;
	font-style: italic;
	color: rgb(86, 40, 151);
	// align-self: center;
	margin: 50px auto;
}

</style>
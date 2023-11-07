<template>
	<div>
		<div class="selector__item">
			<label for="vehicleType" class="label">Тип транспорта:</label>
			<select v-model="vehicleType" id="vehicleType" class="select">
				<option v-for="vehicle in vehicleTypes" :key="vehicle.id" :value="vehicle.type">
				{{ vehicle.name }}
				</option>
			</select>
		</div>
		<div class="selector__item">
			<h2 class="label">Тип кузова:</h2>
			<form v-if="bodyTypes.length">
				<div v-for="body in bodyTypes" :key="body.id">
					<input
					 v-model="bodyType"
					 :id="body.type"
					 :value="body.type"
					 :name="body.type"
					 type="checkbox"
					>
					<label :for="body.type">{{ body.name }}</label>
				</div>
			</form>
		</div>
		<div class="selector__item">
			<label for="brand" class="label">Марка:</label>
			<select v-model="brandSelected" id="brand" class="select">
				<option v-for="(brand,index) in brandsData" :key="index" :value="brand">
					{{ brand }}
				</option>
			</select>
		</div>
		<div class="selector__item">
			<label for="model" class="label">Модель:</label>
			<select v-model="modelSelected" id="model" class="select">
				<option v-for="(model,index) in modelsData" :key="index" :value="model">
					{{ model }}
				</option>
			</select>
		</div>
		<div class="selector__item">
			<h2 class="label">Рік:</h2>
			<select v-model="yearFrom" class="year__select">
				<option disabled selected>Від</option>
				<option v-for="(year,index) in getYearsRange" :key="index" :value="year">
					{{ year }}
				</option>
			</select>
			<select v-model="yearTo" class="year__select">
				<option disabled selected>До</option>
				<option v-for="(year,index) in getYearsRange" :key="index" :value="year">
					{{ year }}
				</option>
			</select>
		</div>
		<div class="selector__item">
			<button @click="onClearFilters">Скинути всі фільтри</button>
		</div>

	</div>
</template>

<script>
import { vehicleTypes, carBodyTypes, motoBodyTypes, truckBodyTypes, busBodyTypes } from '@/data/filters';
import {mapGetters, mapActions} from 'vuex';

	export default {
		name: 'SelectorComponent',

		data() {
			return {
				vehicleTypes,
				carBodyTypes,
				motoBodyTypes,
				truckBodyTypes,
				busBodyTypes,
				brands: [],
				models: [],
			}
		},
		computed: {
			...mapGetters([
				'getCarsData',
				'getCurrentVehicle',
				'getCurrentBodyType',
				'getCurrentBrand',
				'getCurrentModel',
				'getCurrentYearTo',
				'getCurrentYearFrom'
			]),

			vehicleType:{
				get(){
					return this.getCurrentVehicle
				},
				set(newVal){
					this.updateVehicleType(newVal)
				}
			},
			bodyTypes() {
				switch(this.getCurrentVehicle){
					case 'car':
						return this.carBodyTypes;
					case 'motocycle':
						return this.motoBodyTypes;
					case 'truck':
						return this.truckBodyTypes;
					case 'bus':
						return this.busBodyTypes;
					default:
						return '';
				}
			},
			bodyType: {
				get(){
					return this.getCurrentBodyType;
				},
				set(newVal){
					this.updateBodyType(newVal)
				}
			},
			brandsData(){
				this.getListOfBrands();
				return Array.from(new Set(this.brands))
			},
			modelsData(){
				this.getListOfModels();
				return Array.from(new Set(this.models))
			},
			brandSelected:{
				get(){
					return this.getCurrentBrand;
				},
				set(newVal){
					this.updateBrandSelection(newVal)
				}
			},
			modelSelected:{
				get(){
					return this.getCurrentModel;
				},
				set(newVal){
					this.updateModelSelection(newVal)
				}
			},
			getYearsRange(){
				const currYear = new Date().getFullYear();
				let years = [];
				for (let i=currYear; i>= currYear-50; i--){
					years.push(i);
				}
				return years;
			},
			yearFrom: {
				get(){
					return this.getCurrentYearFrom;
				},
				set(val){
					this.updateYearFrom(val)
				}
			},
			yearTo: {
				get(){
					return this.getCurrentYearTo;
				},
				set(val){
					this.updateYearTo(val)
				}
			}
		},
		methods: {
			...mapActions([
				'updateVehicleType',
				'updateBodyType',
				'updateBrandSelection',
				'updateModelSelection',
				'updateYearTo',
				'updateYearFrom',
				'onClearFilters'
			]),

			getListOfBrands() {
				for (let i = 0; i < this.getCarsData.length; i++) {
					this.brands.push((this.getCarsData[i].brand));
				}
			},
			getListOfModels() {
				for (let i = 0; i < this.getCarsData.length; i++) {
					this.models.push((this.getCarsData[i].model));
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
.selector__item{
	margin-bottom: 20px;
}
.label{
	display: block;
	font-size: 18px;
	font-weight: 600;
	margin-bottom: 10px;
}
.select, .year__select{
	padding: 5px 0;
	border: 1px solid darkblue;
	border-radius: 5px;
}
.select{
	width: 170px;
}
.year__select{
	width: 80px;
	&:last-child{
		margin-left: 10px;
	}
}
</style>
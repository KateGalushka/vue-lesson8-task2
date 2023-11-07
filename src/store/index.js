import { createStore } from 'vuex';

import { carsData } from '@/data/carsData';
import { doesCarSatisfyOneSelector, doesCarSatisfyArraySelector } from './helpers';

export default createStore({
    state: {
		carsData,
		currentVehicleType: null,
		currentBodyType: [],
		currentBrand: null,
		currentModel: null,
		currentYearTo: 2023,
		currentYearFrom: null
	 },
    getters: {
		getCarsData:({ carsData }) => carsData,
		getCurrentVehicle: ({ currentVehicleType }) => currentVehicleType,
		getCurrentBodyType: ({ currentBodyType}) => currentBodyType,
		getCurrentBrand: ({ currentBrand }) => currentBrand,
		getCurrentModel: ({ currentModel }) => currentModel,
		getCurrentYearTo: ({ currentYearTo }) => currentYearTo,
		getCurrentYearFrom: ({ currentYearFrom }) => currentYearFrom,
		getFilteredCarsList: ({ carsData, currentVehicleType, currentBodyType, currentBrand, currentModel, currentYearTo, currentYearFrom }) => {
			 if (!currentVehicleType && !currentBodyType.length && !currentBrand && !currentModel && !currentYearFrom) {
				return carsData;
			} else {
				return carsData.filter(car => {
					const vehicleTypeMatch = doesCarSatisfyOneSelector(car, 'vehicleType', currentVehicleType);
					const bodyTypeMatch = doesCarSatisfyArraySelector(car, 'bodyType', currentBodyType);
					const brandMatch = doesCarSatisfyOneSelector(car, 'brand', currentBrand);
					const modelMatch = doesCarSatisfyOneSelector(car, 'model', currentModel);
					const yearsRangeMatch = !currentYearFrom || (car.year >= currentYearFrom && car.year <= currentYearTo);
					
					return vehicleTypeMatch && bodyTypeMatch && brandMatch && modelMatch&& yearsRangeMatch;
				})
			}
		},
   },
    mutations: {
		 updateVehicleType(state, val){
			state.currentVehicleType = val;
		 },
		 updateBodyType(state, val){
			state.currentBodyType = val;
		},
		 updateBrandSelection(state, val){
			state.currentBrand = val;
		},
		 updateModelSelection(state, val){
			state.currentModel = val;
		},
		updateYearToVal(state, val){
			state.currentYearTo = val;
		},
		updateYearFromVal(state, val){
			state.currentYearFrom = val;
		},
		 clearFilters(state){
			state.currentVehicleType = null;
			state.currentBodyType = [];
			state.currentBrand = null;
			state.currentModel = null;
			state.currentYearFrom = null;
		 }

	 },
    actions: {
		 updateVehicleType({commit}, val){
			commit('updateVehicleType', val)
		 },
		 updateBodyType({commit}, val){
			 commit('updateBodyType', val)
		 },
		 updateBrandSelection({commit}, val){
			 commit('updateBrandSelection', val)
		 },
		 updateModelSelection({ commit }, val){
			 commit('updateModelSelection', val)
		 },
		 updateYearTo({ commit }, val){
			 commit('updateYearToVal', val)
		 },
		 updateYearFrom({ commit }, val){
			 commit('updateYearFromVal', val)
		 },
		 onClearFilters({ commit }){
			commit('clearFilters')
		 }
	 },
    modules: {},
})

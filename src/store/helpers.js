export function doesCarSatisfyOneSelector(car, property, selectorValue){
	return !selectorValue || car[property] === selectorValue;
}
 export function doesCarSatisfyArraySelector(car, property, array){
	return !array.length || array.some(x => car[property]== x);
}

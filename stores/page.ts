import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', {
	state: () => {
		return {
		};
	},
	getters: {
		getById: (state) => {
			return (id: string): any => state[id];
		},
		data : (state)=> state
	},
	actions: {
		createField(id: string, data: any) {
			this[id] = data;
		},
		setField(id: string, key: string, data: any){
			this[id] = {...this[id], [key]: data}
		}
	}
});

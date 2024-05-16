import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
	state: () => {
		return {
			total: 5,
			carts: [
				{ id: 1, count: 2 },
				{ id: 2, count: 3 }
			]
		};
	},
	getters: {
		getCartCountById: (state) => {
			return (id: number): number => state.carts.find((cart) => cart.id === id)?.count || 0;
		}
	},
	actions: {
		toCart(id: number, count: number) {
			const items = [...this.carts];
			const idx = items.findIndex((i) => i.id === id);
			if (idx !== -1) {
				items[idx] = { id, count };
			} else {
				items.push({ id, count });
			}
			this.carts = items;
			this.total = items.reduce((pre, cur) => pre + cur.count, 0);
		}
	}
});

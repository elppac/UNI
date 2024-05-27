"use strict";
const common_vendor = require("../common/vendor.js");
const useGlobalStore = common_vendor.defineStore("global", {
  state: () => {
    return {
      total: 5,
      carts: [
        { id: 1, count: 2, cid: 2 },
        { id: 2, count: 3, cid: 2 }
      ]
    };
  },
  getters: {
    getCartCountById: (state) => {
      return (id) => {
        var _a;
        return ((_a = state.carts.find((cart) => cart.id === id)) == null ? void 0 : _a.count) || 0;
      };
    },
    getCartCategoryById: (state) => {
      return () => {
      };
    }
  },
  actions: {
    toCart(id, count) {
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
exports.useGlobalStore = useGlobalStore;

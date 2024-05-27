"use strict";
const common_vendor = require("../common/vendor.js");
const usePageStore = common_vendor.defineStore("page", {
  state: () => {
    return {};
  },
  getters: {
    getById: (state) => {
      return (id) => state[id];
    },
    data: (state) => state
  },
  actions: {
    createField(id, data) {
      this[id] = data;
    },
    setField(id, key, data) {
      this[id] = { ...this[id], [key]: data };
    }
  }
});
exports.usePageStore = usePageStore;

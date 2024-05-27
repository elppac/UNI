"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "matrix-input",
  props: ["value"],
  emits: ["update:value"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const attrs = common_vendor.useAttrs();
    common_vendor.watchEffect(() => {
      console.log("attrs", attrs, common_vendor.useAttrs());
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(attrs),
        b: props.value,
        c: common_vendor.o(($event) => emit("update:value", $event.detail.value))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/elppa/Documents/HBuilderProjects/UNI/components/matrix-input.vue"]]);
wx.createComponent(Component);

"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "matrix-text",
  props: ["content", "dataSource"],
  emits: ["request:dataSource", "request:options"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    common_vendor.ref(0);
    common_vendor.watchEffect(() => {
      console.log("这里可以打印出服务端返回的数据", props.dataSource, props.content);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.content)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/elppa/Documents/HBuilderProjects/UNI/components/matrix-text.vue"]]);
wx.createComponent(Component);

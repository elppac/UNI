"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_global = require("../../stores/global.js");
const stores_page = require("../../stores/page.js");
if (!Math) {
  MatrixField();
}
const MatrixField = () => "../../bee/matrix-field.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const store = stores_global.useGlobalStore();
    common_vendor.provide("globalStore", store);
    common_vendor.provide("page", stores_page.usePageStore());
    const ContainerConfig = {
      props: {
        style: {
          border: " 1px solid #eee"
        }
      },
      children: [{
        type: "Input",
        props: { id: "input", placeholder: "这是输入框, 数据会同步到下面的文本中" }
      }, {
        type: "Text",
        props: { id: "text", content: { type: "expression", value: "`$${input.value} USD`" } }
      }]
    };
    const title = common_vendor.ref("hello world");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(title.value),
        b: common_vendor.p({
          id: "container",
          type: "Container",
          ...ContainerConfig
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/elppa/Documents/HBuilderProjects/UNI/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

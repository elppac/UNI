"use strict";
const common_vendor = require("../common/vendor.js");
if (!Math) {
  MatrixField();
}
const MatrixField = () => "../bee/matrix-field.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "matrix-container",
  setup(__props) {
    const attrs = common_vendor.useAttrs();
    const { style, gridRow, gridColumn, childrenSchema = [], disabledContainer } = attrs;
    const grid = {};
    if (gridColumn && gridColumn !== 1) {
      grid.gridColumn = `auto / span ${gridColumn}`;
    }
    if (gridRow && gridRow !== 1) {
      grid.gridRow = `auto / span ${gridRow}`;
    }
    const css = { ...style, ...grid };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(disabledContainer) !== true
      }, common_vendor.unref(disabledContainer) !== true ? {
        b: common_vendor.f(common_vendor.unref(childrenSchema), (i, index, i0) => {
          return {
            a: i.props.id,
            b: "3a70f15e-0-" + i0,
            c: common_vendor.p({
              ...i,
              id: i.props.id
            }),
            d: i
          };
        })
      } : {}, {
        c: common_vendor.s(css)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/elppa/Documents/HBuilderProjects/UNI/components/matrix-container.vue"]]);
wx.createComponent(Component);

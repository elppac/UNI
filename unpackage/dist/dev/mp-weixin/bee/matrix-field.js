"use strict";
const common_vendor = require("../common/vendor.js");
const util_expr = require("../util/expr.js");
var define_import_meta_env_default = { VITE_USER_NODE_ENV: "development", VITE_API_URL: "http://ip:port", VITE_ENGINE: "JUST", VITE_MOCK: "true", VITE_MOCK_URL: "http://localhost:7001/mock", VITE_CJS_IGNORE_WARNING: "true", VITE_ROOT_DIR: "/Users/elppa/Documents/HBuilderProjects/UNI", BASE_URL: "/", MODE: "development", DEV: true, PROD: false, SSR: false };
if (!Array) {
  const _component_MatrixSwiper = common_vendor.resolveComponent("MatrixSwiper");
  _component_MatrixSwiper();
}
if (!Math) {
  (MatrixText + MatrixContainer + MatrixInput)();
}
const MatrixContainer = () => "../components/matrix-container.js";
const MatrixInput = () => "../components/matrix-input.js";
const MatrixText = () => "../components/matrix-text.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "matrix-field",
  props: {
    type: String,
    id: String,
    props: Object,
    children: {
      type: Array,
      required: false
    }
  },
  setup(__props) {
    const ENV = define_import_meta_env_default;
    const fieldProps = __props;
    const fieldOriginProps = fieldProps.props || {};
    common_vendor.onBeforeMount(() => {
    });
    const properties = { ...fieldOriginProps, childrenSchema: fieldProps.children, "data-raw": fieldOriginProps };
    const pageStore = common_vendor.inject("page");
    const globalStore = common_vendor.inject("globalStore");
    const computer = [];
    const watcher = {};
    const service = common_vendor.ref({});
    const request = async (key, params) => {
      const serviceData = fieldOriginProps[key].value;
      const data = { json: params, projectCode: "f854e13238d74a95bbf5159e228c9c61" };
      let url = `${ENV.VITE_API_URL}/service/${serviceData.name}`;
      {
        url = `${ENV.VITE_MOCK_URL}/service/${serviceData.name}`;
        data.$mock = serviceData;
      }
      const response = await fetch(url, {
        method: "POST",
        // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        // no-cors, *cors, same-origin
        cache: "no-cache",
        // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // 'Access-Control-Allow-Origin': 'http://localhost:5173',
          "Access-Control-Allow-Credentials": "true"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
      });
      const res = await response.json();
      service.value = { ...service.value, [key]: { data: res.data, params } };
    };
    const MatrixComponentEmits = {
      Text: ["request:dataSource", "request:options"],
      Input: ["update:value"]
    };
    const events = (MatrixComponentEmits[fieldProps.type] || []).reduce((pre, cur) => {
      pre[`on${cur[0].toUpperCase()}${cur.slice(1)}`] = (v) => {
        const [type, key] = cur.split(":");
        if (type && key) {
          if (type === "update") {
            pageStore.setField(fieldProps.id, "value", v);
          } else if (type === "request") {
            request(key, v);
          }
        }
      };
      return pre;
    }, {});
    for (const i in fieldOriginProps) {
      const attr = fieldOriginProps[i];
      if (attr.type === "expression") {
        delete properties[i];
        computer.push({
          key: i,
          computed: common_vendor.computed(() => {
            console.log("pageStore.data", pageStore.data);
            return util_expr.expression(attr.value, { ...pageStore.data, $ctx: globalStore });
          })
        });
      } else if (attr.type === "request") {
        delete properties[i];
        watcher[i] = {
          // 处理器, 用来组织入参
          processor: common_vendor.watch(
            () => {
              const service2 = attr.value;
              const params = service2.params.map((p) => {
                if (p.dataType === "model") {
                  return p.struture.map((s) => {
                    const strutureValue = s.value;
                    if (strutureValue) {
                      return {
                        key: s.name,
                        computed: util_expr.expression(strutureValue.value, { ...pageStore.data })
                      };
                    } else {
                      return void 0;
                    }
                  }).reduce((pre, cur) => {
                    if (cur) {
                      pre[cur.key] = cur.computed;
                    }
                    return pre;
                  }, {});
                }
              });
              return params[0];
            },
            (params) => {
              watcher[i].program(params);
            }
          ),
          // 程序, 用来调用实际的服务, 并组织返回值
          program: common_vendor.debounce((params) => {
            request(i, params);
          }, 200)
        };
      }
    }
    pageStore.createField(fieldProps.id, fieldOriginProps);
    const propertyData = common_vendor.computed(() => {
      const propertyModel = {
        ...properties,
        ...computer.reduce((pre, cur) => {
          pre[cur.key] = cur.computed.value;
          return pre;
        }, {}),
        ...service.value,
        ...events
      };
      return propertyModel;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: properties.visible === false || computer.some((i) => i.key === "visible" && i.value === false)
      }, properties.visible === false || computer.some((i) => i.key === "visible" && i.value === false) ? {} : properties.click ? common_vendor.e({
        c: __props.type === "Text"
      }, __props.type === "Text" ? {
        d: common_vendor.p({
          ...propertyData.value
        })
      } : __props.type === "Container" ? {
        f: common_vendor.p({
          ...propertyData.value
        })
      } : __props.type === "Input" ? {
        h: common_vendor.p({
          ...propertyData.value
        })
      } : __props.type === "Swiper" ? {
        j: common_vendor.p({
          ...propertyData.value
        })
      } : {}, {
        e: __props.type === "Container",
        g: __props.type === "Input",
        i: __props.type === "Swiper",
        k: common_vendor.o(() => {
          console.log("template click");
        }),
        l: common_vendor.o(() => {
          console.log("click here");
        })
      }) : common_vendor.e({
        m: __props.type === "Text"
      }, __props.type === "Text" ? {
        n: common_vendor.p({
          ...propertyData.value
        })
      } : __props.type === "Container" ? {
        p: common_vendor.p({
          ...propertyData.value
        })
      } : __props.type === "Input" ? {
        r: common_vendor.p({
          ...propertyData.value
        })
      } : __props.type === "Swiper" ? {
        t: common_vendor.p({
          ...propertyData.value
        })
      } : {}, {
        o: __props.type === "Container",
        q: __props.type === "Input",
        s: __props.type === "Swiper"
      }), {
        b: properties.click
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/elppa/Documents/HBuilderProjects/UNI/bee/matrix-field.vue"]]);
wx.createComponent(Component);

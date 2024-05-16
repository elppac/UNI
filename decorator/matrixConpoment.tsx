import { computed, defineComponent, h, inject, watch, ref } from 'vue';
import { Parser } from 'expr-eval';
import debounce from 'lodash.debounce';


const parser = new Parser();
parser.functions.CONCAT = function (...args) {
	return String.prototype.concat(...args);
};

const exprParse = (expression: string) => {
	let expr = expression.trim();
	if (/^`.*?\${(.*?).*?`$/.test(expr)) {
		const vars = expr.match(/\$\{(.*?)\}/g);
		let exprStr = expr.substring(1, expr.length - 1);
		const exprKeys = [];
		vars.forEach((i, idx) => {
			const [left, ...right] = exprStr.split(i);
			if (left) {
				exprKeys.push(`'${left}'`);
			}
			exprKeys.push(i.match(/\$\{(.*?)\}/)[1]);
			exprStr = right.join(i);
			if (idx === vars.length - 1) {
				exprKeys.push(`'${right[0]}'`);
			}
		});
		expr = `CONCAT(${exprKeys.join(',')})`;
	}
	return parser.parse(expr);
};

export default (Component) => {
	return defineComponent({
		inheritAttrs: false,
		setup(_, { attrs, slots }: { [key: string]: any }) {
			const props = { ...attrs, 'data-row': attrs  };
			delete props.id
			const pageStore: any = inject('page');
			const computer = [];
			const watcher = {};
			const service = ref({});
			const request = async (key: string, params: any) => {
				const data = {
					params,
					data: [{ label: 'hello', value: 1 }]
				};
				service.value = { ...service.value, [key]: data };
			};

			const events = (Component.emits || []).reduce((pre, cur) => {
				pre[`on${cur[0].toUpperCase()}${cur.slice(1)}`] = (v) => {
					const [type, key] = cur.split(':');
					if (type && key) {
						if (type === 'update') {
							pageStore.setField(attrs.id, 'value', v);
						} else if (type === 'request') {
							request(key, v);
						}
					}
				};
				return pre;
			}, {});

			for (const i in attrs) {
				if (attrs[i].type === 'expression') {
					delete props[i]
					computer.push({
						key: i,
						computed: computed(() => exprParse(attrs[i].value).evaluate({ ...pageStore.data }))
					});
				} else if (attrs[i].type === 'request') {
					delete props[i]
					watcher[i] = {
						// 处理器, 用来组织入参
						processor: watch(
							() => {
								const service = attrs[i].value;
								const params = service.params.map((p) => {
									if (p.dataType === 'model') {
										return p.struture
											.map((s: any) => {
												const strutureValue = s.value;
												if (strutureValue) {
													return {
														key: s.name,
														computed: exprParse(strutureValue.value).evaluate({ ...pageStore.data })
													};
												} else {
													return undefined;
												}
											})
											.reduce((pre: any, cur: any) => {
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
						program: debounce((params: any) => {
							// console.log('send request', params);
							request(i, params);
						}, 200)
					};
				}
			}
			pageStore.createField(attrs.id, attrs);

			const coreRender = () => {
				return h(
					Component,
					{
						...props,
						...computer.reduce((pre, cur) => {
							pre[cur.key] = cur.computed.value;
							return pre;
						}, {}),
						...service.value,
						...events
					},
					slots
				);
			};

			const wrapperRender = () => {
				if (props.click) {
					return h(
						'div',
						{
							onClick: () => { console.log('这里实现你的click')}
						},
						coreRender()
					);
				} else {
					return coreRender();
				}
			};

			return () => wrapperRender();
		}
	});
};

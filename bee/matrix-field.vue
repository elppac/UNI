<template>
	<view v-if="properties.visible === false || computer.some((i) => i.key === 'visible' && i.value===false)"></view>
	<view v-else-if="properties.click" @click="()=>{ console.log('click here')}">
		<view @click="()=>{console.log('template click')}">
			<MatrixText v-if="type === 'Text'" v-bind="propertyData" />
			<MatrixContainer v-else-if="type === 'Container'" v-bind="propertyData" />
			<MatrixInput v-else-if="type === 'Input'" v-bind="propertyData" />
			<MatrixSwiper v-else-if="type === 'Swiper'" v-bind="propertyData" />
		</view>
	</view>
	<template v-else>
		<MatrixText v-if="type === 'Text'" v-bind="propertyData" />
		<MatrixContainer v-else-if="type === 'Container'" v-bind="propertyData" />
		<MatrixInput v-else-if="type === 'Input'" v-bind="propertyData" />
		<MatrixSwiper v-else-if="type === 'Swiper'" v-bind="propertyData" />
	</template>
</template>

<script setup lang="ts">
	import { computed, inject, onBeforeMount, ref, useAttrs, watch } from 'vue';
	import debounce from 'lodash.debounce';
	import { expression } from '../util/expr';
	import MatrixContainer from '../components/matrix-container.vue';
	import MatrixInput from '../components/matrix-input.vue';
	import MatrixText from '../components/matrix-text.vue';
	defineOptions({
		inheritAttrs: false
	})


	const ENV = (import.meta as any).env;
	const fieldProps = defineProps({
		type: String,
		id: String,
		props: Object,
		children: {
			type: Array,
			required: false
		}
	})
	const fieldOriginProps = fieldProps.props || {};
	// const attributes : any = useAttrs()
	onBeforeMount(() => {
		// console.log(props, attributes)
	})
	const properties : any = { ...fieldOriginProps, childrenSchema: fieldProps.children, 'data-raw': fieldOriginProps };
	// if(Array.isArray(attributes.children)){
	// 	properties.children = attributes.children;
	// }
	// const MatrixFields : { [key : string] : any } = inject('MatrixFields')
	const pageStore : any = inject('page');
	const globalStore : any = inject('globalStore')
	const computer : any[] = [];
	const watcher : any = {};
	const service = ref({});

	const request = async (key : string, params : any) => {
		const isMock = ENV.VITE_MOCK === 'true';
		const serviceData = fieldOriginProps[key].value;
		const data : any = { json: params, projectCode: 'f854e13238d74a95bbf5159e228c9c61' };
		let url = `${ENV.VITE_API_URL}/service/${serviceData.name}`;
		if (isMock) {
			url = `${ENV.VITE_MOCK_URL}/service/${serviceData.name}`;
			data.$mock = serviceData;
		}
		const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// 'Access-Control-Allow-Origin': 'http://localhost:5173',
				'Access-Control-Allow-Credentials': 'true'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data)
		});

		const res = await response.json();
		service.value = { ...service.value, [key]: { data: res.data, params } };
	};


	const MatrixComponentEmits = {
		Text: ['request:dataSource', 'request:options'],
		Input: ['update:value']
	}


	const events = (MatrixComponentEmits[fieldProps.type] || []).reduce((pre : any, cur : any) => {
		pre[`on${cur[0].toUpperCase()}${cur.slice(1)}`] = (v : any) => {
			const [type, key] = cur.split(':');
			if (type && key) {
				if (type === 'update') {
					pageStore.setField(fieldProps.id, 'value', v);
				} else if (type === 'request') {
					request(key, v);
				}
			}
		};
		return pre;
	}, {});
	for (const i in fieldOriginProps) {
		const attr : any = fieldOriginProps[i];
		if (attr.type === 'expression') {
			delete properties[i];
			computer.push({
				key: i,
				computed: computed(() => {
					console.log('pageStore.data', pageStore.data)
					return expression(attr.value, { ...pageStore.data, $ctx: globalStore })
				})
			});
		} else if (attr.type === 'request') {
			delete properties[i];
			watcher[i] = {
				// 处理器, 用来组织入参
				processor: watch(
					() => {
						const service = attr.value;
						const params = service.params.map((p : any) => {
							if (p.dataType === 'model') {
								return p.struture
									.map((s : any) => {
										const strutureValue = s.value;
										if (strutureValue) {
											return {
												key: s.name,
												computed: expression(strutureValue.value, { ...pageStore.data })
											};
										} else {
											return undefined;
										}
									})
									.reduce((pre : any, cur : any) => {
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
				program: debounce((params : any) => {
					// console.log('send request', params);
					request(i, params);
				}, 200)
			};
		}
	}
	pageStore.createField(fieldProps.id, fieldOriginProps);

	const propertyData = computed(() => {
		const propertyModel = {
			...properties,
			...computer.reduce((pre, cur) => {
				pre[cur.key] = cur.computed.value;
				return pre;
			}, {}),
			...service.value,
			...events
		}
		return propertyModel
	})
</script>
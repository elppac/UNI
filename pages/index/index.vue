<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<view style="text-align: left">
			<MatrixField id="container" type="Container" v-bind="ContainerConfig" />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { inject, provide, ref } from 'vue';
	// import { Parser } from 'expr-eval';
	import { useGlobalStore } from '../../stores/global';

	// import MatrixInput from '../../components/matrix-input.vue';
	// import MatrixText from '../../components/matrix-text.vue';
	import MatrixField from '../../bee/matrix-field.vue'
	// import hoc from '../../components/hoc.js'
	// import matrixConpoment from '../../decorator/matrixConpoment';
	import { usePageStore } from '../../stores/page';

	// const TextHello = MatrixText;

	// const HiComponent = hoc(MatrixInput);

	// eval('alert(1)')
	const store = useGlobalStore();
	provide('globalStore', store)
	provide('page', usePageStore());

	const ContainerConfig = {
		props: {
			style: {
				border:' 1px solid #eee'
			}
		},
		children: [{
			type: 'Input',
			props: { id: "input", placeholder: "这是输入框, 数据会同步到下面的文本中" }
		}, {
			type: 'Text',
			props: { id: "text", content: { type: "expression", value: "`$${input.value} USD`" } }
		}]
	}

	// provide("MatrixFields", {
	// 	"Input": {components: MatrixInput, emits: },
	// 	"Text": MatrixText,
	// 	// "Container": 
	// })

	// const MInput = matrixConpoment(MatrixInput);
	// const MText = matrixConpoment(MatrixText);

	// const $entry = { id: 1 };
	// const parser = new Parser();
	// parser.functions.CONCAT = function (...args) {
	// 	return String.prototype.concat(...args);
	// };

	// const exprParse = (expression: string) => {
	// 	let expr = expression.trim();
	// 	if (/^`.*?\${(.*?).*?`$/.test(expr)) {
	// 		const vars = expr.match(/\$\{(.*?)\}/g);
	// 		let exprStr = expr.substring(1, expr.length - 1);
	// 		const exprKeys = [];
	// 		vars.forEach((i, idx) => {
	// 			const [left, ...right] = exprStr.split(i);
	// 			if (left) {
	// 				exprKeys.push(`'${left}'`);
	// 			}
	// 			exprKeys.push(i.match(/\$\{(.*?)\}/)[1]);
	// 			exprStr = right.join(i);
	// 			if (idx === 1) {
	// 				exprKeys.push(`'${right[0]}'`);
	// 			}
	// 		});
	// 		expr = `CONCAT(${exprKeys.join(',')})`;
	// 	}
	// 	return parser.parse(expr);
	// };

	// console.log(exprParse('$var').evaluate({ $var: 123 }));
	// console.log(exprParse('CONCAT("ABC","DEF")').evaluate({}));
	// console.log(exprParse('`${$entry.currency} ${$entry.price}`').evaluate({ $entry: { currency: 'RMB', price: 123 } }));

	// const dataSourceConfig = {
	// 	type: 'request',
	// 	value: {
	// 		name: 'txlHomePage',
	// 		params: [
	// 			{
	// 				dataType: 'model',
	// 				struture: [{ name: 'keywords', value: { value: '$input.value', type: 'value' } }, { name: 'category' }]
	// 			}
	// 		],
	// 		returns: { dataType: 'model', name: 'HomePage', sourceId: 'HomePage' }
	// 	}
	// };

	// console.log(exprParse('"$var"+$var').evaluate({ $var: 123}))

	const title = ref('hello world');
	// setTimeout(()=>{
	// 	store.toCart(1, 100)
	// },3000)
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
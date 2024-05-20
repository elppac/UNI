<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>

		<view style="text-align: left">
			<view>
				<text>{{ parser.parse('$global.total').evaluate({ $global: store }) }}</text>
			</view>
			<view>
				<text>{{ parser.parse('$global.getCartCountById($entry.id)').evaluate({ $global: store, $entry }) }}</text>
			</view>
			<view>
				<!-- <text>total: {{ store.total }}</text>
			<button type="primary" @click="store.toCart(3, 4)">添加ID:3, 数量:4</button> -->
				<text>ID 1 Count: {{ store.getCartCountById(1) }}</text>
				<button @click="store.toCart(1, store.getCartCountById(1) + 1)">添加ID:1, 数量:+1</button>
			</view>
			<view>
				<text>ID 2 Count: {{ store.getCartCountById(2) }}</text>
			</view>
			<view>
				<text>ID 3 Count: {{ store.getCartCountById(3) }}</text>
				<button @click="store.toCart(3, store.getCartCountById(3) + 1)">添加ID:3, 数量:+1</button>
			</view>
			<MInput id="$input" :click="{}"></MInput>
			<MText id="$text01" :content="{ type: 'expression', value: '`Text: ${$input.value} USD`' }" :dataSource="dataSourceConfig"></MText>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue';
import { Parser } from 'expr-eval';
import { useGlobalStore } from '../../stores/global';

import MatrixInput from '../../components/matrix-input.vue';
import MatrixText from '../../components/matrix-text.vue';
import matrixConpoment from '../../decorator/matrixConpoment';
import { usePageStore } from '../../stores/page';
// eval('alert(1)')
const store = useGlobalStore();
provide('globalStore', store)
provide('page', usePageStore());

const MInput = matrixConpoment(MatrixInput);
const MText = matrixConpoment(MatrixText);

const $entry = { id: 1 };
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
			if (idx === 1) {
				exprKeys.push(`'${right[0]}'`);
			}
		});
		expr = `CONCAT(${exprKeys.join(',')})`;
	}
	return parser.parse(expr);
};

console.log(exprParse('$var').evaluate({ $var: 123 }));
console.log(exprParse('CONCAT("ABC","DEF")').evaluate({}));
console.log(exprParse('`${$entry.currency} ${$entry.price}`').evaluate({ $entry: { currency: 'RMB', price: 123 } }));

const dataSourceConfig = {
	type: 'request',
	value: {
		name: 'txlHomePage',
		params: [
			{
				dataType: 'model',
				struture: [{ name: 'keywords', value: { value: '$input.value', type: 'value' } }, { name: 'category' }]
			}
		],
		returns: { dataType: 'model', name: 'HomePage', sourceId: 'HomePage' }
	}
};

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

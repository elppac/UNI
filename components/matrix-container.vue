<template>
	<view :style="css">
		<template v-if="disabledContainer!==true" v-for="(i,index) in childrenSchema" :key="i">
			<MatrixField v-bind='i' :id="i.props.id"/>
		</template>
	</view>
</template>

<script lang="ts" setup name="matrix-container">
	import { useAttrs } from 'vue';
	import MatrixField from '../bee/matrix-field.vue'
	// const props = defineProps(['childrenSchema',]);
	const attrs = useAttrs();
	const { style, gridRow, gridColumn, childrenSchema = [],disabledContainer } = attrs;
	const grid : any = {};
	if (gridColumn && gridColumn !== 1) {
		grid.gridColumn = `auto / span ${gridColumn}`;
	}
	if (gridRow && gridRow !== 1) {
		grid.gridRow = `auto / span ${gridRow}`;
	}
	const css = {...style, ...grid };
</script>
<template>
	<view>
		<text>{{ content }}</text>
	</view>
	<!-- <view>
			<text>{{ JSON.stringify(dataSource) }}</text>
		</view> -->
	<!-- <view>
			<button @click="$emit('request:dataSource', { ...dataSource.params, page: ++count, pageSize: 10 })">更新dataSource</button>
		</view> -->
</template>

<script lang="ts" setup name="matrix-text">
	import { ref, watchEffect } from 'vue';

	const emit = defineEmits(['request:dataSource', 'request:options']);
	const props = defineProps(['content', 'dataSource']);
	const count = ref(0);

	watchEffect(() => {
		console.log('这里可以打印出服务端返回的数据', props.dataSource, props.content)
	})
</script>
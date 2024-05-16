<template>
	<view>
		<view>
			<text>{{ content }}</text>
		</view>
		<view>
			<text>{{ JSON.stringify(dataSource) }}</text>
		</view>
		<view>
			<text><button @click="$emit('request:dataSource', { ...dataSource.params, page: count++, pageSize: 10 })">更新dataSource</button></text>
		</view>
	</view>
</template>

<script lang="ts" setup name="matrix-text">
import { ref } from 'vue';

const emit = defineEmits(['request:dataSource', 'request:options']);
const props = defineProps(['content', 'dataSource']);
const count = ref(0);
</script>

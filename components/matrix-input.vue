<template>
	<view>
		<input focus placeholder="这是INPUT" :value="props.value" @input="emit('update:value', $event.detail.value)" />
	</view>
</template>

<script lang="ts" setup name="matrix-input">
const props = defineProps(['value']);
const emit = defineEmits(['update:value']);
</script>

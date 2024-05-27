<template>
	<input focus :v-bind="attrs"  :value="props.value" @input="emit('update:value', $event.detail.value)" />
</template>

<script lang="ts" setup name="matrix-input">
import { useAttrs, watch, watchEffect } from 'vue';
const props = defineProps(['value']);
const emit = defineEmits(['update:value']);
const attrs = useAttrs();
watchEffect(()=>{
	console.log('attrs', attrs, useAttrs())
})
</script>

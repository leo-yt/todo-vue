<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
	<van-empty image="search" description="走丢了~">
		<van-button round type="primary" class="bottom-button" @click="router.push('/')">首页</van-button>
	</van-empty>
</template>
<style scoped lang="less">
	.van-empty {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translateY(-50%);
	}
	.bottom-button {
		width: 100px;
	}
</style>

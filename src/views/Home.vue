<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js';
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";

const size = parseInt(String(window.innerWidth / 12));
const router = useRouter();
const data = ref(new Array(size))
const list = ref([
	{ id: 100, text: '弹幕开启' },
	{ id: 101, text: '前方高能' },
	{ id: 102, text: '' },
	{ id: 103, text: '快来一发弹幕' },
	{ id: 104, text: '' },
	{ id: 105, text: '大佬牛逼' },
	{ id: 106, text: '666' },
	{ id: 107, text: '发送隐藏文字开启彩蛋' }
])
const content = ref();
const animate = ref();

const add = () => {
	list.value.push({
		id: list.value.length + 1,
		text: content.value
	})
	if (content.value === '开始' || content.value === '继续') {
		animate.value.play();
	}
	if (content.value === '暂停') {
		animate.value.pause();
	}
	if (content.value === '任务') {
		router.push('/tasks');
	}
	content.value = '';
}
onMounted(() => {
	animate.value = anime({
		targets: '.target-ul .target-li',
		loop: true,
		direction: 'alternate',
		autoplay: false,
		translateY: window.innerHeight - 140,
		delay: anime.stagger(100, { easing: 'easeOutQuad', from: 'last' })
	});
});
</script>

<template>
	<ul class="target-ul">
		<li v-for="item in data" :key="item" class="target-li"></li>
	</ul>
	<van-barrage v-model="list">
		<div class="video" />
	</van-barrage>
	<van-space class="home-space">
		<van-field
			v-model="content"
			placeholder="快来一发弹幕"
		/>
		<van-button @click="add" type="primary" size="small">发送</van-button>
	</van-space>
</template>
<style scoped lang="less">
.target-ul {
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
}
.target-li {
	width: 10px;
	height: 10px;
	background-color: darkgreen;
	margin: 0 1px;
}
.video {
	width: 100%;
	height: calc(100vh - 10px - 60px);
}
.home-space {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
	:deep(.van-space-item:first-child) {
		flex: 1;
	}
}

</style>

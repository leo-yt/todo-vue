<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from "axios";
import { TASKS, TASKS_UPDATE } from "../service";

const router = useRouter();
const { params } = useRoute();
const task = ref({});
const name = ref('');
const show = ref(false);
const date = ref('');

const p = (num) => num < 10 ? '0' + num : num;

const formatDate = (date) => `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
const onClickLeft = () => router.back();
const onChange = (data: boolean | string) => {
	if (typeof data === 'string') {
		name.value = data;
	} else {
		axios.post(TASKS_UPDATE, {
			id: params.id,
			is_finished: data,
		})
	}
}
const onBlur = () => {
	axios.post(TASKS_UPDATE, {
		id: params.id,
		name: name.value,
	})
}
const onConfirm = (value) => {
	const res = formatDate(value);
	show.value = false;
	date.value = res;
	axios.post(TASKS_UPDATE, {
		id: params.id,
		expire_time: res,
	})
}

const getTask = () => {
	axios.get(TASKS + '/' + params.id).then(res => {
		if (!res.data.data) {
			return;
		}
		task.value = res.data.data;
		name.value = res.data.data.name;
		if (res.data.data.expire_time) {
			date.value = formatDate(new Date(res.data.data.expire_time));
		}
	})
}
getTask();

</script>
<template>
	<div class="task-detail">
		<van-nav-bar
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
		/>
		<div class="task-content">
			<van-checkbox v-model="task.is_finished" @change="onChange" />
			<van-field
				v-model="task.name"
				type="text"
				clearable
				autocomplete="off"
				@update:model-value="onChange"
				@blur="onBlur"
				:class="task.is_finished ? 'task-finished' : ''"
			/>
		</div>
		<van-cell
			class="expire-time-cell"
			icon="notes-o"
			title="添加截止日期"
			:value="date"
			@click="show = true"
		/>
		<van-calendar
			v-model:show="show"
			:show-confirm="false"
			@confirm="onConfirm"
			:show-title="false"
			:show-subtitle="false"
			row-height="24"
			:style="{ height: '300px' }"
		/>
	</div>
</template>

<style scoped lang="less">
.task-detail {
	--van-nav-bar-background: #ddd;
	--van-border-color: transparent;
	--van-cell-background: transparent;
	--van-field-input-text-color: #000000;
	--van-cell-value-font-size: 18px;
	--van-cell-text-color: #000000;
	--van-cell-value-color: #000000;
	.task-content {
		display: flex;
		padding: 0 10px;
		.van-checkbox {
			padding-right: 5px;
		}
		.task-finished {
			:deep(.van-field__control) {
				text-decoration: line-through;
				color: rgba(0,0,0,.6)
			}
		}
	}
	.expire-time-cell {
		border-bottom: 1px solid #999;
	}
}

</style>


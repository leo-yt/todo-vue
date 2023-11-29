<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { showNotify } from 'vant';
import fetch from '../service/fetch';

import { TASKS_CREATE, TASKS, TASKS_UPDATE } from "../service";

const visible = ref(false);
const name = ref('');
const tasks = ref([]);
const router = useRouter();

const getTasks = () => {
	fetch(TASKS).then(res => {
		tasks.value = res.data.map(item => ({
			...item,
			is_finished: !!item.is_finished,
		}));
	});
}
const addTask = () => {
	fetch(TASKS_CREATE, {
		data: {
			name: name.value
		},
		method: 'POST'
	}).then((res) => {
		if (res.code === 200) {
			name.value = '';
			visible.value = false;
			showNotify({
				message: '添加成功',
				type:'success',
				duration: 800
			});
			getTasks();
		} else {
			showNotify({
				message: res.msg,
				type: 'danger',
				duration: 800
			});
		}

	})
}
const onDelete = (id: number) => {
	fetch(TASKS + '/' + id, {
		method: 'DELETE'
	}).then((res) => {
		if (res.code === 200) {
			showNotify({
				message: '删除成功',
				type:'success',
				duration: 800
			});
			getTasks();
		}
	})
}
const onChange = (v: boolean,  obj: any) => {
	fetch(TASKS_UPDATE, {
		data: {
			id: obj.id,
			is_finished: v,
			name: obj.name
		},
		method: 'POST'
	}).then(res => {
		if (res.code === 200) {
			getTasks();
		}
	})
}
const onEdit = (id: number) => {
	router.push('/tasks/' + id)
}
getTasks();

</script>
<template>
	<div class="tasks-container">
		<h1 class="task-title">待办事项</h1>
		<div v-if="!tasks.length" class="flex items-center justify-center h-72">
			<van-empty description="请添加事项吧！" />
		</div>
		<div v-else class="tasks-list">
			<van-swipe-cell v-for="task in tasks" :key="task.id">
				<van-checkbox class="task-checkbox" v-model="task.is_finished" @change="(v) => onChange(v, task)">
					<span :class="task.is_finished ? 'task-finished': ''">{{task.name}}</span>
				</van-checkbox>
				<template #right>
					<van-button square type="warning" text="编辑" @click="() => onEdit(task.id)"/>
					<van-button square type="danger" text="删除" @click="() => onDelete(task.id)"/>
				</template>
			</van-swipe-cell>
		</div>
		<div class="tasks-add" @click="visible = true" round>
			<van-icon name="plus" /> &nbsp;&nbsp;添加事项
		</div>
		<van-popup
			v-model:show="visible"
			position="bottom"
			:style="{ height: 'auto' }"
		>
			<van-field
				v-model="name"
				type="text"
				placeholder="请输入事项名称"
				maxlength="10"
				clearable
				autocomplete="off"
			/>
			<van-button
				type="success"
				@click="addTask"
				:disabled="!name"
				size="large"
				style="border: none; border-radius: 0"
			>
				添加
			</van-button>
			<van-button
				type="default"
				@click="visible = false"
				size="large"
				style="border: none; border-radius: 0"
			>
				取消
			</van-button>
		</van-popup>
	</div>
</template>

<style scoped lang="less">
@font-color: #ffffff;

.tasks-container {
	padding: 10px 10px 40px 10px;
	--van-checkbox-label-color: @font-color;
	--van-button-large-height: 40px;
}
.task-title {
	font-size: 28px;
	margin-bottom: 10px;
	font-weight: bold;
}
.tasks-list {
	max-height: calc(100vh - 140px);
	overflow-y: auto;
	.van-swipe-cell {
		margin: 3px 0;
		.task-checkbox {
			height: 50px;
			background: var(--van-button-primary-background);
			padding-left: 10px;
			font-weight: bold;
			.task-finished {
				text-decoration: line-through;
				color: rgba(255,255,255,.6)
			}
		}
		.van-swipe-cell__right {
			.van-button {
				height: 50px;
				color: @font-color;
				cursor: pointer;
			}
		}
	}
}
.tasks-add {
	height: 50px;
	line-height: 50px;
	font-size: 16px;
	color: var(--van-button-primary-color);
	cursor: pointer;
	background: var(--van-button-primary-background);
	border-radius: 4px;
	display: flex;
	align-items: center;
	padding-left: 10px;
	user-select: none;
	position: absolute;
	left: 10px;
	right: 10px;
	bottom: 40px;
}

.tasks-add:active {
	background: var(--van-button-primary-border-color);
}

</style>

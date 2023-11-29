<script setup lang="ts">
import { ref } from 'vue';
import { LOGIN, REGISTER } from "../service";
import { showNotify } from 'vant';
import { useRouter } from 'vue-router';
import fetch from "../service/fetch";

const username = ref('');
const password = ref('');
const cPassword = ref('');
const pageType = ref('login');
const router = useRouter();

const onSubmit = () => {
	if (pageType.value === 'login') {
		fetch(LOGIN, {
			data: {
				user_name: username.value,
				password: password.value,
			},
			method: 'POST',
		}).then(res => {
			const success = res.code === 200;
			showNotify({
				message: success ? '登录成功' : res.msg,
				type: success ? 'success' : 'danger',
				duration: 800,
				onClose() {
					if (success) {
						localStorage.setItem('user_id', res.data.id);
						router.push('/');
					}
				}
			});
		})
	} else {
		if (password.value !== cPassword.value) {
			showNotify({
				message: '两次密码不一致',
				type: 'danger',
				duration: 800
			});
			return;
		}
		fetch(REGISTER, {
			data: {
				user_name: username.value,
				password: password.value,
			},
			method: 'POST',
		}).then(res => {
			const success = res.code === 200;
			showNotify({
				message: success ? '注册成功' : res.msg,
				type: success ? 'success' : 'danger',
				duration: 800
			});
			if (success) {
				pageType.value = 'login';
			}
		})
	}
};

const onSwitch = () => {
	if (pageType.value === 'login') {
		pageType.value ='register';
	} else {
		pageType.value = 'login';
	}
}

</script>
<template>
	<h1 class="login-title">{{pageType === 'login' ? '登录' : '注册'}}</h1>
	<van-form @submit="onSubmit" class="login-form">
		<van-cell-group inset>
			<van-field
				v-model="username"
				name="用户名"
				label="用户名"
				placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]"
			/>
			<van-field
				v-model="password"
				type="password"
				:name="pageType === 'login' ? '密码' : '设置密码'"
				:label="pageType === 'login' ? '密码' : '设置密码'"
				:placeholder="pageType === 'login' ? '密码' : '设置密码'"
				:rules="[{ required: true, message: '请填写密码' }]"
			/>
			<van-field
				v-if="pageType === 'register'"
				v-model="cPassword"
				type="password"
				name="确认密码"
				label="确认密码"
				placeholder="确认密码"
				:rules="[{ required: true, message: '请填写密码' }]"
			/>
		</van-cell-group>
		<div style="margin: 16px 16px 0 16px;">
			<van-button block type="primary" native-type="submit">
				提交
			</van-button>
		</div>
		<van-button type="text" class="switch-btn" @click="onSwitch">
			切换为{{pageType === 'login' ? '注册' : '登录'}}
		</van-button>
	</van-form>
</template>

<style scoped lang="less">
	.login-form {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translateY(-50%);
	}
	.login-title {
		font-size: 28px;
		margin-top: 95px;
		margin-left: 20px;
	}
	.switch-btn {
		width: 100%;
	}

</style>

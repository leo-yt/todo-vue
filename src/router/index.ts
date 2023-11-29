import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "../views/Home.vue";
import Tasks from "../views/Tasks.vue";
import TaskDetail from "../views/TaskDetail.vue";
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
	{
		path: "/tasks",
		name: "tasks",
		component: Tasks,
	},
	{
		path: "/tasks/:id",
		name: "taskDetail",
		component: TaskDetail,
	},
	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/:catchAll(.*)",
		component: NotFound
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router;

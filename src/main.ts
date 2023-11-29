import { createApp } from 'vue'
import './style.css'
import router from './router';
import App from './App.vue';
import {
	Icon, Empty, SwipeCell, Button,
	Cell, Radio, Popup, Field, Notify,
	Checkbox, NavBar, Calendar, Form,
	CellGroup, Barrage, Space,
} from 'vant';
import 'vant/lib/index.css';

const app = createApp(App)
app.use(router).use(Button).use(Cell)
	.use(Icon).use(Empty).use(SwipeCell)
	.use(Radio).use(Popup).use(Field)
	.use(Notify).use(Checkbox).use(NavBar)
	.use(Calendar).use(Form).use(CellGroup)
	.use(Barrage).use(Space)
app.mount('#app')


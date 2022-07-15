import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import io from 'socket.io-client';
import mitt from 'mitt';
const emitter = mitt();
const app = createApp(App);

const socket = io('http://localhost:3001');
// app.provide('socket', socket);

socket.on('connect', () => {
    if(router.currentRoute === "/error") {
        router.push('/');
    } 
});

socket.on('connect_error', () => {
    router.push('/error');
});

app.config.globalProperties.$emitter = emitter;
app.config.globalProperties.$socket = socket;
app.use(router);
app.mount("#app");



<script setup>
import Sidebar from "/src/components/mainchat/sidebar/Sidebar.vue";
import Background from "/src/components/DefaultBackground.vue";
import Chat from "/src/components/mainchat/Chat.vue"
import * as utils from '/src/js/utils.js';
</script>

<script>
export default {
    mounted() {
        this.$socket.emit('Request user data', utils.getCookie('token'));

        this.$socket.on('Respond user data', (user, availableEmotes) => {
            this.$socket.user = user;
            this.$emitter.emit('Load instances', user.properties.instances);
        });
    },
    unmounted() {
        this.$socket.off('Respond user data');
    }
}
</script>

<template>
    <div>
        <Background />
        <div id="page-container">
            <Sidebar />
            <Chat />
        </div>
    </div>
    
</template>

<style scoped>
#page-container {
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    display: flex;
    position: absolute;
    flex-direction: row;
}

#topbar-container {
    display: flex;
    flex-grow: 1;
}
</style>
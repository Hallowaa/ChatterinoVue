<script setup>
import '/src/assets/main.css';
import CurrentChannel from "/src/components/mainchat/topbar/CurrentChannel.vue";
import ChannelEntry from './ChannelEntry.vue';
</script>

<script>
export default {
    data() {
        return {
            channels: []
        }
    },
    created() {
        this.$socket.on('Respond instance data', (instance) => {
            this.$socket.currentInstanceID = instance._id;
            this.$socket.currentInstanceName = instance.properties.name;
            this.channels = [];
            for(const channel of instance.properties.channels) {
                this.channels.push(channel);
            }
            this.$emitter.emit('Update current location');
        });
    },
    unmounted() {
        this.$socket.off('Respond instance data');
    },
    methods: {
        join(_id) {
            if(this.$socket.currentChannelID != _id) {
                this.$socket.emit('Request channel data', _id, this.$socket.currentChannelID);
            }
        }
    }
}
</script>

<template>
    <div id="sidebar" class="font-default font-bright bg-gray-800">
        <CurrentChannel />
        <div id="elements-container">
            <div v-for="channel in channels" :key="channel._id">
                <component :is="ChannelEntry" v-bind="{ channelName: channel.properties.name }" @click="join(channel._id)"></component>
            </div>
        </div>
        <div id="footer"></div>
    </div>
</template>

<style scoped>
#sidebar {
    display: flex;
    flex-direction: column;
    flex-basis: 350px;
    box-shadow: 0px 0px 10px black;
    overflow: hidden;
}

#elements-container {
    display: flex;
    flex-grow: 15;
    flex-direction: column;
    overflow-y: auto;
}

#footer {
    display: flex;
    margin-top: auto;
    box-shadow: 0px 0px 10px black;
    flex-basis: 60px;
}

</style>
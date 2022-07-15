<script>
export default {
    mounted() {
        this.$emitter.on('Update current location', () => {
            let instance = this.$socket.currentInstanceName?`@${this.$socket.currentInstanceName}`:'';
            let channel = this.$socket.currentChannelName?`#${this.$socket.currentChannelName}`:'';
            document.getElementById('current-channel-data').textContent = `${channel} ${instance}`;
        });
    },
    unmounted() {
        this.$emitter.off('Update current location');
    }
}
</script>

<template>
    <div id="current-channel" class="font-default font-bright">
        <div id="current-channel-data">
            The void
        </div>
    </div>
</template>

<style scoped>
#current-channel {
    display: flex;
    align-items: center;
    flex-basis: 70px;
    flex-grow: 0;
    box-shadow: 0px 0px 10px black;
}

#current-channel-data {
    display: flex;
    margin-left: 20px;
    font-size: large;
}
</style>
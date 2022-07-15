<script setup>
import Instances from "/src/components/mainchat/topbar/Instances.vue";
import InstanceEntry from "./topbar/InstanceEntry.vue";
import MessageEntry from "./MessageEntry.vue"
import Input from "./Input.vue";
</script>

<script>

function processBatch(batch) {
    let previousID;
    for(const message of batch) {
        if(message.properties.creator._id === previousID) {
            message.properties.displayHeader = false;
        } else {
            message.properties.displayHeader = true;
            previousID = message.properties.creator._id;
        }
    }
}

export default {
    data() {
        return {
            messages: []
        }
    },
    mounted() {
        let scroll = false;
        
        this.$socket.on('Respond channel data', (channel) => {
            this.$socket.loadedMessagesAmount = 0;
            this.$socket.currentChannelID = channel._id;
            this.$socket.currentChannelName = channel.properties.name;
            this.$socket.lastSeenMessage = null;
            this.$emitter.emit('Update current location');
            document.getElementById('input-container').style.display = 'flex';

            scroll = true;
            this.$socket.emit('Request message batch', this.$socket.loadedMessagesAmount, this.$socket.currentChannelID);
        });
        this.$socket.on('Respond message batch', (batch) => {
            this.$socket.loadedMessagesAmount += batch.length;
            processBatch(batch);
            this.messages = batch;

            // Scroll to the bottom after all messages have been mounted.
            // Without doing this, the behaviour of simply calling container.scrollTop = container.scrollHeight is inconsistent
            let expected = batch.length;
            let mounted = 0;
            if(batch.length > 0) {
                this.$emitter.on('Message mounted', () => {
                    mounted++;
                    if(mounted == expected) {
                        const container = this.$el.querySelector('#messages-container');
                        container.scrollTop = container.scrollHeight;
                        this.$emitter.off('Message mounted');
                    }
                });
            }
        });
        this.$socket.on('Get new message', (channelID, message) => {
            console.log(message);
        })
        
    },
    unmounted() {
        this.$socket.off('Respond channel data');
        this.$socket.off('Respond message batch');
        this.$emitter.off('Message mounted');
    }
}
</script>

<template>
    <div id="chat-container">
        <Instances />
        <div id="chat" class="bg-gray-700 font-default font-bright">
            <ol id="messages-container">
                <li v-for="message in messages" :key="message._id">
                    <div>
                        <component :is="MessageEntry" :key="message._id" v-bind="{ displayHeader: message.properties.displayHeader, creatorID: message.properties.creator._id, creatorName: message.properties.creator.properties.username, creatorIcon: message.properties.creator.profile.icon, date: message.properties.dateCreated, content: message.content.text, edited: message.properties.edited, deleted: message.properties.deleted }"></component>
                    </div>
                </li>
            </ol>
            <div id="input-container">
                <Input />
            </div>
        </div>
    </div>
</template>

<style scoped>
#chat-container {
    display: flex;
    flex-direction: column;
    flex: 1;
}

#chat {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    min-height: 0;
}

#messages-container {
    overflow-y: auto;
    list-style-type: none;
    margin-right: 10px;
    flex-grow: 0;
    padding-left: 0;
}

#input-container {
    display: none;
    flex-direction: row;
    margin: 10px;
    margin-bottom: 30px;
    margin-top: 0px;
}

</style>
<script setup>
import '/src/assets/main.css';
import * as emoteHandler from '/src/js/emote-handler.js';
</script>

<script>
export default {
    mounted() {
        const input = document.getElementById('input');
        input.addEventListener('keydown', (e) => {
            if(this.$socket.currentChannelID == null || this.$socket.currentInstanceID == null) {
                e.preventDefault();
            }

            if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if(input.textContent.trim().length > 0) {
                const message = {
                    content: {
                        text: emoteHandler.insertEmoteString(input.textContent)
                    },
                    properties: {
                        creator: this.$socket.user,
                        dateCreated: Date.now().toString(),
                        deleted: false,
                        edited: false
                    }
                }
                    input.textContent = '';
                    this.$socket.emit('Send new message', this.$socket.currentInstanceID, this.$socket.currentChannelID, message);
                }
            }
        });

        
    }
}
</script>

<template>
    <div role="textbox" contenteditable="true" id="input" class="bg-gray-600 font-default font-bright"></div>
</template>

<style scoped>
#input {
    display: flex;
    align-items: center;
    border: none;
    resize: none;
    align-content: center;
    border-radius: 10px;
    font-size: large;
    padding: 1em;
    flex: 1;
    max-width: inherit;
    max-height: 100px;
    word-break: break-all;
    overflow-x: hidden;
    outline: none;
}
</style>
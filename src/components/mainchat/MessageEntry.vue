<script setup>
import { onMounted } from '@vue/runtime-core';
import '/src/assets/main.css';

const props = defineProps({
    displayHeader: Boolean,
    creatorID: String,
    creatorName: String,
    creatorIcon: String,
    date: String,
    content: String,
    edited: Boolean,
    deleted: Boolean
});

function addZeroFront(value) {
    return (value < 10?'0' + value:value);
}

function formatDate(unixDate) {
    let date = new Date(parseInt(unixDate));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const pmOrAm = hours/12>=1?'PM':'AM';
    if (day == new Date(Date.now()).getDate()) {
        return ('Today at ' + addZeroFront(hours%12) + ':' + addZeroFront(minutes) + ' ' + pmOrAm);
    }
    else {
        return (addZeroFront(day) + '/' + addZeroFront(month) + '/' + year);
    }
}
</script>

<script>
export default {
    mounted() {
        this.$emitter.emit('Message mounted');
    }
}
</script>

<template>
    <div id="message-container">
        <div id="message">
            <div id="icon-container">
                <div v-if="displayHeader">
                    <img id="icon" :src="creatorIcon">
                </div>
            </div>
            <div>
                <div v-if="displayHeader">
                    <div id="header">
                        <span id="creator">{{ creatorName }} </span>
                        <span id="date"> {{ formatDate(date) }}</span>
                    </div>
                </div>
                <div id="content">{{ content }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#message-container {
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 15px;
    
}

#message-container:hover {
    background-color: rgb(20, 20, 20);
}

#message {
    display: flex;
    flex-direction: row;
    margin-left: 15px;
}

#date {
    margin-left: 4px;
    color: rgba(240, 248, 255, 0.63);
    font-size: small;
}

#header {
    margin-bottom: 5px;
}

#creator {
    font-size: 18px;
    font-weight: 500;
}

#icon-container {
    min-width: 60px;
}

#icon {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
}

#content {
    font-weight: 300;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
}
</style>
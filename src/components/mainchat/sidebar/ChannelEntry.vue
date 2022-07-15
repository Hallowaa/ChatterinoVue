<script setup>

const props = defineProps({
    channelName: String
});

</script>

<template>
    <div id="channel-container" class="bg-gray-700">
        <div id="channel-name">
            #{{ channelName }}
        </div>
    </div>
</template>

<style scoped>
#channel-container {
    padding: 20px;
    margin: 5px;
    margin-bottom: 0px;
    margin-top: 10px;
    border-radius: 10px;
    justify-content: left;
    cursor: pointer;
}

#channel-container:hover {
    background-color: rgb(35, 35, 35);
}
</style>
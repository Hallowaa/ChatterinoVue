<script setup>
import '/src/assets/main.css';
import { onMounted } from 'vue';
const props = defineProps({
    instanceName: String,
    icon: String
});
</script>

<template>
    <div id="instance-entry-container" class="bg-gray-700">
        <div id="instance-icon-container" class="bg-gray-300">
            <div id="instance-icon" class="font-default font-bright">
                <div v-if="icon">
                    <img :src="icon">
                </div>
                <div v-else>
                    {{ instanceName.charAt(0) }}
                </div>
            </div>
        </div>
        <div id="instance-name" class="font-default font-bright">
            {{ instanceName }}
        </div>
    </div>
</template>

<style scoped>
#instance-entry-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 6px;
    margin-left: 10px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
}

#instance-entry-container:hover {
    background-color: rgb(35, 35, 35);
}

#instance-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 25%;
    height: 1em;
    width: 1em;
    padding: 10px;
    margin-right: 10px;
}

.instance-icon {
    height: 1em;
    width: 1em;
    object-fit: cover;
}

.instance-icon-null {
    height: 1em;
    width: 1em;
}
</style>
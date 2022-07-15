<script setup>
import { createElementVNode } from '@vue/runtime-core';
import InstanceEntry from './InstanceEntry.vue';
</script>

<script>
export default {
    data() {
        return {
            instances: []
        }
    },
    created() {
        this.$emitter.on('Load instances', instances => {
            for(const instance of instances) {
                this.instances.push(instance);
            }
        });
    },
    unmounted() {
        this.$emitter.off('Load instances');
    },
    methods: {
        join(_id) {
            this.$socket.emit('Request instance data', _id, this.$socket.currentInstanceID);
        }
    }
}
</script>

<template>
    <div id="instances-container" class="font-default font-bright text-center bg-gray-800">
        <div v-for="instance in instances" :key="instance._id">
            <component :is="InstanceEntry" v-bind="{ instanceName: instance.properties.name, icon: instance.properties.icon }" @click="join(instance._id)"></component>
        </div>
    </div>
</template>

<style scoped>
#instances-container {
    display: flex;
    z-index: 2;
    flex-direction: row;
    flex-basis: 70px;
    box-shadow: 0px 0px 10px black;
    align-items: center;
}
</style>
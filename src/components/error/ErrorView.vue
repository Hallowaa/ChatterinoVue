<script setup>
import '/src/assets/main.css';
</script>

<template>
    <div id="main" class="font-default">
        <div id="error-text">
            An unexpected error occurred.
        </div>
    </div>
</template>

<style scoped>
#main {
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:black
}

#error-text {
    font-size: xx-large;
    font-weight: bolder;
    background-color: aliceblue;
    padding: 50px;
}
</style>
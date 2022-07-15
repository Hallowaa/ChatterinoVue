<script setup>
import '/src/assets/main.css';
</script>

<script>
import router from '/src/router';
export default {
    mounted() {
        this.$socket.on('Login success', (token) => {
            document.cookie = "token=" + token;
            router.push('/mainchat');
        });
    },
    methods: {
        login() {
        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;
        this.$socket.emit('Login', username, password);
        }
    },
    unmounted() {
        this.$socket.off('Login success');
    }
}
</script>

<template>
    <div id="page-container">
        <div id="login-container" class="bg-gray-800 font-bright font-default">
            <div id="welcome-text-container text-center">
                <h1 id="welcome-text" class="bg-gray-700">Welcome to Chatterino!</h1>
            </div>
            <div id="login-data-container">
                <form>
                    <p>
                        <label for="username-input">Username</label>
                        <input class="font-default" type="text" id="username-input" spellcheck="false">
                    </p>
                    <br>
                    <p>
                        <label for="password-input">Password</label>
                        <input class="font-default" type="password" id="password-input" spellcheck="false">
                    </p>
                </form>
                <button class="font-default bg-gray-700 font-bright" id="login-button" @click="login">Log in</button>
            </div>
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
    align-items: center;
    justify-content: center;
}

#login-container {
    padding: 30px;
    border-radius: 30px;
    box-shadow: 0px 0px 20px black;
}

#welcome-text-container {
    padding: 20px;
    
}

#welcome-text {
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 0px 10px black;
    margin-bottom: 40px;
}

#login-data-container {
    padding-top: 5px;
}

#login-button {
    border-radius: 10px;
    border: none;
    margin-top: 20px;
    padding: 15px;
    cursor: pointer;
    font-size: large;
}

#login-button:hover {
    background-color: rgb(35, 35, 35);
}

form  { display: table;      }
p     { display: table-row;  }
label { display: table-cell; padding-right: 30px;}
input { 
    display: table-cell;
    border: none;
    border-radius: 5px;
    padding: 5px;
}
</style>
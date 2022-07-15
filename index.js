import * as userHandler from './user-handler.js';
import 'dotenv/config';
import * as db from './db.js';
import { Server } from 'socket.io';

const server = new Server(3001, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

function onConnection(socket) {
    socket.on('Login', (username, password) => userHandler.login(username, password));
    socket.on('Request user data', (token) => userHandler.respondUserData(token));
    socket.on('Request create instance', () => { /* TODO */ });
    socket.on('Request join instance', (userID, instanceID) => userHandler.respondJoinInstance(userID, instanceID));
    socket.on('Request instance data', (newInstanceID, oldInstanceID) => userHandler.respondInstanceData(newInstanceID, oldInstanceID));
    socket.on('Request channel data', (newChannelID, oldChannelID) => userHandler.respondChannelData(newChannelID, oldChannelID));
    socket.on('Request icon change', (userID, bytes, type) => userHandler.saveIconChange(userID, bytes, type));
    socket.on('Request create emote', (userID, instanceID, bytes, type, emoteData) => userHandler.createEmote(socket, userID, instanceID, bytes, type, emoteData));
    socket.on('Send new message', (instanceID, channelID, messageData) => userHandler.sendMessageInChannel(instanceID, channelID, messageData));
    socket.on('Request message batch', (offset, channel) => userHandler.respondMessageBatch(offset, channel))
    socket.on('disconnect', (reason) => db.socketLeaveAll(socket.id));
}

server.on('connection', (socket) => {
    userHandler.init(server, socket);
    onConnection(socket);
});


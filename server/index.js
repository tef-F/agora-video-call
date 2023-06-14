require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 5000;
const app = express();
const server = require('http').createServer(app);
const db = require('./config/db/mongoDB');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST'],
    },
});

db.connectDB();

app.use(
    cors({
        origin: '*',
        method: ['GET', 'POST'],
    }),
);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.use('/user', require('./routes/user'));

server.listen(PORT, () => {
    console.log('Server is listening on PORT:', PORT);
});

const connectedUsers = {};
io.on('connection', async (socket) => {
    socket.on('login', ({ userId, me }) => {
        connectedUsers[userId] = me;
        console.log(connectedUsers);
        io.emit('updateOnlineUsers', connectedUsers);
    });
    socket.on('logout', (userId) => {
        delete connectedUsers[userId];
        io.emit('updateOnlineUsers', connectedUsers);
    });

    // Listen for chat messages
    socket.on('chat', (data) => {
        io.emit('chat', data);
    });
    socket.emit('me', socket.id);

    socket.on('endCall', (userId) => {
        console.log('EndCall', connectedUsers[userId]);
        // io.to(connectedUsers[userId]).emit('callEnded', {
        //     id: connectedUsers[userId],
        // });
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} is disconnected...`);
        socket.broadcast.emit('callended');
    });

    socket.on('calluser', ({ userToCall, signalData, from, name }) => {
        const id_t = connectedUsers[userToCall];
        const id_call = connectedUsers[from];
        console.log('Call user id', id_t);
        io.to(connectedUsers[userToCall]).emit('calluser', {
            signal: signalData,
            from,
            name,
        });
    });

    socket.on('answercall', (data) => {
        io.to(data.to).emit('callaccepted', data.signal);
    });
    /// Meet ------------------------------
    // on user join the meething room
    socket.on('me1', (data) => {
        socket.emit('getid', data);
    });

    socket.on('join', (room, id, name) => {
        socket.join(room);

        if (!parties.includes(id)) {
            parties.push({ id, name });
        }

        // for chacking how many users are there in meeting
        const size = io.sockets.adapter.rooms.get(room).size;
        // console.log(size)

        // sending the user id to other users to make the call
        socket.broadcast.to(room).emit('user-connect', id, size, name);

        // tell the name to other
        socket.on('tellname', (name, id) => {
            socket.broadcast.to(room).emit('addname', name, id);
        });

        // disconnect event
        socket.on('disconnect', () => {
            const index = parties.findIndex((peer) => (peer.id = id));
            if (index > -1) {
                // only splice array when item is found
                parties.splice(index, 1); // 2nd parameter means remove one item only
            }
            socket.broadcast.to(room).emit('user-disconnected', id);
        });
    });

    // user leave the meeting
    socket.on('user-left', (id, room) => {
        socket.leave(room);
        socket.disconnect();
        socket.broadcast.to(room).emit('user-disconnected', id);
    });
});

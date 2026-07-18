const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data});
    });

    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
        io.emit("User-disconnected", socket.id);
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
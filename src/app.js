const express = require('express');
// const { createServer } = require('http');
// const {Server} = require("socket.io");
import Routers from './routes/Routes';
import cookieParser from 'cookie-parser';

const app= express()

const cors = require("cors")
app.use(
    cors({
        origin: 'http://192.168.2.182:3000',
        // origin: 'http://localhost:3000',
        credentials: true
    })
)

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}));
app.use(Routers); 

// const server = createServer(app)
// const io = new Server(server, {
//   cors: {
//     origin: "https://example.com", // Replace with your frontend URL
//     methods: ["GET"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("connected");
// });

export default app
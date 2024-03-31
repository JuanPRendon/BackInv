const express = require('express');
<<<<<<< HEAD
// const { createServer } = require('http');
// const {Server} = require("socket.io");
import router from './routes/invRoutes';
=======
import Routers from './routes/Routes';
>>>>>>> ac400390c638a2400625ad33a4e8989c16260781
import cookieParser from 'cookie-parser';

const app= express()

const cors = require("cors")
app.use(
    cors({
        // origin: 'http://192.168.2.182:3000',
        origin: 'http://localhost:3000',
        credentials: true
    })
)

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}));
app.use(router); 

export default app
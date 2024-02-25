const express = require('express');
import Routers from './routes/Routes';
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
app.use(Routers); 

export default app
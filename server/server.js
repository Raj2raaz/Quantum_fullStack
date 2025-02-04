import express from 'express';
import dbConnect from './db/db.config.js';
import dotenv from 'dotenv';
import userRoutes from './user.route.js';
import cors from 'cors';

dotenv.config()

const app = express();

app.use(cors());

app.use(express.json())

// app.use('/' , (req, res)=> {
//     res.send("Hello World");
// })

app.use("/api", userRoutes);

dbConnect();

app.listen(process.env.PORT || 4000, ()=> {
    console.log('server is live')

})
import express from 'express';
import mysql from 'mysql2'
import cors from 'cors';
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt';
import { registerUser,loginUser } from './controllers/user.js';

const app = express();
const PORT = 8000 || process.env.PORT;;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))



app.post('/register', registerUser);
app.post('/login', loginUser);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

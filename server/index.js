import { config } from 'dotenv';
config();
import express from "express";
import cors from 'cors';
import { apiRouter } from './routes/apiRouter.js';
import { authRouter } from './routes/authRouter.js';
import { userDataRouter } from './routes/userDataRouter.js';

const app = express();
const PORT = 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/userData', userDataRouter);

app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}`));



/* 

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
});
 */
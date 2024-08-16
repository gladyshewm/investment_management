import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { apiRouter } from './src/routes/financialRouter.js';
import { authRouter } from './src/routes/authRouter.js';
import { userDataRouter } from './src/routes/userRouter.js';
config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/userData', userDataRouter);

app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}`));

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import connectDatabse from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import noteRoutes from './routes/noteRoutes.js'
import rateLimiter from './middleware/rateLimiter.js'

const app = express();
const PORT = process.env.PORT || 8000;  

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/notes', noteRoutes)


connectDatabse().then( () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
});
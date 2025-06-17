import express from 'express';
import mongoose from 'mongoose';
import postRoutes from "./routs/post.routes.js";
import userRoutes from "./routs/userAccount.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import config from './config/config.js';
import authentication from "./middleware/authentication.middleware.js";
import {createAdmin} from "./config/initAdmin.js";

const app = express();

app.use(express.json())
app.use(authentication)
app.use('/forum', postRoutes)
app.use('/account', userRoutes)
app.use(errorHandler);

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongo.uri, config.mongo.db);
            await createAdmin();
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.log('MongoDB Connection error', err);
    }
}

const startServer = async () => {
    await connectDB();
    app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}. Press Ctrl-C to finish`);
    })
}

startServer();


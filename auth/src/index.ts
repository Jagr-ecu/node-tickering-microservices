import mongoose from "mongoose";

import { app } from "./app";


const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY debe ser definido');
    }

    try {
        //url de servicio de kubernetes
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {});
        console.log('conectando a mongo db');
    } catch (error) {
        console.error(error);
    }

    app.listen(3000, () => {
        console.log('Auth en puerto 3000');
    });
};

start();
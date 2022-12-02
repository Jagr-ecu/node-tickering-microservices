import mongoose from "mongoose";

import { app } from "./app";


const start = async () => {
    //los .env se los obtiene de kubernetes, se los establecio en el depl
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY debe ser definido');
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI debe ser definido');
    }

    try {
        //url de servicio de kubernetes
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log('conectando a mongo db');
    } catch (error) {
        console.error(error);
    }

    app.listen(3000, () => {
        console.log('Auth en puerto 3000');
    });
};

start();
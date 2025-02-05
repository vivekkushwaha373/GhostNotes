import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection: ConnectionObject = {}

export default async function dbconnect(): Promise<void> {
    if (connection.isConnected) {
        console.log('Already connected to database');
        return 
    }

    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || '', {/*options*/ })
        
        connection.isConnected = db.connections[0].readyState;
        
        console.log('dbconnection array--> ',db.connections)
        console.log('Db connected successfully');


    } catch (error) {
        console.log('Databse connection failed', error);
        process.exit(1);
    }
}
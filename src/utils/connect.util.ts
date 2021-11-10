require("dotenv").config();
import mongoose  from "mongoose";
import log from './logger.util';

const connect = async () =>{
    try {
        await mongoose.connect(<string>process.env.DB_URL)
        log.info("Mongo Atlas Connected")
    } catch (error: any) {
        log.error(error)
    }
}

export default connect
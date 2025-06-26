import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path: path.join(process.cwd(), '.env')});


export default {
    NODE_ENV: process.env.NODE_ENV,
    DB_URL:process.env.DB_URL,
    port: process.env.PORT,
}


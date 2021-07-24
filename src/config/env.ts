
import dotenv from 'dotenv';

// load config file(.env)
dotenv.config();

const ENV = {
    DEFAULT_PORT: process.env.DEFAULT_PORT ? process.env.DEFAULT_PORT : '/dev/serial0',
    DEFAULT_BAUDRATE: process.env.DEFAULT_BAUDRATE ? parseInt(process.env.DEFAULT_BAUDRATE) : 115200,
}

export default ENV;

import path from 'path';
import ENV from './env';

const rootPath = path.resolve(path.join(__dirname, '..'));
const distPath = path.join(rootPath, 'dist');
const staticPath = path.join(rootPath, 'static');


export const main = {
    paths: {
        distPath,
        staticPath
    },
    serial: {
        port: ENV.DEFAULT_PORT,
        baudrate: ENV.DEFAULT_BAUDRATE
    }
};
export const renderer = {

};

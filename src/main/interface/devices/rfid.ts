import SerialPort from 'serialport';
import pn532 from 'pn532';
import { EventEmitter } from 'events';
import { main as config } from '../../../config';


class RFID extends EventEmitter {
    private port: string;
    private baudRate: number;
    private rfid: any | null;

    constructor() {
        super();
        this.port = config.serial.port;
        this.baudRate = config.serial.baudrate;
        this.rfid = null;
    }

    config(port: string, baudRate: number) {
        this.port = port;
        this.baudRate = baudRate;
    }

    init() {
        const option = { baudRate: this.baudRate };
        const serialPort = new SerialPort(this.port, option);
        this.rfid = new pn532.PN532(serialPort);

        // Poll for a tag
        this.rfid.on('ready', async () => {
            console.info('Listening for a tag scan...');
            this.rfid.on('tag', (tag: { ATQA: any, SAK: number, uid: string}) => {
                // console.log(tag);
                // { ATQA: <Buffer 00 44>, SAK: 0, uid: '53:d8:f3:f5:01:3d:c0' }
                this.emit('tag', tag.uid);
            });
        });
    }
}

const rfid = new RFID();
export default rfid;

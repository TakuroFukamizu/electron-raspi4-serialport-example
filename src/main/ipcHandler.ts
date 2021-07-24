import { ipcMain, BrowserWindow } from 'electron';
import EventEmitter from 'events';

class IpcHandler extends EventEmitter {
    private window: BrowserWindow | null = null;

    constructor() {
        super();
        ipcMain.handle('ga-pageview', async (event, message) => {
            
        });
    }

    set mainWindow(window: BrowserWindow) {
        this.window = window;
    }
}
const ipcHandler = new IpcHandler();
export default ipcHandler;

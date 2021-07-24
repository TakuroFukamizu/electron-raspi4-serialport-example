import path from 'path';
import { app, BrowserWindow, globalShortcut } from 'electron';
import { machineIdSync } from "node-machine-id";
import ipcHandler from './ipcHandler';

const original: boolean = true;
const uuid = machineIdSync(original);

/**
 * BrowserWindowインスタンスを作成する関数
 */
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 800,
        kiosk: true,
        'fullscreen': true,
        'frame': false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
  
    // 開発時にはデベロッパーツールを開く
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    // レンダラープロセスをロード
    mainWindow.loadFile('dist/index.html');

    ipcHandler.mainWindow = mainWindow;

    const appQuit = globalShortcut.register('ctrl+q', function() {
        mainWindow.close();
        app.quit();
    });
};
  
/**
 * アプリを起動する準備が完了したら BrowserWindow インスタンスを作成し、
 * レンダラープロセス（index.htmlとそこから呼ばれるスクリプト）を
 * ロードする
 */
app.whenReady().then(async () => {
    // BrowserWindow インスタンスを作成
    createWindow();
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit());


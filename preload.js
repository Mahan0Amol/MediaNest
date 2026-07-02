const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getLibrary: () => ipcRenderer.invoke('library:get'),
  saveLibrary: (data) => ipcRenderer.invoke('library:save', data),
  getSettings: () => ipcRenderer.invoke('settings:get'),
  saveSettings: (data) => ipcRenderer.invoke('settings:save', data),
  openExternal: (url) => ipcRenderer.invoke('app:openExternal', url),
  getDataDir: () => ipcRenderer.invoke('app:getDataDir')
});
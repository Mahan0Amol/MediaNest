const { app, BrowserWindow, ipcMain, shell, Notification, Tray, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const isDev = !app.isPackaged;
let tray = null;
let mainWindow = null;
let isQuitting = false;

function getDataDir() {
  const dir = app.getPath('userData');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function getLibraryPath() {
  return path.join(getDataDir(), 'library.json');
}

function getSettingsPath() {
  return path.join(getDataDir(), 'settings.json');
}

function readJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, 'utf-8');
    if (!raw.trim()) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading', filePath, err);
    return fallback;
  }
}

function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing', filePath, err);
    return false;
  }
}

const DEFAULT_LIBRARY = { movies: [], shows: [], books: [], alerts: [], reminders: [] };
const DEFAULT_SETTINGS = { tmdbApiKey: '' };
const reminderTimers = new Map();

function ensureWindowsNotificationSupport() {
  if (process.platform !== 'win32') return;
  try {
    // In dev, Windows needs the AppUserModelId to match the actual electron.exe
    // path for notification activation (clicks/actions) to reach this process.
    // In a packaged build, use the real app id instead.
    app.setAppUserModelId(isDev ? process.execPath : 'com.medianest.app');
  } catch (err) {
    console.warn('Unable to set AppUserModelId', err);
  }
}

// const SNOOZE_MINUTES = 10;

function focusMainWindow() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    if (!mainWindow.isVisible()) mainWindow.show();
    mainWindow.focus();
  } else {
    createWindow();
  }
}

// function snoozeReminder(reminderId, minutes = SNOOZE_MINUTES) {
//   const data = readJson(getLibraryPath(), DEFAULT_LIBRARY);
//   const reminders = Array.isArray(data.reminders) ? data.reminders : [];
//   const target = reminders.find(r => r.id === reminderId);
//   if (!target) return;
//   target.dueAt = new Date(Date.now() + minutes * 60 * 1000).toISOString();
//   writeJson(getLibraryPath(), data);
//   scheduleReminders(data);
// }

function showReminderNotification(reminder) {
  const title = reminder?.title || 'Reminder';
  const body = reminder?.message || 'Your reminder is due';
  try {
    if (!Notification.isSupported()) {
      console.warn('Notifications are not supported on this platform');
      return;
    }
    const notification = new Notification({
      title,
      body,
      silent: false,
      actions: [
        // { type: 'button', text: `Snooze (${SNOOZE_MINUTES} min)` },
        { type: 'button', text: 'Open App' }
      ]
    });
    notification.on('click', () => {
      focusMainWindow();
    });
    notification.on('action', (event) => {
      // if (event.actionIndex === 0) {
        // snoozeReminder(reminder?.id);
      // } else if (event.actionIndex === 1) {
      focusMainWindow();
      // }
    });
    notification.show();
  } catch (err) {
    console.error('Failed to show reminder notification', err);
  }
}

function normalizeReminder(reminder) {
  if (!reminder || typeof reminder !== 'object') return null;
  const dueAt = reminder.dueAt ? new Date(reminder.dueAt).toISOString() : null;
  if (!reminder.id || !dueAt) return null;
  return { ...reminder, dueAt };
}

function scheduleReminders(data) {
  reminderTimers.forEach(timer => clearTimeout(timer));
  reminderTimers.clear();

  const reminders = Array.isArray(data?.reminders) ? data.reminders : [];
  reminders.forEach((reminder) => {
    const normalized = normalizeReminder(reminder);
    if (!normalized) return;
    const dueTime = new Date(normalized.dueAt).getTime();
    if (!Number.isFinite(dueTime) || dueTime <= Date.now()) return;

    const delay = dueTime - Date.now();
    const timer = setTimeout(() => {
      reminderTimers.delete(normalized.id);
      showReminderNotification(normalized);
    }, delay);

    reminderTimers.set(normalized.id, timer);
  });
}

function getIconPath() {
  const preferred = process.platform === 'win32' ? 'icon2.ico' : 'icon.png';
  let iconPath = path.join(__dirname, preferred);
  if (!fs.existsSync(iconPath)) {
    iconPath = path.join(__dirname, 'icon.png');
  }
  return iconPath;
}

function createTray() {
  if (tray) return;
  tray = new Tray(getIconPath());
  tray.setToolTip('MediaNest'); 
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open MediaNest', click: () => focusMainWindow() },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);
  tray.setContextMenu(contextMenu);
  tray.on('click', () => focusMainWindow());
}

function createWindow() {
  const iconPath = getIconPath();
  console.log('Using app icon:', iconPath, 'exists=', fs.existsSync(iconPath));
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 980,
    minHeight: 640,
    backgroundColor: '#0f1117',
    icon: iconPath,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow = win;

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, 'src', 'index.html'));

  // Open external links (e.g., API key signup) in the default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Instead of closing (and killing the reminder scheduler), hide to tray.
  win.on('close', (event) => {
    if (isQuitting) return;
    event.preventDefault();
    win.hide();
  });

  win.on('closed', () => {
    mainWindow = null;
  });

  if (isDev) {
    // win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  ensureWindowsNotificationSupport();
  scheduleReminders(readJson(getLibraryPath(), DEFAULT_LIBRARY));
  createWindow();
  createTray();

  app.on('activate', () => {
    focusMainWindow();
  });
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('window-all-closed', () => {
  // Keep running in the background (tray) on Windows/Linux too, so
  // scheduled reminders keep firing even with no window open.
  if (process.platform === 'darwin') {
    // no-op, standard macOS behavior
  }
});

// ---------- IPC: Library ----------
ipcMain.handle('library:get', () => {
  const data = readJson(getLibraryPath(), DEFAULT_LIBRARY);
  scheduleReminders(data);
  return data;
});

ipcMain.handle('library:save', (event, data) => {
  const saved = writeJson(getLibraryPath(), data);
  if (saved) scheduleReminders(data);
  return saved;
});

// ---------- IPC: Settings ----------
ipcMain.handle('settings:get', () => {
  return readJson(getSettingsPath(), DEFAULT_SETTINGS);
});

ipcMain.handle('settings:save', (event, data) => {
  return writeJson(getSettingsPath(), data);
});

// ---------- IPC: Open external URL ----------
ipcMain.handle('app:openExternal', (event, url) => {
  shell.openExternal(url);
});

// ---------- IPC: Data folder info / export / import ----------
ipcMain.handle('app:getDataDir', () => getDataDir());

ipcMain.handle('app:exportBackup', (event, targetPath) => {
  try {
    const backup = {
      library: readJson(getLibraryPath(), DEFAULT_LIBRARY),
      settings: readJson(getSettingsPath(), DEFAULT_SETTINGS),
      exportedAt: new Date().toISOString()
    };
    fs.writeFileSync(targetPath, JSON.stringify(backup, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
});
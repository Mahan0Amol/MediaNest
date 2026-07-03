// ===================== State =====================
let library = { movies: [], shows: [], books: [] };
let settings = { tmdbApiKey: '', booksApiKey: '', showAllMovies: true, showAllShows: true, showAllBooks: true, theme: 'dark', language: 'fa-IR', uiLanguage: 'fa-IR' };
let currentView = 'dashboard';
let subFilters = { movies: 'all', shows: 'all', books: 'all' };
let searchQueries = { movies: '', shows: '', books: '', all: '', scope: 'all' };

// Translations for UI strings (keep keys small and stable)
const translations = {
  'fa-IR': {
    'view.dashboard': 'داشبورد',
    'view.movies': 'فیلم‌ها',
    'view.shows': 'سریال‌ها',
    'view.books': 'کتاب‌ها',
    'view.settings': 'تنظیمات',
    'top.addAlert': 'افزودن هشدار',
    'dashboard.search.placeholder': 'جست‌وجو در داشبورد...',
    'theme.night': 'شب',
    'theme.day': 'روز',
    'theme.dark': 'تاریک',
    'theme.light': 'روشن',
    'action.addMovie': 'افزودن فیلم',
    'action.addShow': 'افزودن سریال',
    'action.addBook': 'افزودن کتاب',
    'action.addReminder': 'یادآور',
    'settings.heading': 'تنظیمات',
    'settings.tmdb.help': 'این صفحه',
    'settings.saved': 'تنظیمات ذخیره شد',
    'settings.appearance': 'حالت ظاهر',
    'settings.uiLanguage': 'زبان سیستم',
    'settings.showAllLabel': 'نمایش گزینه «همه» در تب‌ها',
    'settings.tmdbLanguageLabel': 'زبان جستجوی TMDB',
    'settings.dataDirLabel': 'پوشه داده‌ها',
    'filter.all': 'همه',
    'filter.movies': 'فیلم‌ها',
    'filter.shows': 'سریال‌ها',
    'filter.books': 'کتاب‌ها',
    'subtab.all': 'همه',
    'subtab.watchlist': 'لیست تماشا',
    'subtab.readlist': 'لیست خواندن',
    'subtab.watched': 'دیده‌شده',
    'subtab.favorites': 'علاقه‌مندی‌ها',
    'stats.movies': '🎥 کل فیلم‌ها',
    'stats.shows': '📺 کل سریال‌ها',
    'stats.books': '📚 کل کتاب‌ها',
    'stats.watched': 'دیده‌شده',
    'stats.watching': 'در حال تماشا',
    'stats.reading': 'در حال خواندن',
    'stats.read': 'خوانده‌شده',
    'stats.totalCompleted': 'مجموع تکمیل‌شده‌ها',
    'stats.dropped': 'رها شده',
    'section.inprogress': 'در حال تماشا / خواندن',
    'section.reminders': 'یادآورها',
    'section.alerts': 'هشدارها',
    'empty.inprogress': 'چیزی در حال تماشا یا خواندن نیست',
    'empty.noMovies': 'هنوز فیلمی اضافه نکرده‌اید',
    'empty.noShows': 'هنوز سریالی اضافه نکرده‌اید',
    'empty.noBooks': 'هنوز کتابی اضافه نکرده‌اید',
    'empty.noReminders': 'یادآوری ثبت نشده است',
    'empty.noActiveAlerts': 'هیچ هشدار فعالی وجود ندارد',
    'badge.watched': 'دیده‌شده',
    'badge.watchlist': 'لیست تماشا',
    'badge.finished': 'تمام‌شده',
    'badge.watching': 'در حال تماشا',
    'badge.abandoned': 'رها شده',
    'badge.read': 'خوانده‌شده',
    'badge.reading': 'در حال خواندن',
    'badge.toRead': 'لیست خواندن',
    'progress.pages': 'صفحه {current} از {total}',
    'progress.episodes': '{watched} از {total} قسمت',
    'button.done': 'انجام شد',
    'button.hide': 'پنهان',
    'button.cancel': 'انصراف',
    'button.save': 'ذخیره',
    'search.noResults': 'نتیجه‌ای یافت نشد',
    'modal.addMovie.title': 'افزودن فیلم',
    'modal.addShow.title': 'افزودن سریال',
    'modal.addBook.title': 'افزودن کتاب',
    'modal.addAlert.title': 'افزودن هشدار',
    'label.title': 'عنوان',
    'label.alertMessage': 'متن هشدار',
    'placeholder.alertMessage': 'توضیح کوتاه درباره هشدار',
    'label.level': 'سطح',
    'label.status': 'وضعیت',
    'label.favorite': 'علاقه‌مندی',
    'label.rating': 'امتیاز',
    'option.info': 'اطلاعات',
    'option.warning': 'هشدار',
    'option.success': 'موفقیت',
    'toast.needApiKey': 'ابتدا کلید API را در تنظیمات وارد کنید',
    'toast.searchError': 'خطا در جستجو:',
    'toast.connError': 'اتصال به TMDB برقرار نشد',
    'toast.added.movie': 'فیلم اضافه شد',
    'toast.added.book': 'کتاب اضافه شد',
    'toast.added.show': 'سریال اضافه شد',
    'toast.favAdded': 'به علاقه‌مندی‌ها افزوده شد',
    'toast.favRemoved': 'از علاقه‌مندی‌ها حذف شد',
    'toast.movieExists': 'این فیلم قبلاً اضافه شده است',
    'toast.alertMissing': 'عنوان و متن هشدار لازم است',
    'toast.alertAdded': 'هشدار اضافه شد',
    'toast.reminderMissing': 'عنوان، متن و زمان یادآور لازم است',
    'type.book': 'کتاب',
    'type.show': 'سریال',
    'type.movie': 'فیلم',
    'toast.saved': 'ذخیره شد',
    'hint.openLibrary': 'اگر کلیدی ندارید، برنامه به‌صورت خودکار از Open Library استفاده می‌کند.',
    'text.untitled': 'بدون عنوان',
    'fetch.seasons': 'در حال دریافت اطلاعات فصل‌ها...',
    'error.fetch.tv': 'خطا در دریافت اطلاعات سریال',
    'season.noInfo': 'اطلاعات فصلی موجود نیست'
  },
  'en-US': {
    'view.dashboard': 'Dashboard',
    'view.movies': 'Movies',
    'view.shows': 'Shows',
    'view.books': 'Books',
    'view.settings': 'Settings',
    'top.addAlert': 'Add Alert',
    'dashboard.search.placeholder': 'Search dashboard...',
    'theme.night': 'Night',
    'theme.day': 'Day',
    'theme.dark': 'Dark',
    'theme.light': 'Light',
    'action.addMovie': 'Add Movie',
    'action.addShow': 'Add Show',
    'action.addBook': 'Add Book',
    'action.addReminder': 'Reminder',
    'settings.heading': 'Settings',
    'settings.tmdb.help': 'this page',
    'settings.saved': 'Settings saved',
    'settings.appearance': 'Appearance',
    'settings.uiLanguage': 'System language',
    'settings.showAllLabel': 'Show "All" in tabs',
    'settings.tmdbLanguageLabel': 'TMDB search language',
    'settings.dataDirLabel': 'Data folder',
    'filter.all': 'All',
    'filter.movies': 'Movies',
    'filter.shows': 'Shows',
    'filter.books': 'Books',
    'subtab.all': 'All',
    'subtab.watchlist': 'Watchlist',
    'subtab.readlist': 'To read',
    'subtab.watched': 'Watched',
    'subtab.favorites': 'Favorites',
    'stats.movies': '🎥 Movies',
    'stats.shows': '📺 Shows',
    'stats.books': '📚 Books',
    'stats.watched': 'watched',
    'stats.watching': 'watching',
    'stats.reading': 'reading',
    'stats.totalCompleted': 'Total completed',
    'stats.read': 'read',
    'stats.dropped': 'dropped',
    'section.reminders': 'Reminders',
    'section.alerts': 'Alerts',
    'section.inprogress': 'In progress',
    'empty.inprogress': 'Nothing in progress',
    'empty.noMovies': 'No movies added yet',
    'empty.noShows': 'No shows added yet',
    'empty.noBooks': 'No books added yet',
    'empty.noReminders': 'No reminders',
    'empty.noActiveAlerts': 'No active alerts',
    'badge.watched': 'Watched',
    'badge.watchlist': 'Watchlist',
    'badge.finished': 'Finished',
    'badge.watching': 'Watching',
    'badge.abandoned': 'Abandoned',
    'badge.read': 'Read',
    'badge.reading': 'Reading',
    'badge.toRead': 'To read',
    'progress.pages': 'Page {current} of {total}',
    'progress.episodes': '{watched} of {total} episodes',
    'button.done': 'Done',
    'button.hide': 'Hide',
    'button.cancel': 'Cancel',
    'button.save': 'Save',
    'search.noResults': 'No results',
    'modal.addMovie.title': 'Add Movie',
    'modal.addShow.title': 'Add Show',
    'modal.addBook.title': 'Add Book',
    'modal.addAlert.title': 'Add Alert',
    'label.title': 'Title',
    'label.alertMessage': 'Message',
    'placeholder.alertMessage': 'Short description',
    'label.level': 'Level',
    'label.status': 'Status',
    'label.favorite': 'Favorite',
    'label.rating': 'Rating',
    'option.info': 'Info',
    'option.warning': 'Warning',
    'option.success': 'Success',
    'toast.needApiKey': 'Enter API key in settings first',
    'toast.searchError': 'Search error:',
    'toast.connError': 'Cannot connect to TMDB',
    'toast.added.movie': 'Movie added',
    'toast.added.book': 'Book added',
    'toast.added.show': 'Show added',
    'toast.favAdded': 'Added to favorites',
    'toast.favRemoved': 'Removed from favorites',
    'toast.movieExists': 'This movie was already added',
    'toast.alertMissing': 'Title and message are required',
    'toast.alertAdded': 'Alert added',
    'toast.reminderMissing': 'Title, message and time are required',
    'toast.saved': 'Saved',
    'type.book': 'Book',
    'type.show': 'Show',
    'type.movie': 'Movie',
    'hint.openLibrary': 'If you don\'t have a key the app will fall back to Open Library',
    'text.untitled': 'Untitled',
    'fetch.seasons': 'Fetching season details...',
    'error.fetch.tv': 'Failed to fetch TV details',
    'season.noInfo': 'No season information available'
  }
};

function t(key) {
  const ui = settings.uiLanguage || 'fa-IR';
  if (translations[ui] && translations[ui][key]) return translations[ui][key];
  // fallback to en-US then fa-IR
  if (translations['en-US'] && translations['en-US'][key]) return translations['en-US'][key];
  if (translations['fa-IR'] && translations['fa-IR'][key]) return translations['fa-IR'][key];
  return key;
}

function applyLocale() {
  // translate DOM elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    el.textContent = t(k);
  });
  // re-render view title and actions
  renderTopbarActions();
  document.getElementById('view-title').innerHTML = `${t('view.' + currentView)} <span class="title-text"></span>`;
}

// ===================== Helpers =====================
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Downloads a remote image and converts it to a base64 data URL so it gets
// saved inside library.json and keeps working offline. Falls back to the
// original remote URL if the download fails (e.g. no internet at add-time).
async function toOfflineImage(url) {
  if (!url) return '';
  try {
    const res = await fetch(url);
    if (!res.ok) return url;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error('toOfflineImage failed, keeping remote url', err);
    return url;
  }
}

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function iconSvg(name, className = 'icon') {
  const icons = {
    dashboard: '<svg class="' + className + '" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4z" /><path d="M13 4h7v5h-7z" /><path d="M13 11h7v9h-7z" /><path d="M4 13h7v7H4z" /></svg>',
    movies: '<svg class="' + className + '" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M9 9l5 3-5 3z" /></svg>',
    shows: '<svg class="' + className + '" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 9h8" /><path d="M8 13h5" /></svg>',
    books: '<svg class="' + className + '" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6" /><path d="M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2" /></svg>',
    settings: '<svg class="' + className + '" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.1l2-1.6-2-3.5-2.4 1a7.2 7.2 0 0 0-1.9-1.1L14 2h-4l-.6 2.8a7.2 7.2 0 0 0-1.9 1.1l-2.4-1-2 3.5 2 1.6a7 7 0 0 0 0 2.2l-2 1.6 2 3.5 2.4-1c.6.5 1.2.9 1.9 1.1L10 22h4l.6-2.8c.7-.2 1.3-.6 1.9-1.1l2.4 1 2-3.5-2-1.6c.1-.4.1-.7.1-1.1z" /></svg>',
    plus: '<svg class="' + className + '" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14" /><path d="M5 12h14" /></svg>',
    spark: '<svg class="' + className + '" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.7 5.2L19 9l-5.3 1.8L12 16l-1.7-5.2L5 9l5.3-1.8z" /></svg>',
    heart: '<svg class="' + className + '" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-6.5-4.2-8.4-8.2A5.1 5.1 0 0 1 12 6.2a5.1 5.1 0 0 1 8.4 5.6C18.5 15.8 12 20 12 20z" /></svg>',
    sun: '<svg class="' + className + '" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.9 4.9l1.4 1.4" /><path d="M17.7 17.7l1.4 1.4" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M4.9 19.1l1.4-1.4" /><path d="M17.7 6.3l1.4-1.4" /></svg>',
    moon: '<svg class="' + className + '" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.3A8.5 8.5 0 1 1 9.7 4a7 7 0 0 0 10.3 10.3z" /></svg>'
  };
  return icons[name] || '';
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.add('hidden'), 2400);
}

function applyTheme() {
  const theme = settings.theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
}

function toggleTheme() {
  settings.theme = settings.theme === 'light' ? 'dark' : 'light';
  applyTheme();
  persistSettings();
  renderTopbarActions();
  if (currentView === 'settings') renderView();
}

function createAlert({ title, message, kind = 'info', relatedKind = '', relatedId = '' }) {
  const alert = {
    id: uid(),
    title,
    message,
    kind,
    relatedKind,
    relatedId,
    read: false,
    createdAt: new Date().toISOString()
  };
  library.alerts = Array.isArray(library.alerts) ? [alert, ...library.alerts] : [alert];
  persistLibrary();
  return alert;
}

function markAlertRead(id) {
  library.alerts = (library.alerts || []).map(alert => 
    alert.id === id ? { ...alert, read: true } : alert
  );
  persistLibrary();
  renderView();
}

function getActiveAlerts() {
  return (library.alerts || []).filter(alert => !alert.read).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function persistLibrary() {
  await window.api.saveLibrary(library);
}
async function persistSettings() {
  await window.api.saveSettings(settings);
}

function openModal(html) {
  document.getElementById('modal-box').innerHTML = html;
  document.getElementById('modal-overlay').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('modal-box').innerHTML = '';
}
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target.id === 'modal-overlay') closeModal();
});

function starsHtml(rating, editableId, kind) {
  let html = `<div class="rating-stars" data-kind="${kind}" data-id="${editableId}">`;
  for (let i = 1; i <= 5; i++) {
    html += `<span class="${i <= rating ? 'filled' : ''}" data-star="${i}">★</span>`;
  }
  html += '</div>';
  return html;
}

function attachStarHandlers(container) {
  container.querySelectorAll('.rating-stars').forEach(starsEl => {
    starsEl.querySelectorAll('span').forEach(span => {
      span.addEventListener('click', () => {
        const val = parseInt(span.dataset.star, 10);
        const kind = starsEl.dataset.kind;
        const id = starsEl.dataset.id;
        setRating(kind, id, val);
        starsEl.querySelectorAll('span').forEach((s, i) => {
          s.classList.toggle('filled', i < val);
        });
      });
    });
  });
}

function setRating(kind, id, val) {
  const list = library[kind];
  const item = list.find(x => x.id === id);
  if (item) {
    item.rating = item.rating === val ? item.rating : val;
    persistLibrary();
  }
}

function syncShowProgressStatus(show) {
  const totalEpisodes = (show.seasons || []).reduce((sum, season) => sum + (season.episodeCount || 0), 0);
  const watchedEpisodes = (show.seasons || []).reduce((sum, season) => sum + (season.watchedEpisodes || []).length, 0);

  if (!totalEpisodes) return;
  if (watchedEpisodes >= totalEpisodes) {
    show.status = 'watched';
  } else if (watchedEpisodes > 0) {
    show.status = 'watching';
  } else if (show.status === 'watching' || show.status === 'watched') {
    show.status = 'watchlist';
  }
}

function syncBookProgressStatus(book) {
  const currentPage = Number(book.currentPage || 0);
  const totalPages = Number(book.totalPages || 0);

  if (totalPages > 0 && currentPage >= totalPages) {
    book.status = 'read';
  } else if (currentPage > 0) {
    book.status = 'reading';
  } else if (book.status === 'reading' || book.status === 'read') {
    book.status = 'watchlist';
  }
}

function toggleFavorite(kind, id) {
  const list = library[kind];
  const item = list.find(x => x.id === id);
  if (!item) return;
  item.favorite = !item.favorite;
  persistLibrary();
  renderView();
  toast(item.favorite ? t('toast.favAdded') || 'به علاقه‌مندی‌ها افزوده شد' : t('toast.favRemoved') || 'از علاقه‌مندی‌ها حذف شد');
}

// ===================== TMDB API =====================
const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMG = 'https://image.tmdb.org/t/p/w300';

async function tmdbSearch(type, query) {
  if (!settings.tmdbApiKey) {
    toast(t('toast.needApiKey'));
    return [];
  }
  const endpoint = type === 'movie' ? 'search/movie' : 'search/tv';
  const langParam = settings.language ? `&language=${encodeURIComponent(settings.language)}` : '';
  const url = `${TMDB_BASE}/${endpoint}?api_key=${encodeURIComponent(settings.tmdbApiKey)}${langParam}&query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      toast(t('toast.searchError') + ' ' + (err.status_message || res.status));
      return [];
    }
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    toast(t('toast.connError'));
    return [];
  }
}

async function tmdbGetTvDetails(tvId) {
  const langParam = settings.language ? `&language=${encodeURIComponent(settings.language)}` : '';
  const url = `${TMDB_BASE}/tv/${tvId}?api_key=${encodeURIComponent(settings.tmdbApiKey)}${langParam}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('tv details failed');
  return res.json();
}

async function tmdbGetSeason(tvId, seasonNumber) {
  const langParam = settings.language ? `&language=${encodeURIComponent(settings.language)}` : '';
  const url = `${TMDB_BASE}/tv/${tvId}/season/${seasonNumber}?api_key=${encodeURIComponent(settings.tmdbApiKey)}${langParam}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('season details failed');
  return res.json();
}

// ===================== Open Library API (Books, no key needed) =====================
async function openLibrarySearch(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (err) {
    toast(t('hint.openLibrary'));
    return [];
  }
}

// ===================== Navigation =====================
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});

function getViewIcon(view) {
  const iconMap = {
    dashboard: iconSvg('dashboard', 'icon icon--sm'),
    movies: iconSvg('movies', 'icon icon--sm'),
    shows: iconSvg('shows', 'icon icon--sm'),
    books: iconSvg('books', 'icon icon--sm'),
    settings: iconSvg('settings', 'icon icon--sm')
  };
  return iconMap[view] || '';
}

function switchView(view) {
  currentView = view;
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  document.getElementById('view-title').innerHTML = `${getViewIcon(view)} <span class="title-text">${t('view.' + view)}</span>`;
  renderTopbarActions();
  renderView();
}

function renderTopbarActions() {
  const el = document.getElementById('topbar-actions');
  el.innerHTML = '';
  if (currentView === 'dashboard') {
    el.innerHTML = `
      <div class="dashboard-actions">
        <button class="btn" id="theme-toggle-btn">${settings.theme === 'light' ? iconSvg('moon', 'icon icon--sm') : iconSvg('sun', 'icon icon--sm')} ${settings.theme === 'light' ? t('theme.night') : t('theme.day')}</button>
        <button class="btn btn-primary" id="add-alert-btn">${iconSvg('plus', 'icon icon--sm')} ${t('top.addAlert')}</button>
        <button class="btn" id="add-reminder-btn">${iconSvg('plus', 'icon icon--sm')} ${t('action.addReminder') || 'یادآور'}</button>
        <div class="dashboard-search-box">
          <select id="dashboard-search-scope" class="dashboard-search-select">
            <option value="all">${t('filter.all') || 'همه'}</option>
            <option value="movies">${t('filter.movies') || 'فیلم‌ها'}</option>
            <option value="shows">${t('filter.shows') || 'سریال‌ها'}</option>
            <option value="books">${t('filter.books') || 'کتاب‌ها'}</option>
          </select>
          <input id="dashboard-search-input" type="text" placeholder="${t('dashboard.search.placeholder')}" value="${escapeHtml(searchQueries.all || '')}" />
        </div>
      </div>
    `;
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
    document.getElementById('add-alert-btn').addEventListener('click', openAddAlertModal);
    document.getElementById('add-reminder-btn').addEventListener('click', openAddReminderModal);
    const scope = document.getElementById('dashboard-search-scope');
    const input = document.getElementById('dashboard-search-input');
    scope.value = searchQueries.scope || 'all';
    input.addEventListener('input', () => {
      searchQueries.all = input.value.trim();
      searchQueries.scope = scope.value;
      renderDashboard(document.getElementById('view-container'));
    });
    scope.addEventListener('change', () => {
      searchQueries.scope = scope.value;
      renderDashboard(document.getElementById('view-container'));
    });
  } else if (currentView === 'movies') {
    el.innerHTML = `<div class="dashboard-actions"><button class="btn" id="theme-toggle-btn">${settings.theme === 'light' ? iconSvg('moon', 'icon icon--sm') : iconSvg('sun', 'icon icon--sm')} ${settings.theme === 'light' ? t('theme.night') : t('theme.day')}</button><button class="btn btn-primary" id="add-movie-btn">${iconSvg('plus', 'icon icon--sm')} ${t('action.addMovie')}</button></div>`;
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
    document.getElementById('add-movie-btn').addEventListener('click', openAddMovieModal);
  } else if (currentView === 'shows') {
    el.innerHTML = `<div class="dashboard-actions"><button class="btn" id="theme-toggle-btn">${settings.theme === 'light' ? iconSvg('moon', 'icon icon--sm') : iconSvg('sun', 'icon icon--sm')} ${settings.theme === 'light' ? t('theme.night') : t('theme.day')}</button><button class="btn btn-primary" id="add-show-btn">${iconSvg('plus', 'icon icon--sm')} ${t('action.addShow')}</button></div>`;
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
    document.getElementById('add-show-btn').addEventListener('click', openAddShowModal);
  } else if (currentView === 'books') {
    el.innerHTML = `<div class="dashboard-actions"><button class="btn" id="theme-toggle-btn">${settings.theme === 'light' ? iconSvg('moon', 'icon icon--sm') : iconSvg('sun', 'icon icon--sm')} ${settings.theme === 'light' ? t('theme.night') : t('theme.day')}</button><button class="btn btn-primary" id="add-book-btn">${iconSvg('plus', 'icon icon--sm')} ${t('action.addBook')}</button></div>`;
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
    document.getElementById('add-book-btn').addEventListener('click', openAddBookModal);
  } else if (currentView === 'settings') {
    el.innerHTML = `<button class="btn" id="theme-toggle-btn">${settings.theme === 'light' ? iconSvg('moon', 'icon icon--sm') : iconSvg('sun', 'icon icon--sm')} ${settings.theme === 'light' ? t('theme.night') : t('theme.day')}</button>`;
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
  }
}

async function initApp() {
  try {
    const [savedLibrary, savedSettings, dataDir] = await Promise.all([
      window.api.getLibrary(),
      window.api.getSettings(),
      window.api.getDataDir()
    ]);
    const normalizedLibrary = savedLibrary || { movies: [], shows: [], books: [], alerts: [] };
    library = {
      movies: Array.isArray(normalizedLibrary.movies) ? normalizedLibrary.movies : [],
      shows: Array.isArray(normalizedLibrary.shows) ? normalizedLibrary.shows : [],
      books: Array.isArray(normalizedLibrary.books) ? normalizedLibrary.books : [],
      alerts: Array.isArray(normalizedLibrary.alerts) ? normalizedLibrary.alerts : []
    };
    settings = {
      tmdbApiKey: '',
      booksApiKey: '',
      showAllMovies: true,
      showAllShows: true,
      showAllBooks: true,
      theme: 'dark',
      ...(savedSettings || {})
    };
    applyTheme();
    document.getElementById('data-dir-hint').textContent = dataDir;
  } catch (err) {
    console.error('Failed to initialize app data', err);
  }
  renderView();
}

function renderSettings(container) {
  container.innerHTML = `
    <div class="settings-box">
      <h2 style="margin-bottom: 10px;">تنظیمات</h2>
          <div class="form-row">
        <label for="tmdb-api-key">TMDB API Key</label>
        <input id="tmdb-api-key" type="password" value="${escapeHtml(settings.tmdbApiKey || '')}" placeholder="کلید TMDB را وارد کنید" />
        <div class="hint">
          برای جستجو در TMDB لازم است. می‌توانید از <a href="#" id="tmdb-help-link">این صفحه</a> کلید بگیرید.
        </div>
      </div>
      <div class="form-row">
        <label for="books-api-key">Books API Key (اختیاری)</label>
        <input id="books-api-key" type="password" value="${escapeHtml(settings.booksApiKey || '')}" placeholder="در صورت استفاده از Google Books کلید را وارد کنید" />
        <div class="hint">
          اگر کلیدی ندارید، برنامه به‌صورت خودکار از Open Library استفاده می‌کند.
        </div>
      </div>
      <div class="form-row">
        <label>نمایش گزینه «همه» در تب‌ها</label>
        <div class="toggle-list">
          <div class="toggle-row">
            <span>فیلم‌ها</span>
            <label class="switch">
              <input type="checkbox" id="toggle-movies-all" ${isAllFilterEnabled('movies') ? 'checked' : ''} />
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-row">
            <span>سریال‌ها</span>
            <label class="switch">
              <input type="checkbox" id="toggle-shows-all" ${isAllFilterEnabled('shows') ? 'checked' : ''} />
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-row">
            <span>کتاب‌ها</span>
            <label class="switch">
              <input type="checkbox" id="toggle-books-all" ${isAllFilterEnabled('books') ? 'checked' : ''} />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
        <div class="form-row">
          <label data-i18n="settings.appearance">حالت ظاهر</label>
          <select id="theme-select">
            <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>تاریک</option>
            <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>روشن</option>
          </select>
        </div>
        <div class="form-row">
          <label data-i18n="settings.uiLanguage">زبان سیستم</label>
          <select id="ui-language-select">
            <option value="fa-IR" ${settings.uiLanguage === 'fa-IR' ? 'selected' : ''}>فارسی (fa-IR)</option>
            <option value="en-US" ${settings.uiLanguage === 'en-US' ? 'selected' : ''}>English (en-US)</option>
          </select>
        </div>
      <div class="form-row">
        <label>زبان جستجوی TMDB</label>
        <select id="language-select">
          <option value="">خودکار (سیستم)</option>
          <option value="fa-IR" ${settings.language === 'fa-IR' ? 'selected' : ''}>فارسی (fa-IR)</option>
          <option value="en-US" ${settings.language === 'en-US' ? 'selected' : ''}>English (en-US)</option>
          <option value="es-ES" ${settings.language === 'es-ES' ? 'selected' : ''}>Español (es-ES)</option>
          <option value="fr-FR" ${settings.language === 'fr-FR' ? 'selected' : ''}>Français (fr-FR)</option>
          <option value="de-DE" ${settings.language === 'de-DE' ? 'selected' : ''}>Deutsch (de-DE)</option>
          <option value="ja-JP" ${settings.language === 'ja-JP' ? 'selected' : ''}>日本語 (ja-JP)</option>
          <option value="zh-CN" ${settings.language === 'zh-CN' ? 'selected' : ''}>中文 (zh-CN)</option>
          <option value="ru-RU" ${settings.language === 'ru-RU' ? 'selected' : ''}>Русский (ru-RU)</option>
          <option value="ar-SA" ${settings.language === 'ar-SA' ? 'selected' : ''}>العربية (ar-SA)</option>
          <option value="it-IT" ${settings.language === 'it-IT' ? 'selected' : ''}>Italiano (it-IT)</option>
          <option value="pt-BR" ${settings.language === 'pt-BR' ? 'selected' : ''}>Português (pt-BR)</option>
          <option value="ko-KR" ${settings.language === 'ko-KR' ? 'selected' : ''}>한국어 (ko-KR)</option>
        </select>
      </div>
      <div class="form-row">
        <label>پوشه داده‌ها</label>
        <div class="hint" id="settings-data-dir"></div>
      </div>
      <div class="modal-close-row">
        <button class="btn btn-primary" id="save-settings-btn">ذخیره</button>
      </div>
    </div>
  `;

  document.getElementById('settings-data-dir').textContent = document.getElementById('data-dir-hint').textContent || t('loading.dataDir');

  const apiKeyInput = document.getElementById('tmdb-api-key');
  apiKeyInput.addEventListener('input', (e) => {
    settings.tmdbApiKey = e.target.value.trim();
    persistSettings();
  });

  const booksApiKeyInput = document.getElementById('books-api-key');
  booksApiKeyInput.addEventListener('input', (e) => {
    settings.booksApiKey = e.target.value.trim();
    persistSettings();
  });

  const toggleMovies = document.getElementById('toggle-movies-all');
  const toggleShows = document.getElementById('toggle-shows-all');
  const toggleBooks = document.getElementById('toggle-books-all');
  const themeSelect = document.getElementById('theme-select');

  const applyToggle = (kind, checked) => {
    settings[getFilterSettingKey(kind)] = checked;
    if (!checked && subFilters[kind] === 'all') {
      subFilters[kind] = getDefaultFilter(kind);
    }
    persistSettings();
    if (currentView === (kind === 'movies' ? 'movies' : kind === 'shows' ? 'shows' : 'books')) {
      renderView();
    }
  };

  toggleMovies.addEventListener('change', (e) => applyToggle('movies', e.target.checked));
  toggleShows.addEventListener('change', (e) => applyToggle('shows', e.target.checked));
  toggleBooks.addEventListener('change', (e) => applyToggle('books', e.target.checked));
  themeSelect.addEventListener('change', (e) => {
    settings.theme = e.target.value;
    applyTheme();
    persistSettings();
  });

  const uiLangSelect = document.getElementById('ui-language-select');
  if (uiLangSelect) {
    uiLangSelect.addEventListener('change', (e) => {
      settings.uiLanguage = e.target.value || 'fa-IR';
      persistSettings();
      applyLocale();
      if (currentView === 'settings') renderView();
    });
  }

  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      settings.language = e.target.value || '';
      persistSettings();
    });
  }

  document.getElementById('save-settings-btn').addEventListener('click', async () => {
    await persistSettings();
    toast(t('settings.saved'));
  });

  document.getElementById('tmdb-help-link').addEventListener('click', async (e) => {
    e.preventDefault();
    await window.api.openExternal('https://www.themoviedb.org/settings/api');
  });
}

function getFilterSettingKey(kind) {
  return kind === 'movies' ? 'showAllMovies' : kind === 'shows' ? 'showAllShows' : 'showAllBooks';
}

function isAllFilterEnabled(kind) {
  return settings[getFilterSettingKey(kind)] !== false;
}

function getDefaultFilter(kind) {
  return 'watchlist';
}

function ensureValidSubFilter(kind) {
  if (!isAllFilterEnabled(kind) && subFilters[kind] === 'all') {
    subFilters[kind] = getDefaultFilter(kind);
  }
}

function renderView() {
  const container = document.getElementById('view-container');
  renderTopbarActions();
  applyLocale();
  if (currentView === 'dashboard') renderDashboard(container);
  else if (currentView === 'movies') {
    ensureValidSubFilter('movies');
    renderMovies(container);
  } else if (currentView === 'shows') {
    ensureValidSubFilter('shows');
    renderShows(container);
  } else if (currentView === 'books') {
    ensureValidSubFilter('books');
    renderBooks(container);
  } else if (currentView === 'settings') renderSettings(container);
}

// ===================== Dashboard =====================
function renderDashboard(container) {
  const movies = library.movies;
  const shows = library.shows;
  const books = library.books;
  const alerts = getActiveAlerts();
  const reminders = (library.reminders || []).filter(r => !r.done).sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
  const query = (searchQueries.all || '').trim().toLowerCase();
  const scope = searchQueries.scope || 'all';

  const filterItems = (items, kind) => {
    if (!query) return items;
    return items.filter(item => {
      const haystack = `${item.title || ''} ${item.author || ''} ${item.year || ''} ${item.overview || ''}`.toLowerCase();
      return haystack.includes(query);
    });
  };

  const visibleMovies = scope === 'all' || scope === 'movies' ? filterItems(movies, 'movies') : [];
  const visibleShows = scope === 'all' || scope === 'shows' ? filterItems(shows, 'shows') : [];
  const visibleBooks = scope === 'all' || scope === 'books' ? filterItems(books, 'books') : [];

  const watchedMovies = visibleMovies.filter(m => m.status === 'watched').length;
  const watchingShows = shows.filter(s => s.status === 'watching').length;
  const watchedShows = shows.filter(s => s.status === 'watched').length;
  const readBooks = books.filter(b => b.status === 'read').length;
  const readingBooks = books.filter(b => b.status === 'reading').length;

  container.innerHTML = `
    <div class="section-title">
      ${t('section.reminders') || 'یادآورها'}
    </div>

    <div class="alerts-list">
      ${
        reminders.length
          ? reminders.map(reminder => `
              <div class="alert-item">
                <div>
                  <div class="alert-title">${escapeHtml(reminder.title)}</div>
                  <div class="alert-message">${escapeHtml(reminder.message)}</div>
                  <div class="alert-meta">
                    ${new Date(reminder.dueAt).toLocaleString('fa-IR')}
                  </div>
                </div>
                <button class="btn btn-sm alert-dismiss"
                  data-reminder-id="${reminder.id}">
                  ${t('actions.done') || 'انجام شد'}
                </button>
              </div>
            `).join('')
          : `<div class="empty-state small">
              ${t('empty.noReminders') || 'یادآوری ثبت نشده است'}
            </div>`
      }
    </div>

    <div class="section-title">${t('section.alerts') || 'هشدارها'}</div>
    <div class="alerts-list">
      ${alerts.length ? alerts.map(alert => `
        <div class="alert-item alert-${alert.kind}">
          <div>
            <div class="alert-title">${escapeHtml(alert.title)}</div>
            <div class="alert-message">${escapeHtml(alert.message)}</div>
            <div class="alert-meta">${new Date(alert.createdAt).toLocaleDateString('fa-IR')}</div>
          </div>
          <button class="btn btn-sm alert-dismiss" data-alert-id="${alert.id}">پنهان</button>
        </div>
      `).join('') : `<div class="empty-state small">
              ${t('empty.noActiveAlerts') || 'هیچ هشدار فعالی وجود ندارد'}
            </div>`}
    </div>

    <div class="stats-grid">
      <div class="stat-card"><div class="num">${visibleMovies.length}</div><div class="label">${t('stats.movies')} (${watchedMovies} ${t('stats.watched') || 'دیده‌شده'})</div></div>
      <div class="stat-card"><div class="num">${visibleShows.length}</div><div class="label">${t('stats.shows')} (${watchingShows} ${t('stats.watching') || 'در حال تماشا'})</div></div>
      <div class="stat-card"><div class="num">${visibleBooks.length}</div><div class="label">${t('stats.books')} (${readingBooks} ${t('stats.reading') || 'در حال خواندن'})</div></div>
      <div class="stat-card"><div class="num">${watchedMovies + watchedShows + readBooks}</div><div class="label">${t('stats.totalCompleted') || 'مجموع تکمیل‌شده‌ها'}</div></div>
    </div>

    <div class="section-title">${t('section.inprogress')}</div>
    <div class="grid" id="dash-inprogress"></div>
  `;

  const inProgress = [
    ...visibleShows.filter(s => s.status === 'watching').map(s => ({ ...s, _kind: 'shows' })),
    ...visibleBooks.filter(b => b.status === 'reading').map(b => ({ ...b, _kind: 'books' })),
    ...visibleMovies.filter(m => m.status === 'watchlist').map(m => ({ ...m, _kind: 'movies' }))
  ].slice(0, 12);

  document.querySelectorAll('.alert-dismiss').forEach(btn => {
    if (btn.dataset.alertId) {
      btn.addEventListener('click', () => markAlertRead(btn.dataset.alertId));
    }
    if (btn.dataset.reminderId) {
      btn.addEventListener('click', () => completeReminder(btn.dataset.reminderId));
    }
  });

  const grid = document.getElementById('dash-inprogress');
  if (inProgress.length === 0) {
    grid.outerHTML = `<div class="empty-state"><div class="big">${iconSvg('spark', 'icon icon--lg')}</div>${t('empty.inprogress')}</div>`;
  } else {
    grid.innerHTML = inProgress.map(item => cardHtml(item, item._kind)).join('');
    attachCardHandlers(grid);
  }
}

// ===================== Card renderer (shared) =====================
function cardHtml(item, kind) {
  const poster = item.poster || item.cover;
  const posterHtml = poster
    ? `<img class="card-poster" src="${escapeHtml(poster)}" loading="lazy" />`
    : `<div class="card-poster placeholder">${iconSvg(kind === 'books' ? 'books' : kind === 'shows' ? 'shows' : 'movies', 'icon icon--lg')}</div>`;
  const favoriteActive = item.favorite ? 'active' : '';

  let badge = '';
  let progressHtml = '';
  if (kind === 'movies') {
    badge = item.status === 'watched'
      ? `<span class="badge watched">${t('stats.watched') || 'دیده‌شده'}</span>`
      : `<span class="badge watchlist">${t('subtab.watchlist') || 'لیست تماشا'}</span>`;
  } else if (kind === 'shows') {
    const total = (item.seasons || []).reduce((a, s) => a + (s.episodeCount || 0), 0);
    const watched = (item.seasons || []).reduce((a, s) => a + (s.watchedEpisodes || []).length, 0);
    const pct = total ? Math.round((watched / total) * 100) : 0;
    badge = item.status === 'watched'
  ? `<span class="badge watched">${t('stats.watched') || 'تمام‌شده'}</span>`
      : item.status === 'watching'
        ? `<span class="badge watching">${t('stats.watching') || 'در حال تماشا'}</span>`
        : item.status === 'abandoned'
          ? `<span class="badge abandoned">${t('stats.dropped') || 'رها شده'}</span>`
          : `<span class="badge watchlist">${t('subtab.watchlist') || 'لیست تماشا'}</span>`;
    if (total > 0) {
      progressHtml = `
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="card-meta">
          ${t('progress.episodes')
            ? t('progress.episodes')
                .replace('{watched}', watched)
                .replace('{total}', total)
            : `${watched} از ${total} قسمت`}
        </div>
      `;
    }
  } else if (kind === 'books') {
    badge = item.status === 'read'
      ? `<span class="badge watched">${t('stats.read') || 'خوانده‌شده'}</span>`
      : item.status === 'reading'
        ? `<span class="badge watching">${t('stats.reading') || 'در حال خواندن'}</span>`
        : `<span class="badge watchlist">${t('subtab.readlist') || 'لیست خواندن'}</span>`;
    if (item.totalPages) {
      const pct = Math.min(100, Math.round(((item.currentPage || 0) / item.totalPages) * 100));
      progressHtml = `
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="card-meta">
          ${t('progress.pages')
            ? t('progress.pages')
                .replace('{current}', item.currentPage || 0)
                .replace('{total}', item.totalPages)
            : `صفحه ${item.currentPage || 0} از ${item.totalPages}`}
        </div>
      `;
    }
  }

  const typeLabel = kind === 'books' ? t('type.book') || 'کتاب' : kind === 'shows' ? t('type.show') || 'سریال' : t('type.movie') || 'فیلم';

  return `
    <div class="card" data-kind="${kind}" data-id="${item.id}">
      <button class="card-favorite-btn ${favoriteActive}" data-kind="${kind}" data-id="${item.id}" title="${item.favorite ? t('fav.remove') : t('fav.add')}">${iconSvg('heart', 'icon icon--xs')}</button>
      ${posterHtml}
      <div class="card-body">
        <div class="card-title">${escapeHtml(item.title)}</div>
        <div class="card-meta">${escapeHtml(item.year || item.author || '')}</div>
        <div class="card-meta" style="margin-top: 6px; color: var(--accent-2);">${typeLabel}</div>
        ${badge}
        ${progressHtml}
      </div>
    </div>
  `;
}

function attachCardHandlers(container) {
  container.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const kind = card.dataset.kind;
      const id = card.dataset.id;
      if (kind === 'movies') openMovieDetail(id);
      else if (kind === 'shows') openShowDetail(id);
      else if (kind === 'books') openBookDetail(id);
    });
  });
  container.querySelectorAll('.card-favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.kind, btn.dataset.id);
    });
  });
}

// ===================== Movies =====================
function renderMovies(container) {
  const filter = subFilters.movies;
  let items = library.movies;
  if (filter === 'watched') items = items.filter(m => m.status === 'watched');
  else if (filter === 'watchlist') items = items.filter(m => m.status === 'watchlist');
  else if (filter === 'favorites') items = items.filter(m => m.favorite);

  container.innerHTML = `
    <div class="subtabs">
      ${isAllFilterEnabled('movies') ? subtabBtn('movies', 'all', t('subtab.all')) : ''}
      ${subtabBtn('movies', 'watchlist', t('subtab.watchlist'))}
      ${subtabBtn('movies', 'watched', t('subtab.watched'))}
      ${subtabBtn('movies', 'favorites', t('subtab.favorites'))}
    </div>
    <div class="grid" id="movies-grid"></div>
  `;
  bindSubtabs(container, 'movies');

  const grid = document.getElementById('movies-grid');
  if (items.length === 0) {
    grid.outerHTML = `<div class="empty-state"><div class="big">${iconSvg('movies', 'icon icon--lg')}</div>${t('empty.noMovies')}<br><br><button class="btn btn-primary" onclick="openAddMovieModal()">${iconSvg('plus', 'icon icon--sm')} ${t('action.addMovie')}</button></div>`;
  } else {
    grid.innerHTML = items.slice().reverse().map(m => cardHtml(m, 'movies')).join('');
    attachCardHandlers(grid);
  }
}

function subtabBtn(kind, value, label) {
  const active = subFilters[kind] === value ? 'active' : '';
  return `<button class="subtab ${active}" data-kind="${kind}" data-value="${value}">${label}</button>`;
}
function bindSubtabs(container, kind) {
  container.querySelectorAll('.subtab').forEach(btn => {
    btn.addEventListener('click', () => {
      subFilters[kind] = btn.dataset.value;
      renderView();
    });
  });
}

function openAddMovieModal() {
  openModal(`
    <h2>${t('modal.addMovie.title')}</h2>
    <div class="form-row">
      <label>${t('label.searchTmdb') || 'Search TMDB'}</label>
      <div class="search-box" style="border-radius:8px;">
        <input type="text" id="movie-search-input" placeholder="${t('placeholder.movieName') || 'Enter movie name...' }" />
      </div>
    </div>
    <div class="search-results" id="movie-search-results"></div>
    <div class="modal-close-row">
      <button class="btn" id="cancel-btn">انصراف</button>
    </div>
  `);
  document.getElementById('cancel-btn').addEventListener('click', closeModal);
  const input = document.getElementById('movie-search-input');
  input.focus();
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(async () => {
      const q = input.value.trim();
      if (!q) { document.getElementById('movie-search-results').innerHTML = ''; return; }
      const results = await tmdbSearch('movie', q);
      renderMovieSearchResults(results);
    }, 400);
  });
}

function renderMovieSearchResults(results) {
  const box = document.getElementById('movie-search-results');
  if (!box) return;
  if (results.length === 0) {
    box.innerHTML = `<div class="card-meta">${t('search.noResults')}</div>`;
    return;
  }
  box.innerHTML = results.map(r => `
    <div class="search-result-item" data-id="${r.id}">
      <img src="${r.poster_path ? TMDB_IMG + r.poster_path : ''}" onerror="this.style.display='none'" />
      <div>
        <div class="sri-title">${escapeHtml(r.title || r.original_title)}</div>
        <div class="sri-meta">${(r.release_date || '').slice(0, 4)}</div>
      </div>
    </div>
  `).join('');
  box.querySelectorAll('.search-result-item').forEach(el => {
    el.addEventListener('click', () => {
      const r = results.find(x => String(x.id) === el.dataset.id);
      addMovieFromTmdb(r);
    });
  });
}

async function addMovieFromTmdb(r) {
  if (library.movies.some(m => m.tmdbId === r.id)) {
    toast(t('toast.movieExists'));
    return;
  }
  const posterUrl = r.poster_path ? TMDB_IMG + r.poster_path : '';
  const movie = {
    id: uid(),
    tmdbId: r.id,
    title: r.title || r.original_title,
    poster: await toOfflineImage(posterUrl),
    year: (r.release_date || '').slice(0, 4),
    overview: r.overview || '',
    status: 'watchlist',
    favorite: false,
    rating: 0,
    dateAdded: new Date().toISOString()
  };
  library.movies.push(movie);
  persistLibrary();
  closeModal();
  toast(t('toast.added.movie'));
  renderView();
}

function openAddAlertModal() {
  openModal(`
    <h2>${t('modal.addAlert.title')}</h2>
    <div class="form-row">
      <label>${t('label.title')}</label>
      <input id="alert-title" type="text" placeholder="${t('placeholder.exampleTitle') || 'e.g. Movie night'}" />
    </div>
    <div class="form-row">
      <label>${t('label.alertMessage')}</label>
      <textarea id="alert-message" placeholder="${t('placeholder.alertMessage')}"></textarea>
    </div>
    <div class="form-row">
      <label>${t('label.level')}</label>
      <select id="alert-kind">
        <option value="info">${t('option.info')}</option>
        <option value="warning">${t('option.warning')}</option>
        <option value="success">${t('option.success')}</option>
      </select>
    </div>
    <div class="modal-close-row">
      <button class="btn" id="cancel-btn">${t('button.cancel')}</button>
      <button class="btn btn-primary" id="save-alert-btn">${t('button.save')}</button>
    </div>
  `);
  document.getElementById('cancel-btn').addEventListener('click', closeModal);
  document.getElementById('save-alert-btn').addEventListener('click', () => {
    const title = document.getElementById('alert-title').value.trim();
    const message = document.getElementById('alert-message').value.trim();
    const kind = document.getElementById('alert-kind').value;
    if (!title || !message) {
      toast(t('toast.alertMissing'));
      return;
    }
    createAlert({ title, message, kind });
    closeModal();
    renderView();
    toast(t('toast.alertAdded'));
  });
}

function openAddReminderModal() {
  openModal(`
    <h2>${t('modal.addReminder.title') || 'افزودن یادآور'}</h2>
    <div class="form-row">
      <label>${t('label.title')}</label>
      <input id="reminder-title" type="text" placeholder="${t('placeholder.exampleTitle') || 'e.g. New movie'}" />
    </div>
    <div class="form-row">
      <label>${t('label.message') || 'متن'}</label>
      <textarea id="reminder-message" placeholder="${t('placeholder.reminderMessage') || 'Reminder details'}"></textarea>
    </div>
    <div class="form-row">
      <label>${t('label.time') || 'زمان'}</label>
      <input id="reminder-due-at" type="datetime-local" />
    </div>
    <div class="modal-close-row">
      <button class="btn" id="cancel-btn">انصراف</button>
      <button class="btn btn-primary" id="save-reminder-btn">ذخیره</button>
    </div>
  `);
  document.getElementById('cancel-btn').addEventListener('click', closeModal);
  document.getElementById('save-reminder-btn').addEventListener('click', () => {
    const title = document.getElementById('reminder-title').value.trim();
    const message = document.getElementById('reminder-message').value.trim();
    const dueAt = document.getElementById('reminder-due-at').value;
    if (!title || !message || !dueAt) {
      toast(t('toast.reminderMissing'));
      return;
    }
    library.reminders = Array.isArray(library.reminders) ? library.reminders : [];
    library.reminders.push({
      id: uid(),
      title,
      message,
      dueAt: new Date(dueAt).toISOString(),
      done: false,
      createdAt: new Date().toISOString()
    });
    persistLibrary();
    closeModal();
    renderView();
    toast(t('toast.added.reminder') || t('toast.added.show') || 'یادآور اضافه شد');
  });
}

function completeReminder(id) {
  library.reminders = (library.reminders || []).map(reminder => reminder.id === id ? { ...reminder, done: true } : reminder);
  persistLibrary();
  renderView();
}

function openMovieDetail(id) {
  const m = library.movies.find(x => x.id === id);
  if (!m) return;
  openModal(`
    <div class="detail-header">
      ${m.poster ? `<img src="${escapeHtml(m.poster)}" />` : ''}
      <div>
        <div class="dh-title">${escapeHtml(m.title)}</div>
        <div class="card-meta">${escapeHtml(m.year)}</div>
        <div class="dh-overview">${escapeHtml(m.overview)}</div>
      </div>
    </div>

    <div class="form-row">
      <label>${t('label.level')}</label>
      <select id="movie-status">
        <option value="watchlist" ${m.status === 'watchlist' ? 'selected' : ''}>
          ${t('badge.watchlist')}
        </option>
        <option value="watched" ${m.status === 'watched' ? 'selected' : ''}>
          ${t('badge.watched')}
        </option>
      </select>
    </div>

    <div class="form-row">
      <label>${t('label.favorite')}</label>
      <label class="switch">
        <input type="checkbox" id="movie-favorite" ${m.favorite ? 'checked' : ''} />
        <span class="slider"></span>
      </label>
    </div>

    <div class="form-row">
      <label>${t('label.level')}</label>
      ${starsHtml(m.rating || 0, m.id, 'movies')}
    </div>

    <div class="modal-close-row">
      <button class="btn btn-danger" id="delete-btn">
        ${t('button.hide')}
      </button>

      <button class="btn" id="cancel-btn">
        ${t('button.cancel')}
      </button>

      <button class="btn btn-primary" id="save-btn">
        ${t('button.save')}
      </button>
    </div>
  `);
  attachStarHandlers(document.getElementById('modal-box'));
  document.getElementById('cancel-btn').addEventListener('click', closeModal);
  document.getElementById('delete-btn').addEventListener('click', () => {
    library.movies = library.movies.filter(x => x.id !== id);
    persistLibrary();
    closeModal();
    renderView();
    toast('فیلم حذف شد');
  });
  document.getElementById('save-btn').addEventListener('click', () => {
    const previousStatus = m.status;
    m.status = document.getElementById('movie-status').value;
    m.favorite = document.getElementById('movie-favorite').checked;
    persistLibrary();
    if (previousStatus !== m.status && m.status === 'watched') {
      createAlert({
        title: `${m.title} دیده شد`,
        message: 'این فیلم با موفقیت به وضعیت دیده‌شده رسید.',
        kind: 'success',
        relatedKind: 'movies',
        relatedId: m.id
      });
    }
    closeModal();
    renderView();
    toast('ذخیره شد');
  });
}

// ===================== Books =====================
async function booksSearch(query) {
  const googleUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12${settings.booksApiKey ? `&key=${encodeURIComponent(settings.booksApiKey)}` : ''}`;

  if (settings.booksApiKey) {
    try {
      const res = await fetch(googleUrl);
      if (res.ok) {
        const data = await res.json();
        return (data.items || []).map(item => ({
          id: item.id,
          title: item.volumeInfo?.title || 'بدون عنوان',
          author: item.volumeInfo?.authors?.join(', ') || 'ناشناس',
          cover: item.volumeInfo?.imageLinks?.thumbnail || '',
          year: (item.volumeInfo?.publishedDate || '').slice(0, 4),
          description: item.volumeInfo?.description || ''
        }));
      }
    } catch (err) {
      console.error('Google Books search failed', err);
    }
  }

  const openLibraryResults = await openLibrarySearch(query);
  return (openLibraryResults || []).map(doc => ({
    id: doc.key || doc.isbn?.[0] || `${doc.title}-${doc.first_publish_year || ''}`,
    title: doc.title || 'بدون عنوان',
    author: (doc.author_name || []).join(', ') || 'ناشناس',
    cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : '',
    year: doc.first_publish_year ? String(doc.first_publish_year) : '',
    description: doc.subtitle || ''
  }));
}

function renderBooks(container) {
  const filter = subFilters.books;
  let items = library.books;
  if (filter === 'reading') items = items.filter(b => b.status === 'reading');
  else if (filter === 'read') items = items.filter(b => b.status === 'read');
  else if (filter === 'watchlist') items = items.filter(b => b.status === 'watchlist');
  else if (filter === 'favorites') items = items.filter(b => b.favorite);

  container.innerHTML = `
    <div class="subtabs">
      ${isAllFilterEnabled('books') ? subtabBtn('books', 'all', 'همه') : ''}
      ${subtabBtn('books', 'watchlist', 'لیست خواندن')}
      ${subtabBtn('books', 'reading', 'در حال خواندن')}
      ${subtabBtn('books', 'read', 'خوانده‌شده')}
      ${subtabBtn('books', 'favorites', 'علاقه‌مندی‌ها')}
    </div>
    <div class="grid" id="books-grid"></div>
  `;
  bindSubtabs(container, 'books');

  const grid = document.getElementById('books-grid');
  if (items.length === 0) {
    grid.outerHTML = `<div class="empty-state"><div class="big">${iconSvg('books', 'icon icon--lg')}</div>هنوز کتابی اضافه نکرده‌اید<br><br><button class="btn btn-primary" onclick="openAddBookModal()">${iconSvg('plus', 'icon icon--sm')} افزودن کتاب</button></div>`;
  } else {
    grid.innerHTML = items.slice().reverse().map(b => cardHtml(b, 'books')).join('');
    attachCardHandlers(grid);
  }
}

function openAddBookModal() {
  openModal(`
    <h2>افزودن کتاب</h2>
    <div class="form-row">
      <label>جستجو در کتاب‌ها</label>
      <div class="search-box" style="border-radius:8px;">
        <input type="text" id="book-search-input" placeholder="نام کتاب یا نویسنده را وارد کنید..." />
      </div>
    </div>
    <div class="search-results" id="book-search-results"></div>
    <div class="modal-close-row">
      <button class="btn" id="cancel-btn">انصراف</button>
    </div>
  `);
  document.getElementById('cancel-btn').addEventListener('click', closeModal);
  const input = document.getElementById('book-search-input');
  input.focus();
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(async () => {
      const q = input.value.trim();
      if (!q) { document.getElementById('book-search-results').innerHTML = ''; return; }
      const results = await booksSearch(q);
      renderBookSearchResults(results);
    }, 400);
  });
}

function renderBookSearchResults(results) {
  const box = document.getElementById('book-search-results');
  if (!box) return;
  if (results.length === 0) {
    box.innerHTML = `<div class="card-meta">${t('search.noResults')}</div>`;
    return;
  }

  box.innerHTML = results.map(r => `
    <div class="search-result-item" data-id="${escapeHtml(r.id)}">
      <img src="${escapeHtml(r.cover)}" onerror="this.style.display='none'" />
      <div>
        <div class="sri-title">${escapeHtml(r.title)}</div>
        <div class="sri-meta">${escapeHtml(r.author)}${r.year ? ` · ${escapeHtml(r.year)}` : ''}</div>
      </div>
    </div>
  `).join('');

  box.querySelectorAll('.search-result-item').forEach(el => {
    el.addEventListener('click', () => {
      const selected = results.find(x => String(x.id) === el.dataset.id);
      addBookFromSearch(selected);
    });
  });
}

async function addBookFromSearch(book) {
  if (!book) return;
  if (library.books.some(b => b.title === book.title && b.author === book.author)) {
    toast('این کتاب قبلاً اضافه شده است');
    return;
  }

  const newBook = {
    id: uid(),
    title: book.title || 'بدون عنوان',
    author: book.author || 'ناشناس',
    cover: await toOfflineImage(book.cover || ''),
    year: book.year || '',
    overview: book.description || '',
    status: 'watchlist',
    favorite: false,
    currentPage: 0,
    totalPages: 0,
    rating: 0,
    dateAdded: new Date().toISOString()
  };

  library.books.push(newBook);
  persistLibrary();
  closeModal();
  toast('کتاب اضافه شد');
  renderView();
}

function openBookDetail(id) {
  const b = library.books.find(x => x.id === id);
  if (!b) return;

  openModal(`
    <div class="detail-header">
      ${b.cover ? `<img src="${escapeHtml(b.cover)}" />` : ''}
      <div>
        <div class="dh-title">${escapeHtml(b.title)}</div>
        <div class="card-meta">${escapeHtml(b.author)}${b.year ? ` · ${escapeHtml(b.year)}` : ''}</div>
        <div class="dh-overview">${escapeHtml(b.overview)}</div>
      </div>
    </div>
    <div class="form-row">
      <label>وضعیت</label>
      <select id="book-status">
        <option value="watchlist" ${b.status === 'watchlist' ? 'selected' : ''}>لیست خواندن</option>
        <option value="reading" ${b.status === 'reading' ? 'selected' : ''}>در حال خواندن</option>
        <option value="read" ${b.status === 'read' ? 'selected' : ''}>خوانده‌شده</option>
      </select>
    </div>
    <div class="form-row">
      <label>صفحه فعلی</label>
      <input id="book-current-page" type="number" min="0" value="${b.currentPage || 0}" />
    </div>
    <div class="form-row">
      <label>تعداد کل صفحات</label>
      <input id="book-total-pages" type="number" min="0" value="${b.totalPages || 0}" />
    </div>
    <div class="form-row">
      <label>علاقه‌مندی</label>
      <label class="switch">
        <input type="checkbox" id="book-favorite" ${b.favorite ? 'checked' : ''} />
        <span class="slider"></span>
      </label>
    </div>
    <div class="form-row">
      <label>امتیاز</label>
      ${starsHtml(b.rating || 0, b.id, 'books')}
    </div>
    <div class="modal-close-row">
      <button class="btn btn-danger" id="delete-btn">حذف</button>
      <button class="btn" id="cancel-btn">بستن</button>
      <button class="btn btn-primary" id="save-btn">ذخیره</button>
    </div>
  `);

  attachStarHandlers(document.getElementById('modal-box'));
  document.getElementById('cancel-btn').addEventListener('click', closeModal);
  document.getElementById('delete-btn').addEventListener('click', () => {
    library.books = library.books.filter(x => x.id !== id);
    persistLibrary();
    closeModal();
    renderView();
    toast('کتاب حذف شد');
  });
  document.getElementById('save-btn').addEventListener('click', () => {
    const selectedStatus = document.getElementById('book-status').value;
    const previousStatus = b.status;
    b.currentPage = parseInt(document.getElementById('book-current-page').value, 10) || 0;
    b.totalPages = parseInt(document.getElementById('book-total-pages').value, 10) || 0;

    if (selectedStatus === 'watchlist' || selectedStatus === 'reading' || selectedStatus === 'read') {
      b.status = selectedStatus;
    } else {
      syncBookProgressStatus(b);
    }

    if (selectedStatus === 'watchlist' || selectedStatus === 'reading' || selectedStatus === 'read') {
      syncBookProgressStatus(b);
    }

    b.favorite = document.getElementById('book-favorite').checked;
    persistLibrary();
    if (previousStatus !== b.status && (b.status === 'reading' || b.status === 'read')) {
      createAlert({
        title: `${b.title} ${b.status === 'read' ? 'خوانده شد' : 'در حال خواندن است'}`,
        message: b.status === 'read' ? 'این کتاب به وضعیت خوانده‌شده رسید.' : 'این کتاب در حال خواندن است و به‌روزرسانی شد.',
        kind: b.status === 'read' ? 'success' : 'info',
        relatedKind: 'books',
        relatedId: b.id
      });
    }
    closeModal();
    renderView();
    toast('ذخیره شد');
  });
}

// ===================== Shows =====================
function renderShows(container) {
  const filter = subFilters.shows;
  let items = library.shows;
  if (filter === 'watching') items = items.filter(s => s.status === 'watching');
  else if (filter === 'watched') items = items.filter(s => s.status === 'watched');
  else if (filter === 'watchlist') items = items.filter(s => s.status === 'watchlist');
  else if (filter === 'abandoned') items = items.filter(s => s.status === 'abandoned');
  else if (filter === 'favorites') items = items.filter(s => s.favorite);

  container.innerHTML = `
    <div class="subtabs">
      ${isAllFilterEnabled('shows') ? subtabBtn('shows', 'all', 'همه') : ''}
      ${subtabBtn('shows', 'watchlist', 'لیست تماشا')}
      ${subtabBtn('shows', 'watching', 'در حال تماشا')}
      ${subtabBtn('shows', 'watched', 'تمام‌شده')}
      ${subtabBtn('shows', 'abandoned', 'رها شده')}
      ${subtabBtn('shows', 'favorites', 'علاقه‌مندی‌ها')}
    </div>
    <div class="grid" id="shows-grid"></div>
  `;
  bindSubtabs(container, 'shows');

  const grid = document.getElementById('shows-grid');
  if (items.length === 0) {
    grid.outerHTML = `<div class="empty-state"><div class="big">${iconSvg('shows', 'icon icon--lg')}</div>هنوز سریالی اضافه نکرده‌اید<br><br><button class="btn btn-primary" onclick="openAddShowModal()">${iconSvg('plus', 'icon icon--sm')} افزودن سریال</button></div>`;
  } else {
    grid.innerHTML = items.slice().reverse().map(s => cardHtml(s, 'shows')).join('');
    attachCardHandlers(grid);
  }
}

function openAddShowModal() {
  openModal(`
    <h2>افزودن سریال</h2>
    <div class="form-row">
      <label>جستجو در TMDB</label>
      <div class="search-box" style="border-radius:8px;">
        <input type="text" id="show-search-input" placeholder="نام سریال را وارد کنید..." />
      </div>
    </div>
    <div class="search-results" id="show-search-results"></div>
    <div class="modal-close-row">
      <button class="btn" id="cancel-btn">انصراف</button>
    </div>
  `);
  document.getElementById('cancel-btn').addEventListener('click', closeModal);
  const input = document.getElementById('show-search-input');
  input.focus();
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(async () => {
      const q = input.value.trim();
      if (!q) { document.getElementById('show-search-results').innerHTML = ''; return; }
      const results = await tmdbSearch('tv', q);
      renderShowSearchResults(results);
    }, 400);
  });
}

function renderShowSearchResults(results) {
  const box = document.getElementById('show-search-results');
  if (!box) return;
  if (results.length === 0) {
    box.innerHTML = `<div class="card-meta">نتیجه‌ای یافت نشد</div>`;
    return;
  }
  box.innerHTML = results.map(r => `
    <div class="search-result-item" data-id="${r.id}">
      <img src="${r.poster_path ? TMDB_IMG + r.poster_path : ''}" onerror="this.style.display='none'" />
      <div>
        <div class="sri-title">${escapeHtml(r.name || r.original_name)}</div>
        <div class="sri-meta">${(r.first_air_date || '').slice(0, 4)}</div>
      </div>
    </div>
  `).join('');
  box.querySelectorAll('.search-result-item').forEach(el => {
    el.addEventListener('click', () => {
      const r = results.find(x => String(x.id) === el.dataset.id);
      addShowFromTmdb(r);
    });
  });
}

async function addShowFromTmdb(r) {
  if (library.shows.some(s => s.tmdbId === r.id)) {
    toast('این سریال قبلاً اضافه شده است');
    return;
  }
  toast('در حال دریافت اطلاعات فصل‌ها...');
  let details;
  try {
    details = await tmdbGetTvDetails(r.id);
  } catch (err) {
    toast('خطا در دریافت اطلاعات سریال');
    return;
  }
  const seasons = (details.seasons || [])
    .filter(s => s.season_number !== 0)
    .map(s => ({
      seasonNumber: s.season_number,
      name: s.name || `فصل ${s.season_number}`,
      episodeCount: s.episode_count || 0,
      watchedEpisodes: []
    }));

  const posterUrl = r.poster_path ? TMDB_IMG + r.poster_path : '';
  const show = {
    id: uid(),
    tmdbId: r.id,
    title: r.name || r.original_name,
    poster: await toOfflineImage(posterUrl),
    year: (r.first_air_date || '').slice(0, 4),
    overview: r.overview || '',
    status: 'watchlist',
    favorite: false,
    rating: 0,
    numberOfSeasons: seasons.length,
    seasons,
    dateAdded: new Date().toISOString()
  };
  library.shows.push(show);
  persistLibrary();
  closeModal();
  toast('سریال اضافه شد');
  renderView();
}

function openShowDetail(id) {
  const s = library.shows.find(x => x.id === id);
  if (!s) return;

  const totalEp = s.seasons.reduce((a, se) => a + (se.episodeCount || 0), 0);
  const watchedEp = s.seasons.reduce((a, se) => a + (se.watchedEpisodes || []).length, 0);

  const seasonsHtml = s.seasons.map((se, idx) => {
    const episodes = Array.from({ length: se.episodeCount }, (_, i) => i + 1);
    const seasonWatched = (se.watchedEpisodes || []).length;
    return `
      <div class="season-block">
        <div class="season-block-header" data-idx="${idx}">
          <span>${escapeHtml(se.name)} (${seasonWatched}/${se.episodeCount})</span>
          <span>
            <button class="btn btn-sm" data-mark-season="${idx}" onclick="event.stopPropagation()">علامت‌گذاری همه</button>
            ▾
          </span>
        </div>
        <div class="season-block-body" id="season-body-${idx}">
          ${episodes.map(ep => `
            <div class="episode-row">
              <label>
                <input type="checkbox" data-season="${idx}" data-ep="${ep}" ${(se.watchedEpisodes || []).includes(ep) ? 'checked' : ''}/>
                قسمت ${ep}
              </label>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  openModal(`
    <div class="detail-header">
      ${s.poster ? `<img src="${escapeHtml(s.poster)}" />` : ''}
      <div>
        <div class="dh-title">${escapeHtml(s.title)}</div>
        <div class="card-meta">${escapeHtml(s.year)} · ${watchedEp}/${totalEp} قسمت دیده‌شده</div>
        <div class="dh-overview">${escapeHtml(s.overview)}</div>
      </div>
    </div>
    <div class="form-row">
      <label>وضعیت</label>
      <select id="show-status">
        <option value="watchlist" ${s.status === 'watchlist' ? 'selected' : ''}>لیست تماشا</option>
        <option value="watching" ${s.status === 'watching' ? 'selected' : ''}>در حال تماشا</option>
        <option value="watched" ${s.status === 'watched' ? 'selected' : ''}>تمام‌شده</option>
        <option value="abandoned" ${s.status === 'abandoned' ? 'selected' : ''}>رها شده</option>
      </select>
    </div>
    <div class="form-row">
      <label>علاقه‌مندی</label>
      <label class="switch">
        <input type="checkbox" id="show-favorite" ${s.favorite ? 'checked' : ''} />
        <span class="slider"></span>
      </label>
    </div>
    <div class="form-row">
      <label>امتیاز</label>
      ${starsHtml(s.rating || 0, s.id, 'shows')}
    </div>
    <div class="form-row">
      <label>فصل‌ها و قسمت‌ها</label>
      ${seasonsHtml || '<div class="card-meta">اطلاعات فصلی موجود نیست</div>'}
    </div>
    <div class="modal-close-row">
      <button class="btn btn-danger" id="delete-btn">حذف</button>
      <button class="btn" id="cancel-btn">بستن</button>
      <button class="btn btn-primary" id="save-btn">ذخیره</button>
    </div>
  `);

  attachStarHandlers(document.getElementById('modal-box'));

  document.querySelectorAll('.season-block-header').forEach(h => {
    h.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const idx = h.dataset.idx;
      document.getElementById(`season-body-${idx}`).classList.toggle('open');
    });
  });

  document.querySelectorAll('[data-mark-season]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.markSeason, 10);
      const se = s.seasons[idx];
      const allWatched = (se.watchedEpisodes || []).length === se.episodeCount;
      se.watchedEpisodes = allWatched ? [] : Array.from({ length: se.episodeCount }, (_, i) => i + 1);
      syncShowProgressStatus(s);
      persistLibrary();
      openShowDetail(id); // re-render
    });
  });

  document.querySelectorAll('.episode-row input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const seasonIdx = parseInt(cb.dataset.season, 10);
      const ep = parseInt(cb.dataset.ep, 10);
      const se = s.seasons[seasonIdx];
      se.watchedEpisodes = se.watchedEpisodes || [];
      if (cb.checked) {
        if (!se.watchedEpisodes.includes(ep)) se.watchedEpisodes.push(ep);
      } else {
        se.watchedEpisodes = se.watchedEpisodes.filter(x => x !== ep);
      }
      syncShowProgressStatus(s);
      persistLibrary();
      renderView();
      openShowDetail(id);
    });
  });

  document.getElementById('cancel-btn').addEventListener('click', closeModal);
  document.getElementById('delete-btn').addEventListener('click', () => {
    library.shows = library.shows.filter(x => x.id !== id);
    persistLibrary();
    closeModal();
    renderView();
    toast('سریال حذف شد');
  });
  document.getElementById('save-btn').addEventListener('click', () => {
    const previousStatus = s.status;
    s.status = document.getElementById('show-status').value;
    s.favorite = document.getElementById('show-favorite').checked;
    persistLibrary();
    if (previousStatus !== s.status && ['watching', 'watched', 'abandoned'].includes(s.status)) {
      createAlert({
        title: `${s.title} ${s.status === 'watched' ? 'تمام شد' : s.status === 'abandoned' ? 'رها شد' : 'در حال تماشا است'}`,
        message: s.status === 'watched'
          ? 'این سریال به وضعیت تمام‌شده رسید.'
          : s.status === 'abandoned'
            ? 'این سریال به وضعیت رها شده منتقل شد.'
            : 'این سریال در حال تماشا است.',
        kind: s.status === 'watched' ? 'success' : s.status === 'abandoned' ? 'warning' : 'info',
        relatedKind: 'shows',
        relatedId: s.id
      });
    }
    closeModal();
    renderView();
    toast('ذخیره شد');
  });
}

initApp();
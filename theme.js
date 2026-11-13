const themeKey = 'public-preview-theme';
const root = document.documentElement;

try {
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    root.dataset.theme = savedTheme;
  }
} catch {
  // Follow the system appearance when browser storage is unavailable.
}

document.addEventListener('DOMContentLoaded', () => {
  const picker = document.querySelector('.theme-picker');
  const select = picker.querySelector('select');
  select.value = root.dataset.theme || 'auto';
  picker.hidden = false;

  select.addEventListener('change', () => {
    const theme = select.value;
    if (theme === 'auto') {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = theme;
    }

    try {
      localStorage.setItem(themeKey, theme);
    } catch {
      // Keep the selected appearance for the current page.
    }
  });
});

const openTarget = (hash = location.hash) => {
  let id = '';
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    return;
  }
  if (!id) return;
  const target = document.getElementById(id);
  const card = target && target.closest('details');
  if (card && !card.open) {
    card.open = true;
    target.scrollIntoView();
  }
};
window.addEventListener('hashchange', () => openTarget());
document.addEventListener('DOMContentLoaded', () => {
  openTarget();
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (link) openTarget(link.getAttribute('href'));
  });
});

let closedBeforePrint = [];
window.addEventListener('beforeprint', () => {
  closedBeforePrint = [...document.querySelectorAll('details:not([open])')];
  closedBeforePrint.forEach((d) => { d.open = true; });
});
window.addEventListener('afterprint', () => {
  closedBeforePrint.forEach((d) => { d.open = false; });
  closedBeforePrint = [];
});

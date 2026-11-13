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

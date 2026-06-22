// Theme switcher
document.getElementById('themeSelect').addEventListener('change', (e) => {
  document.documentElement.setAttribute('data-theme', e.target.value);
});
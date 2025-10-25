// initialise three Leaflet maps
const mapConfigs = [
    { id: 'map1', center: [49.98847, 8.22739], zoom: 16 },
    { id: 'map2', center: [49.99727, 8.277919], zoom: 16 },
    { id: 'map3', center: [50, 8.27], zoom: 13 }
];

mapConfigs.forEach(cfg => {
    const m = L.map(cfg.id).setView(cfg.center, cfg.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(m);
});


function initializeDarkModeToggle() {
    // Theme Toggle Funktionalität
    const themeToggle = document.getElementById('themeToggle');

    // Prüfe gespeichertes Theme oder System-Einstellung
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Setze initiales Theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    // Theme Toggle Handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

initializeDarkModeToggle();


function initMaps() {
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
}

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


function prepareTabButtonsSelect() {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        const targetTab = button.getAttribute('data-tab');

        button.addEventListener('click', () => {
            tabContents.forEach(contentElement => {
                if (contentElement.getAttribute('data-tab') === targetTab) {
                    contentElement.classList.remove('hidden');
                } else {
                    contentElement.classList.add('hidden');
                }
            });
        });
    });
}

function fillNewsSection(data) {
    const newsSection = document.getElementById('news');
    if (!newsSection) return;

    data.forEach(item => {
        const article = document.createElement('article');
        newsSection.appendChild(article);

        const title = document.createElement('h3');
        title.textContent = item.title;
        article.appendChild(title);

        const date = document.createElement('time');
        date.textContent = item.date;
        article.appendChild(date);

        const content = document.createElement('p');
        content.textContent = item.content;
        article.appendChild(content);

        const image = document.createElement('img');
        image.src = item.imageUrl;
        image.alt = item.title;
        image.classList.add('news_image');
        article.appendChild(image);

        newsSection.appendChild(article);
    });
}

// Initialisiere alle Funktionen beim Laden der Seite
function initFunctions() {

    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            fillNewsSection(data);
        });

    initMaps();
    initializeDarkModeToggle();
    prepareTabButtonsSelect();
}
initFunctions();

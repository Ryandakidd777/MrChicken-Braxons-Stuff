/* © 2026 MrChicken's Homemade Website. All rights reserved. */
// Navigation must actually be fetched, inserted and have its logo ready.
const finishNavigationLoading = window.SiteLoader?.begin('Loading navigation');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadHeaderComponent();
        finishNavigationLoading?.();
    } catch (error) {
        console.error('Navigation component failed to load:', error);
        showFallbackNavigation();
        finishNavigationLoading?.(error);
    }
}, { once: true });

async function loadHeaderComponent() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    let htmlContent;

    try {
        const response = await fetch('/Components/header.html', { signal: controller.signal });
        if (!response.ok) throw new Error(`Navigation request returned HTTP ${response.status}`);
        htmlContent = await response.text();
    } finally {
        clearTimeout(timeout);
    }

    document.body.insertAdjacentHTML('afterbegin', htmlContent);
    highlightCurrentPage();

    // Dynamic images aren't present in the initial HTML image collection.
    const logo = document.querySelector('.site-header .logo-img');
    if (logo && window.SiteLoader) await window.SiteLoader.waitForImage(logo);
}

function showFallbackNavigation() {
    if (document.querySelector('.site-header')) return;
    // Usable local links even if the shared navigation fragment is unavailable.
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
        <div class="header-container">
            <a href="/" class="logo"><span class="logo-text">MrChicken's Homemade Website</span></a>
            <nav class="main-nav" aria-label="Main navigation"><ul>
                <li><a href="/" class="nav-link" id="nav-home">Home</a></li>
                <li><a href="/Pages/Projects/" class="nav-link" id="nav-projects">Projects</a></li>
                <li><a href="/Pages/Contact/" class="nav-link" id="nav-contact">Contact</a></li>
                <li><a href="/Pages/Links/" class="nav-link" id="nav-links">Links</a></li>
            </ul></nav>
        </div>`;
    document.body.prepend(header);
    highlightCurrentPage();
}

function highlightCurrentPage() {
    const path = window.location.pathname.replace(/index\.html$/i, '');
    const activeId = path === '/' ? 'nav-home'
        : path.startsWith('/Pages/Projects/') ? 'nav-projects'
        : path.startsWith('/Pages/About/') ? 'nav-about'
        : path.startsWith('/Pages/Contact/') ? 'nav-contact'
        : path.startsWith('/Pages/Links/') ? 'nav-links'
        : null;
    if (activeId) document.getElementById(activeId)?.classList.add('active');
}

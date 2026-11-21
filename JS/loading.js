/* MrChicken's Homemade Website - Simple loading coordinator.
 * Automatically watches page scripts, CSS, and images. It waits for your
 * existing header/footer/app startup tasks too.
 *
 * For a new asynchronous feature:
 *   const done = SiteLoader.begin('Loading my feature');
 *   // Call done() when ready, or done(error) if it fails.
 *
 * Progress estimates bytes using browser resource timing when available,
 * otherwise by resource type. It is NOT a live network-byte counter.
 */
(() => {
  'use strict';

  const root = document.documentElement;
  const overlay = document.getElementById('loader');
  if (!overlay) { root.classList.remove('site-loading'); return; }

  // Change only these values to configure the entire loader.
  const OPTIONS = {
    warningAfter: 7000,
    taskTimeout: 18000,
    // Estimated KB while a resource is still downloading.
    estimatedKB: { image: 180, script: 25, style: 20, page: 30, task: 10, font: 10 }
  };

  const fill = document.getElementById('loader-progress-fill');
  const percentage = document.getElementById('loader-percent');
  const progressBar = document.getElementById('loader-progress');
  const stuck = document.getElementById('loader-stuck');
  const warning = document.getElementById('loader-warning');
  const tasks = [];
  const watched = new WeakSet();
  let domReady = false;
  let finished = false;
  let slow = false;
  let highest = 0;
  let errorMessage = '';

  // Use actual resource size if the browser reports it (typically after loading).
  function actualBytes(url) {
    if (!url) return 0;
    try {
      const entry = performance.getEntriesByName(new URL(url, location.href).href, 'resource').at(-1);
      return entry?.encodedBodySize || entry?.decodedBodySize || 0;
    } catch { return 0; }
  }

  function add(name, type = 'task', url = '', timeout = OPTIONS.taskTimeout) {
    const task = { name, url, type, done: false, error: false };
    tasks.push(task);
    const timer = setTimeout(() => complete(new Error(`${name} timed out`)), timeout);
    function complete(error) {
      if (task.done || finished) return;
      task.done = true;
      task.error = !!error;
      if (error) {
        errorMessage ||= `${name}: ${error.message || error}`;
        console.warn('[SiteLoader]', name, error);
      }
      clearTimeout(timer);
      update();
    }
    update();
    return complete;
  }

  function update() {
    if (finished || !domReady) return;
    let total = 0, loaded = 0, pending = 0, failed = 0;
    for (const task of tasks) {
      const weight = (task.done && !task.error ? actualBytes(task.url) : 0) ||
        OPTIONS.estimatedKB[task.type] * 1024;
      total += weight;
      if (task.done && !task.error) loaded += weight;
      else if (task.error) failed++;
      else pending++;
    }
    const ready = pending === 0 && failed === 0;
    highest = ready ? 100 : Math.max(highest, Math.min(99, Math.floor(100 * loaded / (total || 1))));
    fill.style.width = `${highest}%`;
    percentage.textContent = `${highest}%`;
    progressBar.setAttribute('aria-valuenow', highest);
    stuck.hidden = !(slow || failed);
    warning.hidden = !failed;
    if (failed) warning.textContent = errorMessage;
    if (ready) requestAnimationFrame(() => requestAnimationFrame(reveal));
  }

  function reveal() {
    if (finished || !domReady || tasks.some(task => !task.done || task.error)) return;
    finished = true;
    clearTimeout(window.__loaderBootFallback);
    clearTimeout(warningTimer);
    observer.disconnect();
    root.classList.remove('site-loading');
    overlay.classList.add('loader--hidden');
    setTimeout(() => overlay.remove(), 300);
  }

  function waitForImage(image) {
    return new Promise((resolve, reject) => {
      if (!image) return reject(new Error('Image not found'));
      const ready = () => {
        if (!image.naturalWidth) return reject(new Error(`Image failed: ${image.src}`));
        (image.decode ? image.decode().catch(() => {}) : Promise.resolve()).then(resolve);
      };
      if (image.complete) return ready();
      image.addEventListener('load', ready, { once: true });
      image.addEventListener('error', () => reject(new Error(`Image failed: ${image.src}`)), { once: true });
    });
  }

  function watchResources() {
    for (const image of document.querySelectorAll('img:not([data-loader-skip])')) {
      if (watched.has(image) || image.closest('#loader')) continue;
      watched.add(image);
      // Native lazy images may never load behind a fullscreen loader.
      image.loading = 'eager';
      const done = add(`Image: ${image.alt || image.src}`, 'image', image.currentSrc || image.src);
      waitForImage(image).then(() => done(), done);
    }
    for (const link of document.querySelectorAll('link[rel="stylesheet"]')) {
      if (watched.has(link)) continue;
      watched.add(link);
      const done = add(`CSS: ${link.href}`, 'style', link.href);
      if (link.sheet) done();
      else {
        link.addEventListener('load', () => done(), { once: true });
        link.addEventListener('error', () => done(new Error('Stylesheet failed')), { once: true });
      }
    }
    for (const script of document.querySelectorAll('script[src]')) {
      if (watched.has(script) || script.src.includes('/JS/loading.js')) continue;
      watched.add(script);
      const done = add(`Script: ${script.src}`, 'script', script.src);
      script.addEventListener('load', () => done(), { once: true });
      script.addEventListener('error', () => done(new Error('Script failed')), { once: true });
    }
  }

  // Public API stays compatible with the site's existing JavaScript.
  window.SiteLoader = {
    initialized: true,
    begin(name, timeout = OPTIONS.taskTimeout) { return finished ? () => {} : add(name, 'task', '', timeout); },
    waitForImage
  };
  clearTimeout(window.__loaderBootFallback);
  document.getElementById('loader-retry').addEventListener('click', () => location.reload());
  document.getElementById('loader-continue').addEventListener('click', () => {
    // Manual bypass of a failed or slow load.
    domReady = true;
    tasks.forEach(task => { task.done = true; task.error = false; });
    reveal();
  });

  const warningTimer = setTimeout(() => { slow = true; update(); }, OPTIONS.warningAfter);
  const observer = new MutationObserver(watchResources);
  observer.observe(document, { childList: true, subtree: true });
  const pageDone = add('Page HTML', 'page');
  watchResources();

  document.addEventListener('DOMContentLoaded', () => {
    pageDone();
    // Other scripts can register tasks and insert images in their DOM-ready handlers.
    setTimeout(() => {
      watchResources();
      if (document.fonts?.ready) {
        const done = add('Fonts', 'font');
        document.fonts.ready.then(() => done(), done);
      }
      domReady = true;
      update();
    }, 0);
  }, { once: true });
})();

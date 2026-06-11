/* --- Page Loader --- */

(function () {
    const loader = document.createElement("div");
    loader.id = "loader";

    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.loop = true; 
    video.id = "loader-video";
    video.setAttribute("playsinline", "");

    const source = document.createElement("source");
    source.src = "/Media/Videos/ExclamitionSpin02.mp4.webm";
    source.type = "video/webm";

    video.appendChild(source);
    loader.appendChild(video);
    document.body.prepend(loader);
})();

let secondsLoaded = 0;
let isPageLoaded = false;

const secondsToWait = 5;

const loadingCheckInterval = setInterval(() => {
    if (isPageLoaded) {
        clearInterval(loadingCheckInterval);
        return;
    }

    if (secondsLoaded >= secondsToWait) {
        const loader = document.getElementById("loader");

        if (loader && !document.querySelector(".loader-stuck-msg")) {
            const msgElement = document.createElement("div");
            msgElement.className = "loader-stuck-msg";

            msgElement.innerHTML = `
                <p>Stuck loading? Give it a minute, otherwise
                try <span class="refresh-link" onclick="window.location.reload()">refreshing</span>.
                <br>
                If this problem continues, please contact me at
                <br>
                mrchickencontacting.trc@gmail.com
                </p>
            `;

            loader.appendChild(msgElement);
        }

        clearInterval(loadingCheckInterval);
    }

    secondsLoaded++;
}, 1000);

window.addEventListener("load", function () {
    isPageLoaded = true;

    const loader = document.getElementById("loader");
    if (!loader) return;

    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 100);
    }, 100);
});

/* --- Initialization --- */
document.addEventListener("DOMContentLoaded", function() {
    initApp();
});

function initApp() {
    setupEventListeners();
}

/* --- Event Listeners --- */
function setupEventListeners() {

}

/* --- Core Functions --- */

/* --- Helpers & Utilities --- */
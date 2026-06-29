/*© 2026 MrChicken's Homemade Website. All rights reserved. */
//main.js

/* --- Initialization --- */
  //init
    document.addEventListener("DOMContentLoaded", function() {
        initApp();
    });

    function initApp() {
        setupEventListeners();
    }

  //page loader
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
            }, 250);
        }, 250);
    });

/* --- Event Listeners --- */
function setupEventListeners() {

}

/* --- Core Functions --- */
  //Title Handling
    const suffix = " | MrChicken's Homemade Website";
        if (!document.title.endsWith(suffix)) {
        document.title += suffix;
        }

  //Auto Favicon
    if (!document.querySelector('link[rel="icon"], link[rel="shortcut icon"]')) {
        const favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.type = "image/svg+xml";
        favicon.href = "/Media/Images/Logos/Exc_WebsiteFavicon.webp";
        document.head.appendChild(favicon);
    }

/* --- Helpers & Utilities --- */

/* --- Misc. --- */
  //console thing
    (function() {
    const text = "MrChicken was here";
    const fonts = ["serif", "sans-serif", "monospace", "cursive", "fantasy", "Arial", "Times New Roman", "Courier New", "Verdana", "Georgia", "Impact", "Comic Sans MS", "Trebuchet MS", "Lucida Sans Unicode", "Palatino Linotype"];
    const decorations = ["underline", "line-through", "overline", "none", "wavy underline", "dotted line-through", "double overline", "dashed underline", "solid overline"];
    const borders = ["none", "1px solid", "2px dashed", "3px dotted", "1px double", "4px groove", "2px ridge", "5px inset", "3px outset"];
    const transforms = ["rotate", "skewX", "skewY", "translateX", "translateY", "scale", "scaleX", "scaleY", "matrix", "perspective"];
    const filters = ["none", "blur(2px)", "brightness(150%)", "contrast(200%)", "grayscale(100%)", "hue-rotate(90deg)", "invert(100%)", "saturate(200%)", "sepia(100%)", "drop-shadow(4px 4px 2px rgba(0,0,0,0.5))"];
    const outputParts = [];
    const styleArgs = [];

        function randomHexColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        }

        function randomRgba() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = (Math.random() * 0.8 + 0.2).toFixed(2);
        return `rgba(${r},${g},${b},${a})`;
        }

        for (let i = 0; i < text.length; i++) {
        const color = randomHexColor(); 
        const bg = Math.random() < 0.6 ? randomRgba() : "transparent"; 
        const font = fonts[Math.floor(Math.random() * fonts.length)];
        const bold = Math.random() < 0.8 ? "bold" : "normal";
        const italic = Math.random() < 0.7 ? "italic" : "normal";
        const oblique = Math.random() < 0.3 ? "oblique" : "";
        const decorationStyle = decorations[Math.floor(Math.random() * decorations.length)];
        const decorationColor = randomHexColor();
        const decoration = `text-decoration: ${decorationStyle} ${decorationColor};`;
        const size = `${Math.floor(Math.random() * 20) + 20}px`; 
        const letterSpacing = `${Math.floor(Math.random() * 20 - 10)}px`;
        const wordSpacing = `${Math.floor(Math.random() * 30 - 15)}px`;
        const shadowX = Math.floor(Math.random() * 20 - 10);
        const shadowY = Math.floor(Math.random() * 20 - 10);
        const shadowBlur = Math.floor(Math.random() * 30);
        const shadowColor = randomHexColor();
        const shadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`;
        const padding = `${Math.floor(Math.random() * 20)}px ${Math.floor(Math.random() * 20)}px`;
        const margin = `${Math.floor(Math.random() * 10 - 5)}px`;
        const borderStyle = borders[Math.floor(Math.random() * borders.length)];
        const borderColor = randomHexColor();
        const border = `${borderStyle} ${borderColor}`;
        const opacity = (Math.random() * 0.8 + 0.2).toFixed(2);
        const filter = filters[Math.floor(Math.random() * filters.length)];

        let transform = "";
        const numTransforms = Math.floor(Math.random() * 3) + 1;
        const transformParts = [];
        for (let t = 0; t < numTransforms; t++) {
            const choice = transforms[Math.floor(Math.random() * transforms.length)];
            let value;
            if (choice === "rotate") {
            value = Math.floor(Math.random() * 720 - 360);
            transformParts.push(`rotate(${value}deg)`);
            } else if (choice === "skewX") {
            value = Math.floor(Math.random() * 180 - 90);
            transformParts.push(`skewX(${value}deg)`);
            } else if (choice === "skewY") {
            value = Math.floor(Math.random() * 180 - 90);
            transformParts.push(`skewY(${value}deg)`);
            } else if (choice === "translateX") {
            value = Math.floor(Math.random() * 100 - 50);
            transformParts.push(`translateX(${value}px)`);
            } else if (choice === "translateY") {
            value = Math.floor(Math.random() * 100 - 50);
            transformParts.push(`translateY(${value}px)`);
            } else if (choice === "scale") {
            value = (Math.random() * 3 + 0.2).toFixed(2);
            transformParts.push(`scale(${value})`);
            } else if (choice === "scaleX") {
            value = (Math.random() * 3 + 0.2).toFixed(2);
            transformParts.push(`scaleX(${value})`);
            } else if (choice === "scaleY") {
            value = (Math.random() * 3 + 0.2).toFixed(2);
            transformParts.push(`scaleY(${value})`);
            } else if (choice === "matrix") {
            const m1 = (Math.random() * 2 - 0.5).toFixed(2);
            const m2 = (Math.random() - 0.5).toFixed(2);
            const m3 = (Math.random() - 0.5).toFixed(2);
            const m4 = (Math.random() * 2 - 0.5).toFixed(2);
            const m5 = Math.floor(Math.random() * 50 - 25);
            const m6 = Math.floor(Math.random() * 50 - 25);
            transformParts.push(`matrix(${m1}, ${m2}, ${m3}, ${m4}, ${m5}, ${m6})`);
            } else if (choice === "perspective") {
            value = Math.floor(Math.random() * 1000 + 100);
            transformParts.push(`perspective(${value}px)`);
            }
        }
        if (transformParts.length > 0) {
            transform = `transform: ${transformParts.join(' ')}; display:inline-block;`;
        }

        const style = `
            color: ${color};
            background: ${bg};
            font-family: ${font};
            font-size: ${size};
            font-weight: ${bold};
            font-style: ${italic} ${oblique};
            letter-spacing: ${letterSpacing};
            word-spacing: ${wordSpacing};
            text-shadow: ${shadow};
            ${decoration}
            padding: ${padding};
            margin: ${margin};
            border: ${border};
            opacity: ${opacity};
            filter: ${filter};
            ${transform}
        `;

        outputParts.push("%c" + text[i]);
        styleArgs.push(style);
        }

        console.log(outputParts.join(""), ...styleArgs);
    })();
//JavaScript might overtake CSS now
//or LOLCODE, whatever that is.

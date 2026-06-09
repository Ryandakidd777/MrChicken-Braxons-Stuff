/* --- Page Loader --- */
window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    
    setTimeout(() => {
        loader.style.opacity = "0";
        
        setTimeout(() => {
            loader.style.display = "none";
        }, 250); 
    }, 250); 
});

/* --- Initialization --- */
document.addEventListener("DOMContentLoaded", function() {
    initApp();
});

function initApp() {
    buildFooter();
    
    // Check GitHub immediately on load, then check every 10 seconds (10000ms)
    checkWebsiteUpdate(); 
    setInterval(checkWebsiteUpdate, 10000); 
    
    setupEventListeners();
}

/* --- Event Listeners --- */
function setupEventListeners() {

}

/* --- Core Functions --- */
let initialPushTime = null; // Stores the timestamp of when the user opened the page

function buildFooter() {
    const footer = document.createElement("footer");
    const currentYear = new Date().getFullYear();

    footer.innerHTML = `
        <p id="last-updated">Checking GitHub for updates...</p>
        <p>&copy; ${currentYear} MrChicken's Homemade Website. All rights reserved.</p>
    `;

    document.body.appendChild(footer);
}

async function checkWebsiteUpdate() {
    try {
        const response = await fetch("https://api.github.com/repos/Ryandakidd777/MrChicken-Braxons-Stuff");
        if (!response.ok) throw new Error("GitHub API connection failed");
        
        const repoData = await response.json();
        const currentPushTime = Date.parse(repoData.pushed_at); // Convert ISO to Epoch time
        
        const formattedDate = new Date(currentPushTime).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // 1. Initial Page Load Execution
        if (initialPushTime === null) {
            initialPushTime = currentPushTime;
            document.getElementById("last-updated").innerText = `Last updated: ${formattedDate}`;
        } 
        // 2. Subsequent Checks: If GitHub's timestamp is newer than our load time, it's outdated
        else if (currentPushTime > initialPushTime) {
            document.getElementById("last-updated").innerHTML = `
                Last updated: ${formattedDate} <span style="color: #ff4a4a; font-weight: 800; margin-left: 5px;">(Outdated - Please Refresh)</span>
            `;
        }
        
    } catch (error) {
        console.error("Error tracking repository update status:", error);
        // Only alter text if the initial load failed to fetch a real date
        if (initialPushTime === null) {
            document.getElementById("last-updated").innerText = "Last updated: Recently";
        }
    }
}

/* --- Helpers & Utilities --- */
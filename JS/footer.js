/*© 2026 MrChicken's Homemade Website. All rights reserved. */
//footer.js
let initialPushTime = null;

document.addEventListener("DOMContentLoaded", function() {
    initFooter();
});

function initFooter() {
    buildFooter();
    
    checkWebsiteUpdate(); 
    setInterval(checkWebsiteUpdate, 600000);
}

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
        const currentPushTime = Date.parse(repoData.pushed_at); 
        
        const formattedDate = new Date(currentPushTime).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        if (initialPushTime === null) {
            initialPushTime = currentPushTime;
            document.getElementById("last-updated").innerText = `Last updated: ${formattedDate}`;
        } 
        else if (currentPushTime > initialPushTime) {
            document.getElementById("last-updated").innerHTML = `
                Last updated: ${formattedDate} <span style="color: #ff4a4a; font-weight: 800; margin-left: 5px;">(Outdated - Please Refresh)</span>
            `;
        }
        
    } catch (error) {
        console.error("Error tracking repository update status:", error);
        if (initialPushTime === null) {
            document.getElementById("last-updated").innerText = "Last updated: Recently";
        }
    }
}
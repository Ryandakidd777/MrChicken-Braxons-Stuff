/*© 2026 MrChicken's Homemade Website. All rights reserved. */
//header.js
/* --- Header Loader --- */
document.addEventListener("DOMContentLoaded", () => {
    loadHeaderComponent();
});

async function loadHeaderComponent() {
    try {
        const response = await fetch("Components/header.html");
        
        if (!response.ok) throw new Error("Failed to retrieve header template structure.");
        
        const htmlContent = await response.text();
        
        document.body.insertAdjacentHTML("afterbegin", htmlContent);
        
        highlightCurrentPage();
        
    } catch (error) {
        console.error("Component Loader Error:", error);
    }
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    
    if (currentPath === "/" || currentPath.endsWith("index.html")) {
        const homeLink = document.getElementById("nav-home");
        if (homeLink) homeLink.classList.add("active");
        return;
    }

    if (currentPath.includes("projects.html")) {
        document.getElementById("nav-projects")?.classList.add("active");
    } else if (currentPath.includes("about.html")) {
        document.getElementById("nav-about")?.classList.add("active");
    } else if (currentPath.includes("contact.html")) {
        document.getElementById("nav-contact")?.classList.add("active");
    }
}
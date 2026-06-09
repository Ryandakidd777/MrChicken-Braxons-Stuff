/* --- Dynamic Header Loader Component --- */
document.addEventListener("DOMContentLoaded", () => {
    loadHeaderComponent();
});

async function loadHeaderComponent() {
    try {
        // Fetch the external HTML file structure
        const response = await fetch("Components/header.html");
        
        if (!response.ok) throw new Error("Failed to retrieve header template structure.");
        
        const htmlContent = await response.text();
        
        // Inject the header at the absolute top of the <body>
        document.body.insertAdjacentHTML("afterbegin", htmlContent);
        
        // Automatically calculate and highlight what page we are on
        highlightCurrentPage();
        
    } catch (error) {
        console.error("Component Loader Error:", error);
    }
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    
    // Fallback default: Highlight home if URL path is empty root "/"
    if (currentPath === "/" || currentPath.endsWith("index.html")) {
        const homeLink = document.getElementById("nav-home");
        if (homeLink) homeLink.classList.add("active");
        return;
    }

    // Look for IDs matching your nav links based on file endpoints
    if (currentPath.includes("projects.html")) {
        document.getElementById("nav-projects")?.classList.add("active");
    } else if (currentPath.includes("about.html")) {
        document.getElementById("nav-about")?.classList.add("active");
    } else if (currentPath.includes("contact.html")) {
        document.getElementById("nav-contact")?.classList.add("active");
    }
}
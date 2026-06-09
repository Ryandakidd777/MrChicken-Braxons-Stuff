/* --- Page Loader --- */
window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    
    setTimeout(() => {
        loader.style.opacity = "0";
        
        setTimeout(() => {
            loader.style.display = "none";
        }, 300); 
    }, 300); 
});

/* --- Init --- */
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
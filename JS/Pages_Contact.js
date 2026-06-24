/*© 2026 MrChicken's Homemade Website. All rights reserved. */
document.addEventListener("DOMContentLoaded", () => {
    const contactInfo = document.getElementById("contact-info");
    const guidelines = document.getElementById("guidelines");

    contactInfo.style.display = "none";

    const agreeSection = document.createElement("div");
    agreeSection.id = "agree-section";
    agreeSection.style.cssText = "margin-top: 16px; display: flex; align-items: center; gap: 8px;";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "agree-checkbox";
    checkbox.disabled = true;
    checkbox.style.cssText = "width: 16px; height: 16px; cursor: not-allowed; accent-color: #4a90e2;";

    const label = document.createElement("label");
    label.htmlFor = "agree-checkbox";
    label.style.cssText = "user-select: none; opacity: 0.5;";

    const countdown = document.createElement("span");

    label.appendChild(document.createTextNode("I have read and agree to the contacting guidelines. "));
    label.appendChild(countdown);

    agreeSection.appendChild(checkbox);
    agreeSection.appendChild(label);
    guidelines.appendChild(agreeSection);

    let secondsLeft = 10;
    countdown.textContent = "(" + secondsLeft + "s)";

    const timer = setInterval(() => {
        secondsLeft--;
        if (secondsLeft > 0) {
            countdown.textContent = "(" + secondsLeft + "s)";
        } else {
            clearInterval(timer);
            countdown.textContent = "";
            checkbox.disabled = false;
            checkbox.style.cursor = "pointer";
            label.style.opacity = "1";
        }
    }, 1000);

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            contactInfo.style.display = "";
            contactInfo.style.animation = "fadeIn 0.3s ease";
        } else {
            contactInfo.style.display = "none";
        }
    });
});
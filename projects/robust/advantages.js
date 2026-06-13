import { advantageData } from "./data.js";

import { createIconSvg } from "./icons.js";

export function initAdvantageCards() {
    console.log("Initializing dynamic overview feature cards...");

    const strokeColor = "white";

    // 2. Fetch DOM targets
    const container = document.getElementById("advantages-container");
    const template = document.getElementById("advantages-card-template");

    if (!container || !template) {
        console.warn("Feature component resources missing from DOM.");
        return;
    }

    // Clear previous placeholder layout elements
    container.innerHTML = "";

    // 3. Render list elements
    advantageData.forEach((item, index) => {
        const clone = template.content.cloneNode(true);

        // Generate wrapped SVG component on the fly
        const completedIcon = createIconSvg(item.iconSvg, index, "white");

        // Inject textual values safely
        clone.querySelector(".feature-title").textContent = item.title;
        clone.querySelector(".feature-description").textContent =
            item.description;

        // Inject visual vector structure markup
        clone.querySelector(".icon-wrapper").innerHTML = completedIcon;

        container.appendChild(clone);
    });

    console.log("Overview feature cards successfully initialized.");
}

import { advantageData } from "../data.js";

import { createIconSvg } from "../icons.js";

export function initAdvantageCards() {
    const strokeColor = "white";

    const container = document.getElementById("advantages-container");
    const template = document.getElementById("advantages-card-template");

    if (!container || !template) {
        console.warn("Feature component resources missing from DOM.");
        return;
    }

    container.innerHTML = "";

    advantageData.forEach((item, index) => {
        const clone = template.content.cloneNode(true);

        // Generate wrapped SVG component on the fly
        const completedIcon = createIconSvg(item.iconSvg, index, "white");

        clone.querySelector(".feature-title").textContent = item.title;
        clone.querySelector(".feature-description").textContent =
            item.description;

        // Inject visual vector structure markup
        clone.querySelector(".icon-wrapper").innerHTML = completedIcon;

        container.appendChild(clone);
    });

    console.log("Overview feature cards successfully initialized.");
}

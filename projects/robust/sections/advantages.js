import { advantageData } from "../data.js";
import { createIconSvg } from "../icons.js";

export function initAdvantageCards() {
    const container = document.getElementById("advantages-container");
    if (!container) {
        console.warn("Advantages container missing from DOM.");
        return;
    }

    const strokeColor = "black";
    const cardsHtml = advantageData
        .map((item, index) => {
            // Generate wrapped SVG component on the fly
            const completedIcon = createIconSvg(
                item.iconSvg,
                index,
                strokeColor,
            );

            return `
                <div class="rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-gray-500/20 hover:-translate-y-1 cursor-pointer group border-2 border-black hover:border-gray-400 text-left">
                    <div class="p-6 pt-8 pb-6 text-center space-y-4">
                        <div class="icon-wrapper w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                            ${completedIcon}
                        </div>
                        <h3 class="feature-title text-xl font-semibold text-black">${item.title}</h3>
                        <p class="feature-description text-black">${item.description}</p>
                    </div>
                </div>
            `;
        })
        .join("");

    container.innerHTML = cardsHtml;
    console.log("Overview feature cards successfully initialized.");
}

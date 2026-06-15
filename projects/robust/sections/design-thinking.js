import { createIconSvg } from "../icons.js";

import { designThinkingData } from "../data.js";

export function renderDesignThinking() {
    const container = document.getElementById("design-thinking-container");
    if (!container) return;

    const strokeColor = "white";
    const cardsHtml = designThinkingData.cards
        .map((card, index) => {
            const listItemsHtml = card.items
                .map((item) => {
                    // Split at the first colon if it exists
                    const parts = item.split(/:(.*)/s);
                    if (parts.length >= 2) {
                        return `
                <li class="leading-relaxed text-slate-700">
                    <strong class="text-blue-900 font-semibold">${parts[0]}:</strong>${parts[1]}
                </li>`;
                    }
                    // Fallback marker if there is no colon
                    return `
            <li class="leading-relaxed flex items-start gap-2 text-slate-700">
                <span class="text-blue-500 font-bold">•</span>
                <span>${item}</span>
            </li>`;
                })
                .join("");

            // Generate wrapped SVG component on the fly
            const completedIcon = createIconSvg(
                card.iconPaths,
                index,
                strokeColor,
            );

            return `
                <div class="rounded-2xl group border-2 border-blue-200 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer  hover:border-blue-400 text-left">
                    <div class="p-8">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                                ${completedIcon}
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold">${card.title}</h3>
                                <p class="text-sm font-medium">${card.subtitle}</p>
                            </div>
                        </div>
                        <ul class="space-y-3">
                            ${listItemsHtml}
                        </ul>
                    </div>
                </div>
                `;
        })
        .join("");

    container.innerHTML = `
        <section id="design-thinking" class="py-20 bg-white">
          <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto space-y-12">
              <div class="text-center space-y-4">
                <h1 class="text-5xl md:text-6xl font-bold mb-4 tracking-tight">${designThinkingData.title}</h1>
                <p class="text-xl max-w-3xl mx-auto">${designThinkingData.description}</p>
              </div>
              <div class="grid md:grid-cols-2 gap-8">
                ${cardsHtml}
              </div>
            </div>
          </div>
        </section>
    `;
}

import { referencesData } from "../data.js";
import * as Icons from "../icons.js";

export function renderReferences() {
    const container = document.getElementById("references-container");
    if (!container) {
        console.log("Container for references not found");
        return;
    }

    const categoriesHtml = referencesData.categories
        .map((category) => {
            const iconPaths = Icons[category.iconName] || "";

            const listItemsHtml = category.links
                .map((link) => {
                    const baseClass = "text-sm text-black text-left";
                    if (link.url) {
                        return `
                <li class="${baseClass}">
                        <span class="text-zinc-500 font-bold">•</span> 
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:underline font-medium">
                        ${link.text}
                    </a>
                </li>`;
                    }
                    return `
                    
                    <li class="${baseClass}"><span class="text-zinc-500 font-bold">•</span> ${link.text}</li>`;
                })
                .join("");

            return `
        <div class="rounded-2xl group border-2 border-zinc-200 transition-all duration-300  hover:border-zinc-400">
            <div class="p-6 space-y-4">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-5 h-5 text-black">
                            ${iconPaths}
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-black">${category.title}</h3>
                </div>
                <ul class="space-y-3">${listItemsHtml}</ul>
            </div>
        </div>`;
        })
        .join("");

    container.innerHTML = `
    <section id="references" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto space-y-12">
                <div class="text-center space-y-4">
                    <h1 class="text-5xl md:text-6xl font-bold mb-4 tracking-tight">${referencesData.title}</h1>
                    <p class="text-xl text-black max-w-3xl mx-auto">${referencesData.subtitle}</p>
                </div>
                <div class="bg-card rounded-lg p-8 shadow-soft">
                    <h3 class="text-2xl font-semibold mb-4 text-foreground">${referencesData.validation.title}</h3>
                    <p class="leading-relaxed">${referencesData.validation.text}</p>
                </div>
                <div class="grid md:grid-cols-3 gap-8">${categoriesHtml}</div>
            </div>
        </div>
    </section>`;
}

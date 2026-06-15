import { QuoteIcon } from "../icons.js";
import { personasData } from "../data.js";

const Icons = {
    quoteIcon: QuoteIcon,
};

export function initPersonasSection() {
    const container = document.getElementById("personas-container");
    if (!container) return;

    container.innerHTML = `
        <section id="personas" class="py-12 px-4">
            <div class="container mx-auto max-w-6xl">
                <div class="text-center mb-12 animate-fade-in">
                    <h2 class="text-4xl font-bold mb-4 text-black">
                        Personas
                    </h2>
                    <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Meet the people behind the data, the colleagues using ROBUST to make IKEA Industry locations safer
                    </p>
                </div>
                <div class="grid md:grid-cols-2 gap-8">
                    ${personasData
                        .map(
                            (persona) => `
                        <div class="rounded-lg border-2 border-blue-200  transition-all duration-300 border-primary/20 animate-fade-in" style="animation-delay: ${persona.delay}">
                            <div class="p-8">
                                <div class="flex items-start gap-4 mb-6">
                                    <div class="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shadow-soft flex-shrink-0">
                                        <img src="${persona.imgSrc}" alt="${persona.name}" class="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-bold text-foreground mb-1 text-blue-900">
                                            ${persona.name}
                                        </h3>
                                        <p class="text-sm text-muted-foreground">
                                            ${persona.role}
                                        </p>
                                    </div>
                                </div>
                                <div class="space-y-4">
                                    <div class="relative">
                                        ${Icons.quoteIcon}
                                        <p class="text-muted-foreground italic pl-6 leading-relaxed">
                                            ${persona.quote}
                                        </p>
                                    </div>
                                    <div class="pt-4 border-t border-primary/10">
                                        <div class="flex items-start gap-2">
                                            <div class="w-1 h-full bg-gradient-to-b from-secondary to-accent rounded-full mt-1"></div>
                                            <div class="flex-1">
                                                <p class="text-sm font-semibold text-foreground mb-2">
                                                    With ROBUST:
                                                </p>
                                                <p class="text-sm text-foreground leading-relaxed">
                                                    ${persona.benefit}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,
                        )
                        .join("")}
                </div>
            </div>
        </section>
    `;
}

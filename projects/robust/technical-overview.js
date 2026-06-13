import { technicalData } from "./data.js";

export function initTechnicalOverviewCards() {
    console.log("Initializing Technical Overview components...");

    const targetGrid = document.getElementById("technical-card-holder");
    const cardTemplate = document.getElementById("technical-card-template");
    const accordionTemplate = document.getElementById(
        "technical-accordion-template",
    );

    if (!targetGrid || !cardTemplate || !accordionTemplate) {
        console.log("Resource missing");
        return;
    }

    console.log("Resources found, rendering cards...");
    targetGrid.innerHTML = "";

    technicalData.forEach((cardData, cardIdx) => {
        const cardClone = cardTemplate.content.cloneNode(true);
        cardClone.querySelector(".card-title").textContent = cardData.title;
        cardClone.querySelector(".card-description").textContent =
            cardData.description;

        const accordionContainer = cardClone.querySelector(
            ".accordions-container",
        );

        cardData.accordions.forEach((accData, accIdx) => {
            const accClone = accordionTemplate.content.cloneNode(true);
            const uniqueTargetId = `tech-content-${cardIdx}-${accIdx}`;

            const triggerBtn = accClone.querySelector(".accordion-trigger");
            triggerBtn.setAttribute("data-accordion-target", uniqueTargetId);
            triggerBtn.querySelector(".accordion-title").textContent =
                accData.title;

            const contentPanel = accClone.querySelector(".accordion-content");
            contentPanel.id = uniqueTargetId;

            // Render dynamic nested blocks safely
            const paragraphsWrapper = accClone.querySelector(
                ".accordion-paragraphs",
            );
            // Locate this section in your script:
            accData.paragraphs.forEach((text) => {
                const p = document.createElement("p");
                // Layout classes for proper bullet alignment on multiline text
                p.className = "flex items-start gap-2";

                // Inject the bullet span right before the text content
                p.innerHTML = `<span class="text-blue-500 font-bold flex-shrink-0">•</span> <span>${text}</span>`;

                paragraphsWrapper.appendChild(p);
            });

            // FIXED HANDLER: Clean toggle wrapper logic
            triggerBtn.addEventListener("click", (e) => {
                e.stopPropagation();

                const isOpen =
                    contentPanel.style.maxHeight &&
                    contentPanel.style.maxHeight !== "0px";
                const chevron = triggerBtn.querySelector(".chevron");

                // Solo Mode: Collapse other panels inside THIS technical wrapper context safely
                targetGrid
                    .querySelectorAll(".accordion-content")
                    .forEach((item) => {
                        item.style.maxHeight = "0px";
                        item.classList.add("opacity-0");
                    });
                targetGrid.querySelectorAll(".chevron").forEach((svg) => {
                    svg.style.transform = "rotate(0deg)";
                });

                // Toggle visibility state for current target selection
                if (!isOpen) {
                    contentPanel.style.maxHeight =
                        contentPanel.scrollHeight + "px";
                    contentPanel.classList.remove("opacity-0");
                    if (chevron) chevron.style.transform = "rotate(180deg)";
                }
            });

            accordionContainer.appendChild(accClone);
        });

        targetGrid.appendChild(cardClone);
    });
    console.log(
        "Cards successfully attached with dynamic accordion listeners!",
    );
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded successfully and DOM is ready!");
    if (typeof initInlineDemo === "function") initInlineDemo();

    initFeatureCards();

    initTheoryOfChange();

    initTechnicalOverviewCards();

    renderDesignThinking();

    initPersonasSection();

    initTeamMateProfile();
});

function createIconSvg(innerPaths, index, strokeColor) {
    const gradientId = `svgCircleGrad-${index}`;

    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-14 h-14 group-hover:scale-110 group-hover:rotate-6">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#0891b2" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#${gradientId})" stroke="none" />
      
      <g transform="translate(12, 12) scale(1)">
        ${innerPaths}
      </g>
    </svg>
  `;
}

function renderDesignThinking() {
    const designThinkingData = {
        title: "Design Thinking",
        description:
            "Our innovation addresses key design principles to ensure meaningful and sustainable impact",
        cards: [
            {
                title: "Usability",
                subtitle: "Who & What",
                // Only keep the geometric vector strings
                iconPaths: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`,
                items: [
                    "Users: Manufacturing Team Leaders at IKEA who categorize incident and accident reports",
                    "Stakeholders: Safety analysts at IKEA who process incident and accident reports",
                    "Problem: Incorrect categorization delaying, and taking time away from, meaningful analysis",
                    "Solution: Automated categorization delivers clean data, making analysis and prevention the focus",
                ],
            },
            {
                title: "Feasibility",
                subtitle: "How We Build It",
                iconPaths: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>`,
                items: [
                    "Machine learning models trained on IKEA safety report data",
                    "Natural language processing to understand report context and content",
                    "Integration with existing safety reporting systems",
                    "User interface enabling correct categorization",
                ],
            },
            {
                title: "Viability",
                subtitle: "IKEA alignment",
                iconPaths: `<g transform="">
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="6"></circle>
                                <circle cx="12" cy="12" r="2"></circle>
                            </g>`,
                items: [
                    "Directly supports IKEA's commitment to employee safety and well-being",
                    "Enables data-driven decision making in safety operations",
                    "Multi-language solution scalable across IKEA's global operations and facilities",
                    "Contributes to operational excellence and continuous improvement culture",
                ],
            },
            {
                title: "Sustainability",
                subtitle: "Impact and Considerations",
                iconPaths: `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>`,
                items: [
                    "Social: Safer work environment through better data analysis and incident prevention",
                    "Environmental: Fewer accidents lead to less waste and downtime",
                    "Economic: Increased analyst productivity and reduced operational costs",
                    "Risks: Ensuring algorithm accuracy; maintaining data privacy and security",
                ],
            },
        ],
    };

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
                <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer group border-2 border-blue-200 hover:border-blue-400 text-left">
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

function initFeatureCards() {
    console.log("Initializing dynamic overview feature cards...");

    const strokeColor = "white";
    const featureData = [
        {
            title: "Time Savings",
            description:
                "Correctly categorized reports frees analysts from unnecessary data wrangling, and provides more time to focus on meaningful analysis",
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock w-8 h-8 text-primary"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
        },
        {
            title: "Enhanced Safety",
            description:
                "More accurate categorization leads to better insights and a safer work environment",
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-8 h-8 text-primary"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>`,
        },
        {
            title: "Sustainable Impact",
            description:
                "Contributes to a safer work environment, aligning with IKEAs Sustainability Actions; “to continue to support secure, safe and healthy working conditions”.",
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-8 h-8 text-primary"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>`,
        },
    ];

    // 2. Fetch DOM targets
    const container = document.getElementById("features-container");
    const template = document.getElementById("feature-card-template");

    if (!container || !template) {
        console.warn("Feature component resources missing from DOM.");
        return;
    }

    // Clear previous placeholder layout elements
    container.innerHTML = "";

    // 3. Render list elements
    featureData.forEach((item, index) => {
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

function initPersonasSection() {
    console.log("Initializing Personas Section...");

    const container = document.getElementById("personas-container");
    if (!container) return;

    const imgPath = "/projects/robust/";
    const personasData = [
        {
            name: "Sam Trygg",
            role: "Team Leader at IKEA Industries Hultsfred",
            imgSrc: imgPath + "man.png",
            delay: "0s",
            quote: "I am responsible for continued safety reporting when a team mate has reported an incident or accident. While I have received some safety training to help me determine the correct Safety Area of a report, I often come up against situations when the correct category isn't completely obvious. Often I have a lot of pressing issues to attend to, and don't really have time to check the manual. On the other hand, I care about my team members and feel strongly about safety. I want to get the reports right, so that accidents can be prevented.",
            benefit:
                "ROBUST has been really useful, by providing helpful suggestions for Safety Area categorizations, so that I need to spend less time second guessing, and can get on to making sure that things run smoothly on the factory floor.",
        },
        {
            name: "Kim Säker",
            role: "Health & Safety Data Analyst at IKEA Industries Kazlu Ruda",
            imgSrc: imgPath + "woman.png",
            delay: "0.2s",
            quote: "I review accident and incident reports from factory workers and prepare insights for leadership to act on. Even though I feel highly motivated by the impact my work can have on creating a safer, more sustainable workplace, I feel a lot of frustration. This frustration comes from me having to spend a large portion of my time re-checking, cleaning, and reclassifying data before I can produce insights for management. This reduces the time I have to identify trends, design preventive measures, and recommend improvements that could prevent future incidents.",
            benefit:
                "My experience with ROBUST has been very positive. Now I can trust the data quality from the start and spend much more time on meaningful analysis and proactive safety improvements.",
        },
    ];

    // SVG Quote Icon helper to keep the main template clean
    const quoteIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(30.2% 0.032 255.585)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote absolute -top-2 -left-3 w-6 h-6 text-primary/20">
            <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
            <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
        </svg>
    `;

    container.innerHTML = `
        <section id="personas" class="py-12 px-4 bg-gradient-to-br from-background via-muted/30 to-background">
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
                        <div class="rounded-lg border-1 border-blue-800 text-card-foreground shadow-sm bg-gradient-card shadow-glow hover:shadow-xl transition-all duration-300 border-primary/20 animate-fade-in" style="animation-delay: ${persona.delay}">
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
                                        ${quoteIcon}
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

function initTheoryOfChange() {
    // Your data array configuration — easy to expand, reduce, or edit
    console.log("Init Theory of change reusable components");
    const steps = [
        {
            title: "Outputs",
            subtitle: "What we deliver",
            metric: "30,000",
            metricLabel: "AI predictions per year",
            points: [
                "2 per IKEA Industry employee",
                "Automated Safety Area categorizations",
            ],
        },
        {
            title: "Outcomes",
            subtitle: "Measurable improvements",
            metric: "85→90%",
            metricLabel: "Accuracy improvement",
            points: [
                "+1,500 correct reports/year",
                "125 hours saved annually",
                "3 days faster routing",
            ],
        },
        {
            title: "Impact",
            subtitle: "Real-world change",
            metric: "Safer Workplaces",
            metricLabel: "Fewer and less severe incidents",
            points: [
                "Proactive prevention measures",
                "Improved employee well-being",
                "Data-driven safety culture",
            ],
        },
    ];

    const container = document.getElementById("flow-container");
    const cardTemplate = document.getElementById("card-template");
    const pointTemplate = document.getElementById("point-template");
    const arrowTemplate = document.getElementById("arrow-template");

    steps.forEach((step, index) => {
        // 1. Clone the card template
        const cardClone = cardTemplate.content.cloneNode(true);

        // 2. Inject dataset text
        cardClone.querySelector(".card-title").textContent = step.title;
        cardClone.querySelector(".card-subtitle").textContent = step.subtitle;
        cardClone.querySelector(".card-metric").textContent = step.metric;
        cardClone.querySelector(".card-metric-label").textContent =
            step.metricLabel;

        // 4. Inject sub-points loop
        const pointsContainer = cardClone.querySelector(".card-points");
        step.points.forEach((text) => {
            const pointClone = pointTemplate.content.cloneNode(true);
            pointClone.querySelector(".point-text").textContent = text;
            pointsContainer.appendChild(pointClone);
        });

        // 5. Append card element to screen
        container.appendChild(cardClone);

        // 6. Conditionally append arrows between elements
        if (index < steps.length - 1) {
            const arrowClone = arrowTemplate.content.cloneNode(true);
            container.appendChild(arrowClone);
        }
    });
}

function initTeamMateProfile() {
    console.log("Initializing Team Mate Profile components...");

    const container = document.getElementById("team-container");
    if (!container) {
        console.log("TeamMates: resource not found");
        return;
    }

    const imgPath = "/projects/robust/";
    const teamMateData = [
        { name: "Viktor Eriksson", imgSrc: imgPath + "guy_brown.png" },
        { name: "Isabell Nordmark", imgSrc: imgPath + "gal_blonde.png" },
        { name: "Thomas Mathiassen", imgSrc: imgPath + "guy_blonde.png" },
        { name: "Tilda Alm", imgSrc: imgPath + "gal_brunette1.png" },
        { name: "Filip Hansson", imgSrc: imgPath + "guy_blonde.png" },
        { name: "Rima Safady", imgSrc: imgPath + "gal_brunette2.png" },
    ];

    container.innerHTML = teamMateData
        .map(
            (member) => `
        <div class="rounded-lg text-card-foreground shadow-sm border-0 shadow-glow bg-gradient-card hover:scale-105 transition-transform duration-300">
            <div class="p-6 flex flex-col items-center text-center space-y-4">
                <span class="relative flex shrink-0 overflow-hidden rounded-full w-32 h-32 border-0 border-primary/20">
                    <img class="aspect-square h-full w-full object-cover" 
                         alt="${member.name}" 
                         src="${member.imgSrc}" />
                </span>
                <div class="space-y-2">
                    <h3 class="text-xl font-semibold text-foreground">
                        ${member.name}
                    </h3>
                </div>
            </div>
        </div>
    `,
        )
        .join("");
}

function initTechnicalOverviewCards() {
    console.log("Initializing Technical Overview components...");

    const technicalData = [
        {
            title: "Technical Architecture",
            description:
                "How the system processes a report and returns a suggestion.",
            accordions: [
                {
                    title: "Input and Encoding",
                    paragraphs: [
                        "Users supply a short description of an incident in any language.",
                    ],
                },
                {
                    title: "Modeling and Serving",
                    paragraphs: [
                        "Existing functionality in the accident reporting system is used to make an API call to ROBUST.",
                        "A lightweight classifier uses embeddings to predict the most likely Safety Area category and a confidence score.",
                        "The Safety Area prediction is pre-selected in the accident reporting system.",
                        "The confidence score is displayed with the prediction for transparency.",
                    ],
                },
            ],
        },
        {
            title: "Safety and Privacy",
            description: "Measures we take to protect people and their data.",
            accordions: [
                {
                    title: "Data Handling",
                    paragraphs: [
                        "Translation of training data, as well as machine learning training has been done locally, to prevent exposure of private and proprietary information.",
                    ],
                },
                {
                    title: "Governance and Human Oversight",
                    paragraphs: [
                        "The coworker always has the ability to select another Safety Area.",
                        "When a low-confidence prediction is produced it is not forwarded to the incident reporting system. This ensures that in the event of a low quality prediction being made, a human always makes the call.",
                    ],
                },
            ],
        },
        {
            title: "Performance and Scalability",
            description:
                "How our product performs and how it scales in IKEAs organization.",
            accordions: [
                {
                    title: "Model Performance",
                    paragraphs: [
                        "We aim for high performance. Our first milestone is 90% Recall (True Positive Rate).",
                        "We have a number of practical steps planned to improve performance, and ensure continued improvement beyond the milestone.",
                    ],
                },
                {
                    title: "Scalability",
                    paragraphs: [
                        "ROBUST is scalable across global operations.",
                        "Our system is trained on a dataset containing incident reports in IKEA Industry factory languages, e.g. Polish and Portuguese.",
                        "The underlying LLM technology supports yet more languages. Early tests have been successful for incident reports in languages outside of the training data. This enables easy transition to new markets.",
                        "Lightweight technology that does not require high amount of compute power, and leverages features in IKEAs current Incident & Accident Reporting system for easy deployment across the organization.",
                    ],
                },
            ],
        },
    ];

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

function initInlineDemo() {
    const demoButtons = document.querySelectorAll(".demo-launch-btn");
    const container = document.getElementById("inline-demo-container");

    if (!container) return;

    demoButtons.forEach((button) => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("Launch button clicked. Fetching demo screens...");

            try {
                const response = await fetch("demo.html");
                if (!response.ok) throw new Error("Could not load demo.html");

                const rawHtml = await response.text();

                // Extract only what's inside the body tags
                const bodyContent = rawHtml.match(
                    /<body[^>]*>([\s\S]*)<\/body>/i,
                );
                container.innerHTML = bodyContent ? bodyContent[1] : rawHtml;

                container.classList.remove("hidden");

                // Attach actions for tab changes, validation, and submission routing
                bindDemoFormEvents(container);
            } catch (error) {
                console.error("Error embedding interactive demo:", error);
            }
        });
    });
}

function bindDemoFormEvents(modal) {
    const form =
        modal.querySelector("form") ||
        modal.querySelector("#demo-form-wrapper");
    const textarea = modal.querySelector("#whatHappened");
    const submitBtn = modal.querySelector("#demo-submit-btn");
    const closeBtn = modal.querySelector("button.absolute.right-4.top-4");

    // Radix UI tab selectors matching demo.html elements
    const tabInitialBtn = modal.querySelector(
        "#radix-\\:r44\\:-trigger-initial",
    );
    const tabContinuedBtn = modal.querySelector(
        "#radix-\\:r44\\:-trigger-continued",
    );
    const tabInitialContent = modal.querySelector(
        "#radix-\\:r44\\:-content-initial",
    );
    const tabContinuedContent = modal.querySelector(
        "#radix-\\:r44\\:-content-continued",
    );

    // Close Modal Handler
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.innerHTML = "";
            modal.classList.add("hidden");
        });
    }

    // Guard clause: Safe exit if the critical interactive components are missing
    if (!textarea || !submitBtn) {
        console.warn(
            "ROBUST Demo: Missing textarea or submit button elements in DOM layout.",
        );
        return;
    }

    // Variable to trace text validation state dynamically
    let isFormValid = false;

    // Real-time validation: Toggle Submit button based on textarea content
    textarea.addEventListener("input", () => {
        const hasText = textarea.value.trim().length > 0;
        isFormValid = hasText; // update form validation state

        if (hasText) {
            submitBtn.removeAttribute("disabled");
            submitBtn.classList.remove("bg-gray-400", "hover:bg-gray-500");
            submitBtn.classList.add(
                "bg-blue-600",
                "hover:bg-blue-700",
                "cursor-pointer",
            );
        } else {
            submitBtn.setAttribute("disabled", "disabled");
            submitBtn.classList.add("bg-gray-400", "hover:bg-gray-500");
            submitBtn.classList.remove(
                "bg-blue-600",
                "hover:bg-blue-700",
                "cursor-pointer",
            );
        }
    });

    // Form Submission / Classification Trigger via Button Click
    submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        // Explicitly block submissions if the text validation hasn't passed
        if (!isFormValid) return;

        const reportContent = textarea.value.trim();
        if (!reportContent) return;

        console.log("[CLASSIFY] Submit clicked");

        const payload = { report: reportContent };
        console.log("[CLASSIFY] Payload:", payload);

        const startTime = performance.now();

        var result = "NoResult";

        try {
            const response = await fetch(
                "https://isanor-robust.hf.space/classify",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ input: reportContent }),
                },
            );

            console.log("[CLASSIFY] Status:", response.status);

            const raw = await response.text();
            console.log("[CLASSIFY] Raw:", raw);

            result = JSON.parse(raw);
            console.log("[CLASSIFY] Parsed:", result);

            console.log(
                "[CLASSIFY] Duration:",
                Math.round(performance.now() - startTime),
                "ms",
            );
        } catch (err) {
            console.error("[CLASSIFY] Error:", err);
        }

        if (result.confidence >= 0.3) {
            // Find the safety area select element inside the Continued view
            const safetyAreaSelect = modal.querySelector("#safetyArea");
            if (safetyAreaSelect && result.category) {
                safetyAreaSelect.value = result.category;
            }

            predictionHint = modal.querySelector("#predictionHint");
            if (predictionHint && result) {
                const cat = result.category;
                const conf = Math.round(result.confidence * 100);
                predictionHint.innerHTML = `${cat} predicted with ${conf}% probability`;
            } else {
                console.log("predctionHint not found");
            }
        }

        // Transition smoothly to the "Continued" screen tab layout
        if (
            tabContinuedBtn &&
            tabInitialBtn &&
            tabInitialContent &&
            tabContinuedContent
        ) {
            tabContinuedBtn.disabled = false;

            // Switch Radix state attributes to swap tab headers visual focus
            tabInitialBtn.setAttribute("data-state", "inactive");
            tabContinuedBtn.setAttribute("data-state", "active");

            // Toggle display panels
            tabInitialContent.style.display = "none";
            tabContinuedContent.removeAttribute("hidden");
        }
    });
}

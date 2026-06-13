export function initInlineDemo() {
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

export function bindDemoFormEvents(modal) {
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

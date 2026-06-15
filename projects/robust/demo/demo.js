const spaceId = "isanor/robust";
const statusUrl = `https://huggingface.co/api/spaces/${spaceId}`;

const ServerStates = Object.freeze({
    RUNNING_APP_STARTING: "RUNNING_APP_STARTING",
    RUNNING: "RUNNING",
    CLASSIFYING: "CLASSIFYING",
});

// Demo State
const state = {
    formData: {
        reportedBy: "kim-lov",
        unit: "ikea-industry",
        date: "13-10-2025",
        reportFrom: "coworker",
        whatHappened: "",
        photo: null,
        immediateAction: "Yes",
        actionsDescription:
            "Called maintenance manager and shared this information. I also put up a sign.",
        factory: "Malmö",
        location: "Building 2",
        whereHappened: "Floor 3",
        precisePlace: "",
        chooseTeam: "n/a",
        teamLeader: "leader-kim",
    },
    serverState: ServerStates.RUNNING_APP_STARTING,
    prediction: {
        safetyArea: "",
        proba: "",
    },
};

const activeTabClasses = ["bg-white", "text-gray-900", "shadow-sm"];
const inactiveTabClasses = [
    "bg-transparent",
    "text-gray-500",
    "hover:text-gray-900",
];

const readySubmit = ["text-white", "bg-blue-500", "hover:bg-blue-600"];
const waitingServerSubmit = [
    "text-black",
    "bg-yellow-200",
    "hover:bg-yellow-300",
];
const waitingClassifySubmit = [
    "text-white",
    "bg-blue-200",
    "hover:bg-blue-300",
];
const disabledSubmit = ["text-white", "bg-gray-400", "hover:bg-gray-500"];

function setActiveTab(id) {
    document.getElementById(id).classList.remove(...inactiveTabClasses);
    document.getElementById(id).classList.add(...activeTabClasses);
}

function setInactiveTab(id) {
    document.getElementById(id).classList.add(...inactiveTabClasses);
    document.getElementById(id).classList.remove(...activeTabClasses);
}

export async function initInlineDemo() {
    const demoButtons = document.querySelectorAll(".demo-launch-btn");
    const container = document.getElementById("inline-demo-container");

    let stage = await pingSpace();

    if (stage === "RUNNING") {
        state.serverState = ServerStates.RUNNING;
    } else {
        state.serverState = ServerStates.RUNNING_APP_STARTING;
        // Start the continuous loop if it's sleeping/building
        startPollingSpace();
    }

    if (!container) return;

    demoButtons.forEach((button) => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();

            try {
                const response = await fetch("./demo/demoPopup.html");
                if (!response.ok) throw new Error("Could not load demo");

                const rawHtml = await response.text();

                // Extract only what's inside the body tags
                const bodyContent = rawHtml.match(
                    /<body[^>]*>([\s\S]*)<\/body>/i,
                );
                container.innerHTML = bodyContent ? bodyContent[1] : rawHtml;

                container.classList.remove("hidden");

                const initialButton =
                    document.getElementById("tabTriggerInitial");
                const continuedButton = document.getElementById(
                    "tabTriggerContinued",
                );

                if (closeModalBtn) {
                    document
                        .getElementById("closeModalBtn")
                        .addEventListener("click", () => {
                            console.log("Close button clicked");
                            container.innerHTML = "";
                            container.classList.add("hidden");
                        });
                }

                insertInitial();

                initialButton.addEventListener("click", async (e) => {
                    e.preventDefault();
                    console.log("Initial button clicked...");

                    try {
                        insertInitial();
                    } catch (error) {
                        console.error("Error embedding Initial:", error);
                    }
                });

                continuedButton.addEventListener("click", async (e) => {
                    e.preventDefault();
                    console.log("Continued button clicked...");

                    try {
                        insertContinued();
                    } catch (error) {
                        console.error("Error embedding Continued:", error);
                    }
                });
            } catch (error) {
                console.error("Error embedding interactive demo:", error);
            }
        });
    });
}

async function insertInitial() {
    const container = document.getElementById("main-content");
    let ready = false;

    try {
        const response = await fetch("./demo/initialTab.html");
        if (!response.ok)
            throw new Error("Could not load Initial Content.html");

        const rawHtml = await response.text();
        const bodyContent = rawHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        container.innerHTML = bodyContent ? bodyContent[1] : rawHtml;

        setActiveTab("tabTriggerInitial");
        setInactiveTab("tabTriggerContinued");

        const form = document.getElementById("reportingForm");
        const whatHappenedInput = document.getElementById("whatHappened");
        const photoUploadInput = document.getElementById("photo-upload");
        const submitBtn = document.getElementById("submitBtn");

        whatHappenedInput.innerText = state.formData["whatHappened"];

        // Input listeners mapping back to local state
        form.addEventListener("input", (e) => {
            if (e.target.id && e.target.id !== "photo-upload") {
                state.formData[e.target.id] = e.target.value;
            }
            if (e.target.id && e.target.id == "whatHappened") {
                // clear prediction state if input changes
                state.prediction["safetyArea"] = "";
                state.prediction["proba"] = "";
            }
            ready = readyToPredict(state);
        });

        // Handle Upload UI state
        photoUploadInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                state.formData.photo = file;
                fileNameDisplay.textContent = file.name;
            }
        });

        // Submission handler execution
        submitBtn.addEventListener("click", () => {
            if (!ready) {
                alert(
                    "You must answer 'What happened?' before submitting the form.",
                );
                return;
            }
            triggerPrediction(state);
            console.log("Submitted payload:", state.formData.whatHappened);
        });

        ready = readyToPredict(state);
    } catch (error) {
        console.log(error);
    }
}

function setSubmitBtn(key) {
    submitBtn.classList.remove(...readySubmit);
    submitBtn.classList.remove(...disabledSubmit);
    submitBtn.classList.remove(...waitingClassifySubmit);
    submitBtn.classList.remove(...waitingServerSubmit);

    switch (key) {
        case "sleeping":
            submitBtn.disabled = true;
            submitBtn.textContent = "Waking up server...";
            submitBtn.classList.add(...waitingServerSubmit);
            break;
        case "classifying":
            submitBtn.disabled = true;
            submitBtn.textContent = "Analyzing...";
            submitBtn.classList.add(...waitingClassifySubmit);
            break;
        case "no-prompt":
            submitBtn.disabled = true;
            submitBtn.textContent = "Submit";
            submitBtn.classList.add(...disabledSubmit);
            break;
        case "ready":
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
            submitBtn.classList.add(...readySubmit);
            break;
    }
}

function readyToPredict() {
    const hasText = state.formData.whatHappened.trim().length > 0;

    if (state.serverState == ServerStates.RUNNING_APP_STARTING) {
        setSubmitBtn("sleeping");
    } else if (state.serverState === ServerStates.CLASSIFYING) {
        setSubmitBtn("classifying");
    } else if (!hasText) {
        setSubmitBtn("no-prompt");
    } else if (state.serverState == ServerStates.RUNNING && hasText) {
        setSubmitBtn("ready");
        return true;
    }
    return false;
}

async function triggerPrediction(state) {
    console.log("Prediction triggered");

    const reportContent = state.formData["whatHappened"];
    const payload = { report: reportContent };
    console.log("[CLASSIFY] Payload:", payload);

    const startTime = performance.now();
    state.serverState = ServerStates.CLASSIFYING;

    setSubmitBtn("classifying");

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
        state.serverState = ServerStates.RUNNING;

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
        state.serverState = false;
    }

    setSubmitBtn("ready");

    state.prediction["safetyArea"] = result.category;
    state.prediction["proba"] = Math.round(result.confidence * 100);

    await insertContinued(reportContent);
}

async function insertContinued() {
    const container = document.getElementById("main-content");

    try {
        const response = await fetch("./demo/continuedTab.html");
        if (!response.ok)
            throw new Error("Could not load Continued Content.html");

        const rawHtml = await response.text();
        const bodyContent = rawHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        container.innerHTML = bodyContent ? bodyContent[1] : rawHtml;
    } catch (err) {
        console.error("Error inserting Continued tab:", err);
    }

    setInactiveTab("tabTriggerInitial");
    setActiveTab("tabTriggerContinued");

    const predictionBlock = document.getElementById("prediction-block");
    const predictionHint = document.getElementById("prediction-hint");
    const safetyArea = state.prediction["safetyArea"];
    if (safetyArea != "") {
        predictionBlock.className = predictionBlock.className.replace(
            "hidden",
            "visible",
        );

        const proba = state.prediction["proba"];
        if (proba >= 0.3) {
            // Find the safety area select element inside the Continued view
            const safetyAreaSelect = document.getElementById("safety-area");
            safetyAreaSelect.value = safetyArea;
            predictionHint.innerHTML = `${safetyArea} predicted with ${proba}% probability`;
        } else {
            predictionHint.innerHTML = `Low confidence prediction. Select Safety Area.`;
        }
    } else {
        // set select to default and hide prediction hint if no prediction
        predictionBlock.className = predictionBlock.className.replace(
            "visible",
            "hidden",
        );
        document.getElementById("safety-area").value = null;
    }
}

export async function pingSpace() {
    console.log("Checking Space status...");

    try {
        let response = await fetch(statusUrl);
        let data = await response.json();
        let stage = data.runtime?.stage;

        if (stage !== "RUNNING") {
            // Trigger the wakeup by pinging the space directly
            fetch(`https://huggingface.co/embed/${spaceId}/`).catch(() => {});
        }
        if (stage === "RUNNING") {
            console.log("Space is running");
        }
        return stage;
    } catch (error) {
        console.error(error);
    }
}

async function startPollingSpace() {
    console.log("Starting background status polling...");

    while (true) {
        try {
            // Wait 5 seconds between checks
            await new Promise((resolve) => setTimeout(resolve, 5000));

            const response = await fetch(statusUrl);
            if (!response.ok) throw new Error("Polling fetch failed");

            const data = await response.json();
            const stage = data.runtime?.stage;

            console.log(`[POLL] Current stage: ${stage}`);

            // Map the HF stage to your internal state
            if (stage === "RUNNING") {
                state.serverState = ServerStates.RUNNING;
            } else {
                state.serverState = ServerStates.RUNNING_APP_STARTING;
            }

            // Dynamically refresh the submit button state if the DOM is ready
            if (document.getElementById("submitBtn")) {
                readyToPredict();
            }

            // Break the loop once it is successfully running
            if (stage === "RUNNING") {
                console.log("[POLL] Space is live. Stopping polling.");
                break;
            }
        } catch (error) {
            console.error("[POLL] Error during background check:", error);
            // Don't break on a network glitch; let it try again on the next loop iteration
        }
    }
}

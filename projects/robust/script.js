import {
    FeatureSection,
    MilestoneSection,
    FeedbackSection,
    FeatureCard,
    Milestone,
    FeedbackCard,
    VerticalConnector,
} from "./roadmap.js";

import { initAdvantageCards } from "./advantages.js";

import { initInlineDemo, bindDemoFormEvents } from "./demo.js";

import { initTheoryOfChange } from "./theory-of-change.js";

import { initTechnicalOverviewCards } from "./technical-overview.js";

import { initPersonasSection } from "./personas.js";

import { renderDesignThinking } from "./design-thinking.js";

import { initTeamMateProfile } from "./teammates.js";

import { renderReferences } from "./references.js";

import {
    performanceImprovements,
    newCapabilities,
    feedback,
    milestone,
} from "./data.js";

const sections = [
    {
        type: "features",
        label: "Performance Improvements",
        columns: 3,
        items: performanceImprovements,
        variant: "primary",
    },
    {
        type: "verticalConnector",
    },
    {
        type: "milestone",
        item: milestone,
    },
    {
        type: "verticalConnector",
    },
    {
        type: "feedback",
        items: feedback,
    },
    {
        type: "verticalConnector",
    },
    {
        type: "features",
        label: "New Capabilities",
        columns: 2,
        items: newCapabilities,
    },
];

const SectionRenderers = {
    features: FeatureSection,
    milestone: MilestoneSection,
    feedback: FeedbackSection,
    verticalConnector: VerticalConnector,
};

function renderSection(section) {
    const renderer = SectionRenderers[section.type];
    return renderer(section);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded successfully and DOM is ready!");
    initInlineDemo();

    initAdvantageCards();

    initTheoryOfChange();

    initTechnicalOverviewCards();

    renderDesignThinking();

    initPersonasSection();

    initTeamMateProfile();

    renderReferences();

    document.querySelector("#roadmap").innerHTML = sections
        .map(renderSection)
        .join("");
});

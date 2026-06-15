import {
    FeatureSection,
    MilestoneSection,
    FeedbackSection,
    FeatureCard,
    Milestone,
    FeedbackCard,
    VerticalConnector,
} from "./sections/roadmap.js";

import { initAdvantageCards } from "./sections/advantages.js";

import { initInlineDemo, pingSpace } from "./demo/demo.js";

import { initTheoryOfChange } from "./sections/theory-of-change.js";

import { initTechnicalOverviewCards } from "./sections/technical-overview.js";

import { initPersonasSection } from "./sections/personas.js";

import { renderDesignThinking } from "./sections/design-thinking.js";

import { initTeamMateProfile } from "./sections/teammates.js";

import { renderReferences } from "./sections/references.js";

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
    initInlineDemo();

    initAdvantageCards();

    document.querySelector("#roadmap").innerHTML = sections
        .map(renderSection)
        .join("");

    initTheoryOfChange();

    initTechnicalOverviewCards();

    renderDesignThinking();

    initPersonasSection();

    initTeamMateProfile();

    renderReferences();
});

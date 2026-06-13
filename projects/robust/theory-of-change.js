import { theoryOfChangeData } from "./data.js";

export function initTheoryOfChange() {
    // Your data array configuration — easy to expand, reduce, or edit
    console.log("Init Theory of change reusable components");

    const container = document.getElementById("flow-container");
    const cardTemplate = document.getElementById("card-template");
    const pointTemplate = document.getElementById("point-template");
    const arrowTemplate = document.getElementById("arrow-template");

    theoryOfChangeData.forEach((step, index) => {
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
        if (index < theoryOfChangeData.length - 1) {
            const arrowClone = arrowTemplate.content.cloneNode(true);
            container.appendChild(arrowClone);
        }
    });
}

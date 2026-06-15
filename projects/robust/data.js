import {
    TrendingUp,
    MapPin,
    Target,
    Tag,
    Layers,
    MessageSquare,
    Feasibility,
    Sustainability,
    Usability,
    Viability,
    Clock,
    Safety,
    ArrowUp,
} from "./icons.js";

const Icons = {
    trending: TrendingUp,
    mapPin: MapPin,
    target: Target,
    tag: Tag,
    layers: Layers,
    message: MessageSquare,
    usability: Usability,
    feasibility: Feasibility,
    viability: Viability,
    sustainability: Sustainability,
    clock: Clock,
    safety: Safety,
    arrowUp: ArrowUp,
};

const imgPath = "/projects/robust/project-assets/";

export const advantageData = [
    {
        title: "Time Savings",
        description:
            "Correctly categorized reports frees analysts from unnecessary data wrangling, and provides more time to focus on meaningful analysis",
        iconSvg: Icons.clock,
    },
    {
        title: "Enhanced Safety",
        description:
            "More accurate categorization leads to better insights and a safer work environment",
        iconSvg: Icons.safety,
    },
    {
        title: "Sustainable Impact",
        description:
            "Contributes to a safer work environment, aligning with IKEAs Sustainability Actions; “to continue to support secure, safe and healthy working conditions”.",
        iconSvg: Icons.arrowUp,
    },
];

export const performanceImprovements = [
    {
        step: 1,
        icon: Icons.trending,
        title: "Ground Truth Labeling",
        description: "By local domain experts",
    },
    {
        step: 2,
        icon: Icons.mapPin,
        title: "Location Parameters",
        description: "Include precise context",
    },
    {
        step: 3,
        icon: Icons.target,
        title: "Low Confidence Targeting",
        description: "Focus on edge cases",
    },
];

export const newCapabilities = [
    {
        step: 1,
        icon: Icons.tag,
        title: "Category Suggestions",
        description: "Incident vs. Accident classification",
    },
    {
        step: 2,
        icon: Icons.layers,
        title: "Sub-Category Intelligence",
        description: "Near-miss, Unsafe Behavior, and more",
    },
];

export const feedback = [
    {
        icon: Icons.message,
        title: "User Feedback Loop",
        description: "Improve model performance iteratively",
    },
];

export const milestone = [
    {
        title: "Ready to Launch",
        subtitle: "90% Recall for all Safety Areas",
    },
];

export const personasData = [
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

export const designThinkingData = {
    title: "Design Thinking",
    description:
        "Our innovation addresses key design principles to ensure meaningful and sustainable impact",
    cards: [
        {
            title: "Usability",
            subtitle: "Who & What",
            // Only keep the geometric vector strings
            iconPaths: Icons.usability,
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
            iconPaths: Icons.feasibility,
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
            iconPaths: Icons.viability,
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
            iconPaths: Icons.sustainability,
            items: [
                "Social: Safer work environment through better data analysis and incident prevention",
                "Environmental: Fewer accidents lead to less waste and downtime",
                "Economic: Increased analyst productivity and reduced operational costs",
                "Risks: Ensuring algorithm accuracy; maintaining data privacy and security",
            ],
        },
    ],
};

export const theoryOfChangeData = [
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

export const technicalData = [
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

export const referencesData = {
    title: "References",
    subtitle: "Resources and research supporting our innovation",
    validation: {
        title: "Validation & Research",
        text: "Our approach is informed by user interviews and early prototype testing. We've identified key pain points in the current manual process and validated that automated categorization can likely save analysts several hours each week, time that can be redirected toward proactive safety initiatives and in depth data analysis.",
    },
    categories: [
        {
            title: "Client research",
            iconName: "BookOpenIcon",
            links: [
                {
                    text: "IKEA Sustainability Strategy 2025-2030",
                    url: "https://www.ikea.com.tw/en/about/climate-environment/strategy",
                },
                {
                    text: "IKEA IWAY Supplier Code of Conduct",
                    url: "https://www.ikea.com/global/en/our-business/how-we-work/iway-our-supplier-code-of-conduct/",
                },
                {
                    text: "IKEA Q&A Session (with Annelie Himmler-Olausson, 19 September 2025)",
                    url: null,
                },
            ],
        },
        {
            title: "Interviews",
            iconName: "BookOpenIcon",
            links: [
                { text: "Professor in the Work Environment field", url: null },
                {
                    text: "Solutions Architect in Automotive Engineering",
                    url: null,
                },
                {
                    text: "Logistics Manager with incident reporting responsibilities",
                    url: null,
                },
                {
                    text: "HR representative with specialty in incident and accidents",
                    url: null,
                },
                { text: "Warehouse worker for building scaffolds", url: null },
            ],
        },
        {
            title: "Supporting Materials",
            iconName: "BookOpenIcon",
            links: [
                {
                    text: "Nearly 3 million people die of work-related accidents and diseases each year (ILO)",
                    url: "https://www.ilo.org/resource/news/nearly-3-million-people-die-work-related-accidents-and-diseases",
                },
                {
                    text: "There were 3 286 fatal accidents at work in the EU in 2022 (Eurostat)",
                    url: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Accidents_at_work_statistics",
                },
                {
                    text: "Lack of reliable data on workplace risk putting employees in danger",
                    url: "https://eandt.theiet.org/2019/10/10/lack-reliable-data-workplace-risk-putting-employees-danger",
                },
            ],
        },
    ],
};

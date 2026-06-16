const styles = {
    primary: {
        border: "border-2 border-zinc-200 hover:border-zinc-300",
        iconbg: "border-2 border-zinc-200 zinc-100 text-black",
        background: "bg-white",
    },
};

export function FeatureSection({
    label,
    columns = 3,
    items,
    variant = "primary",
}) {
    return `
    <section>

      <div class="flex items-center justify-center mb-12">
        <span
          class="
            font-semibold uppercase tracking-wider text-zinc-600 bg-zinc-50 px-3 py-1 rounded-full
          "
        >
          ${label}
        </span>
      </div>

      <div class="relative">

        <div
          class="
            absolute top-1/2 left-0 right-0
            h-0.5
            bg-gradient-to-r
            from-transparent
            via-zinc-200
            to-transparent
            hidden md:block
          "
        ></div>

        <div
          class="
            grid
            ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}
            gap-8
            relative
          "
        >
          ${items
              .map((item) =>
                  FeatureCard({
                      ...item,
                      variant,
                  }),
              )
              .join("")}
        </div>

      </div>

    </section>
  `;
}

export function MilestoneSection({ item }) {
    return `
    <section class="flex justify-center">
      ${item.map((item) => Milestone(item)).join("")}
    </section>
  `;
}

export function FeedbackSection({ items = [] } = {}) {
    return `
    <section class="max-w-2xl mx-auto">
      ${items.map((item) => FeedbackCard(item)).join("")}
    </section>
  `;
}

export function FeatureCard({
    title,
    description,
    icon,
    step,
    variant = "primary",
}) {
    const theme = styles[variant];

    return `
    <div class="relative">

      <div
        class="
          p-8
          ${theme.background}
          rounded-2xl
          ${theme.border}
          transition-all duration-300
          hover:shadow-2xl hover:shadow-zinc-500/20
          hover:-translate-y-2
          cursor-pointer group
        "
      >

        <div class="flex flex-col items-center text-center">

          <div
            class="
              w-16 h-16 rounded-full
               ${theme.iconbg}
              flex items-center justify-center
              mb-6
              transition-transform duration-300
              group-hover:scale-110
              group-hover:rotate-6
            "
          >
            ${icon}
          </div>

          <h3
            class="
              text-xl font-bold text-slate-900 mb-2
              group-hover:text-zinc-600
              transition-colors duration-300
            "
          >
            ${title}
          </h3>

          <p class="text-slate-600 text-sm">
            ${description}
          </p>

        </div>

      </div>

      ${
          step
              ? `
            <div
              class="
                absolute -top-4 left-1/2
                -translate-x-1/2
                w-8 h-8
                rounded-full
                bg-white
                border-2 border-zinc-200
                flex items-center justify-center
                text-zinc-600
                font-bold text-sm
              "
            >
              ${step}
            </div>
          `
              : ""
      }

    </div>
  `;
}

export function FeedbackCard({ icon = "", title = "", description = "" } = {}) {
    const theme = styles["primary"];

    return `
    <div
      class="relative ${theme.background}
          rounded-2xl p-8
           ${theme.border}
          transition-all duration-300
          hover:shadow-2xl hover:shadow-zinc-500/20
          hover:-translate-y-2
          cursor-pointer group"
    >
      <div
        class="absolute -top-6 -right-6
               w-16 h-16 rounded-full
               ${theme.iconbg}
               flex items-center justify-center"
      >
        ${icon}
      </div>

      <div class="text-center">
        <h3
          class="text-2xl font-bold text-slate-900 mb-3
                 group-hover:text-zinc-600"
        >
          ${title}
        </h3>

        <p class="text-slate-600">
          ${description}
        </p>

        <div class="flex items-center justify-center gap-4 text-sm text-zinc-700 font-medium" > 
        
        <span>Collect</span> 
        
        <div class="w-2 h-2 rounded-full bg-zinc-500" ></div> 
        
        <span>Learn</span> 
        
        <div class="w-2 h-2 rounded-full bg-zinc-500" ></div> 
        
        <span>Improve</span> 
        
        <div class="w-2 h-2 rounded-full bg-zinc-500" ></div> 
        
        <span>Repeat</span> 
        
        </div>
      </div>
    </div>
  `;
}

export function Milestone({ title, subtitle }) {
    return `
    <div class="flex flex-col items-center py-6">

      <div class="relative">
        <div class="absolute inset-0 animate-ping">
          <div class="w-24 h-24 rounded-full bg-zinc-300/30"></div>
        </div>

        <div
          class="relative w-24 h-24 rounded-full
                 bg-gradient-to-br from-zinc-400 to-zinc-500
                 flex items-center justify-center
                 shadow-2xl shadow-zinc-500/30"
        >
          <div
            class="w-20 h-20 rounded-full bg-white
                   flex items-center justify-center"
          >
            <div class="w-4 h-4 rounded-full bg-zinc-500"></div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <div
          class="inline-flex items-center gap-2 px-4 py-2
                 rounded-full bg-zinc-100 border-2 border-zinc-300 mb-4"
        >
          <span
            class="text-zinc-700 font-bold tracking-wide uppercase text-sm"
          >
            Milestone
          </span>
        </div>

        <h2 class="text-4xl font-bold">
          ${title}
        </h2>

        <p class="text-xl text-slate-700">
          ${subtitle}
        </p>
      </div>

    </div>
  `;
}

export function VerticalConnector(upper, lower) {
    return `
    <div class="relative flex justify-center">
      <div class="my-6 w-0.5 h-20 bg-gradient-to-b from-transparent via-zinc-300 to-transparent"></div>
    </div>
  `;
}

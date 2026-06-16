export function initHowItWorks() {
    let content = `<div
                                class="text-center max-w-2xl mx-auto pt-12 pb-4"
                            >
                                <span
                                    class="text-xs font-semibold uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full"
                                >
                                    The Workflow
                                </span>
                                <h2
                                    class="text-3xl font-bold mt-3 text-foreground"
                                >
                                    From Report to Prediction
                                </h2>
                                <p class="text-muted-foreground mt-2 text-base">
                                    Here is how the system processes data in
                                    real-time to assist safety analysts.
                                </p>
                            </div>

                            <div
                                class="rounded-2xl p-8 md:p-12 border-2 border-slate-800 text-left shadow-soft hover:shadow-2xl hover:shadow-slate-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group max-w-3xl mx-auto"
                            >
                                <h3
                                    class="text-2xl font-semibold mb-8 text-foreground text-center md:text-left"
                                >
                                    How It Works
                                </h3>

                                <ol class="ml-4 space-y-0">
                                    <li
                                        class="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0"
                                    >
                                        <span
                                            class="absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 font-bold text-xs"
                                            >1</span
                                        >
                                        <span
                                            class="text-card-foreground block"
                                        >
                                            Coworker submits an Initial incident
                                            report
                                        </span>
                                    </li>

                                    <li
                                        class="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0"
                                    >
                                        <span
                                            class="absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 font-bold text-xs"
                                            >2</span
                                        >
                                        <span
                                            class="text-card-foreground block"
                                        >
                                            Incident description is sent to the
                                            ROBUST system
                                        </span>
                                    </li>

                                    <li
                                        class="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0"
                                    >
                                        <span
                                            class="absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 font-bold text-xs"
                                            >3</span
                                        >
                                        <span
                                            class="text-card-foreground block"
                                        >
                                            ROBUST produces a Safety Area
                                            prediction, along with a confidence
                                            score
                                        </span>
                                    </li>

                                    <li
                                        class="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0"
                                    >
                                        <span
                                            class="absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 font-bold text-xs"
                                            >4</span
                                        >
                                        <span
                                            class="text-card-foreground block"
                                        >
                                            The Safety Area prediction is
                                            displayed as the default option in
                                            the incident reporting system.
                                        </span>
                                    </li>

                                    <li
                                        class="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0"
                                    >
                                        <span
                                            class="absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 font-bold text-xs"
                                            >5</span
                                        >
                                        <span
                                            class="text-card-foreground block"
                                        >
                                            It is always possible for a coworker
                                            to change the Safety Area category,
                                            enabling human oversight.
                                        </span>
                                    </li>
                                </ol>
                            </div>`;

    document.getElementById("how-it-works-container").innerHTML = content;
}

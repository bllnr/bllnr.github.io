export function initTeamMateProfile() {
    const container = document.getElementById("team-container");
    if (!container) {
        console.log("TeamMates: resource not found");
        return;
    }

    const imgPath = "/projects/robust/project-assets/";
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
        <div class="rounded-2xl group border-2 border-blue-200 transition-all duration-300 hover:border-blue-400">
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

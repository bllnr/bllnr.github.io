// Opens the larger version an image links to (a.zoomable) in a viewer over
// the page. Without JavaScript the links open the larger image on its own.
const viewer = document.createElement("dialog");
viewer.className = "image-viewer";
viewer.innerHTML = `
    <button type="button" class="image-viewer-close" aria-label="Close">&times;</button>
    <figure>
        <img alt="" />
        <figcaption class="fig_text"></figcaption>
    </figure>`;
document.body.append(viewer);

const viewerImage = viewer.querySelector("img");
const viewerCaption = viewer.querySelector("figcaption");

for (const link of document.querySelectorAll("a.zoomable")) {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const image = link.querySelector("img");
        viewerImage.src = link.href;
        viewerImage.alt = image.alt;
        // The image's caption: its figure's, else the figure text beside it.
        const caption = link.closest("figure")?.querySelector("figcaption") ?? link.parentElement.querySelector(".fig_text");
        viewerCaption.textContent = caption?.innerText.trim().replace(/\s*\n\s*/g, " · ") ?? "";
        viewer.showModal();
    });
}

// Any click closes it, on the image as well as around it; Esc closes it too.
viewer.addEventListener("click", () => viewer.close());

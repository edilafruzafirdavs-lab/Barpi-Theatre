const hall = document.getElementById('hall')

let x = 0;
let y = 0;
let scale = 1;

let dragging = false;
let lastX = 0;
let lastY = 0;

hall.addEventListener("mousedown", (event) => {
    dragging = true;

    lastX = event.clientX;
    lastY = event.clientY;
});

hall.addEventListener("mouseup", () => {
    dragging = false;
});

hall.addEventListener("mousemove", (event) => {
    if (!dragging) return;

    x += event.clientX - lastX;
    y += event.clientY - lastY;

    lastX = event.clientX;
    lastY = event.clientY;

    hall.style.transform =
        `translate(${x}px, ${y}px) scale(${scale})`;
});

hall.addEventListener("wheel", (event) => {
    event.preventDefault();

    if (event.deltaY < 0)
        scale *= 1.1;
    else
        scale /= 1.1;

    hall.style.transform =
        `translate(${x}px, ${y}px) scale(${scale})`;
});
const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const fontSize = document.getElementById("fontSizePicker");
const retrieveButton = document.getElementById("retrieveButton");
const darkModeSwitch = document.getElementById("darkModeSwitch");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

colorPicker.addEventListener("change", (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

canvas.addEventListener("mouseup", (e) => {
    isDrawing = false;
});

canvasColor.addEventListener("change", (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

fontSize.addEventListener("change", (e) => {
    ctx.lineWidth = e.target.value;
});

clearButton.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener("click", (e) => {
    localStorage.setItem('canvasContents', canvas.toDataURL());

    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

retrieveButton.addEventListener("click", (e) => {
    let savedCanvas = localStorage.getItem('canvasContents');

    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        }
    }
});

darkModeSwitch.addEventListener("change", (e) => {
    if (darkModeSwitch.checked) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
});

let panel = document.querySelector(".panel");

let images = ["url(./images/slide-01.jpg)","url(./images/slide-02.jpg)","url(./images/slide-03.jpg)"];

let index = 0;

function changeBackground() {
    panel.style.backgroundImage = images[index];
    index = (index + 1) % images.length;
}

setInterval(changeBackground, 3000);
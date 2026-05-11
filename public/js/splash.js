// public/js/splash.js
document.addEventListener('DOMContentLoaded', () => {
    const progressText = document.getElementById('progressText');
    const imageContainer = document.getElementById('imageContainer');
    const splashScreen = document.getElementById('splashScreen');

    const photos = [
        "SLM08533.JPG", "SLM08594.JPG", "SLM08669.JPG", "SLM08673.JPG",
        "SLM08723.JPG", "SLM08743.JPG", "SLM08759.JPG", "SLM08846.JPG",
        "SLM08874.JPG", "SLM09121.JPG", "SLM09131.JPG", "SLM09212.JPG",
        "SLM09249.JPG", "SLM09279.JPG", "SLM09290.JPG", "SLM09292.JPG",
        "SLM09307.JPG", "SLM09312.JPG", "SLM09319.JPG"
    ];

    let currentIdx = 0;
    let progress = 0;
    const totalDuration = 7000; // 7 Detik

    function changeImage() {
        const newImg = document.createElement('img');
        newImg.src = `/images/${photos[currentIdx]}`;

        imageContainer.appendChild(newImg);

        setTimeout(() => {
            newImg.style.opacity = "1";
        }, 50);

        if (imageContainer.children.length > 1) {
            const oldImg = imageContainer.children[0];
            oldImg.style.opacity = "0";
            setTimeout(() => {
                if (oldImg.parentNode === imageContainer) {
                    imageContainer.removeChild(oldImg);
                }
            }, 1200);
        }

        currentIdx = (currentIdx + 1) % photos.length;
    }

    changeImage();
    const imageInterval = setInterval(changeImage, 230);

    const progressInterval = setInterval(() => {
        progress++;
        if (progressText) {
            progressText.innerText = `${progress}%`;
        }

        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(imageInterval);

            setTimeout(() => {
                splashScreen.classList.add('fade-out');
                // MODIFIKASI: Kita hapus baris unlocked body di sini agar menu burger 
                // tidak muncul sebelum tombol "LET'S OPEN" diklik.
            }, 600);
        }
    }, totalDuration / 100);
});
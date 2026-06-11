// public/js/splash.js
document.addEventListener('DOMContentLoaded', () => {
    const progressText = document.getElementById('progressText');
    const imageContainer = document.getElementById('imageContainer');
    const splashScreen = document.getElementById('splashScreen');

    // 1. UPDATE: Daftar foto sesuai list baru (Pastikan case .jpg sesuai)
    const photos = [
        "SLM08509.jpg", "SLM08533.jpg", "SLM08594.jpg", "SLM08673.jpg",
        "SLM08723.jpg", "SLM08743.jpg", "SLM08759.jpg", "SLM08846.jpg",
        "SLM08874.jpg", "SLM09121.jpg", "SLM09131.jpg", "SLM09212.jpg",
        "SLM09279.jpg", "SLM09290.jpg", "SLM09292.jpg", "SLM09307.jpg",
        "SLM09312.jpg", "SLM09319.jpg", "SLM084551.jpg", "SLM092491.jpg"
    ];

    let currentIdx = 0;
    let progress = 0;
    const totalDuration = 7000; // 7 Detik

    function changeImage() {
        const newImg = document.createElement('img');

        // 2. UPDATE: Ubah path folder dari /images/ ke /compresses-images/
        newImg.src = `/compresses-images/${photos[currentIdx]}`;

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
            }, 600);
        }
    }, totalDuration / 100);
});
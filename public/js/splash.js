(function () {
    const splash = document.getElementById('splashScreen');
    const progressText = document.getElementById('progressText');

    let progress = 0;

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    const duration = 2500; // total waktu animasi (ms)
    const startTime = Date.now();

    function animate() {
        const now = Date.now();
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);

        // easing
        progress = Math.floor(easeOutCubic(t) * 100);

        if (progressText) {
            progressText.textContent = `${progress}%`;
        }

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            finishLoading();
        }
    }

    // splash.js (hanya ganti fungsi ini)

    function finishLoading() {
        if (splash) {
            // Gunakan kelas tunggal yang sudah didefinisikan di CSS
            splash.classList.add('fade-out');

            // Berikan waktu transisi CSS selesai sebelum menghapus element
            setTimeout(() => {
                splash.remove();

                // Opsional: Munculkan konten utama
                const mainContent = document.getElementById('mainContent');
                if (mainContent) {
                    mainContent.classList.remove('opacity-0');
                    // Pastikan Anda punya animasi fadeIn di CSS global Anda
                    mainContent.classList.add('animate-fadeIn');
                }
            }, 700); // Samakan dengan durasi transition di CSS (.splash.fade-out)
        }
    }

    // delay kecil biar terasa smooth
    setTimeout(() => {
        animate();
    }, 300);

})();
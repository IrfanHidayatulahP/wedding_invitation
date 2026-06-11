document.addEventListener('DOMContentLoaded', () => {

    // Mengubah selektor menggunakan ID (#) agar sesuai dengan HTML Anda
    const menuIcon = document.getElementById('menuIcon');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    const menuLinks = document.querySelectorAll('.menu-item');

    // Error handling (Sekarang tidak akan memicu error lagi)
    if (!menuIcon || !menuOverlay || !closeMenu) {
        console.error('Menu elements not found');
        return;
    }

    // Buka menu
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        menuOverlay.classList.add('active');
    });

    // Tutup menu melalui tombol Close
    closeMenu.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
    });

    // Tutup menu saat salah satu link navigasi diklik
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
        });
    });

    // Tutup menu saat klik area backdrop (luar panel menu)
    menuOverlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu-backdrop')) {
            menuOverlay.classList.remove('active');
        }
    });

    // Dukungan tombol ESC untuk menutup menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            menuOverlay.classList.remove('active');
        }
    });

});
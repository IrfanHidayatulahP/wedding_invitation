// Tambahkan ke file splash.js atau buat menu.js baru
(function () {
    const menuIcon = document.getElementById('menuIcon'); // ID dari burger di right-panel
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    const menuItems = document.querySelectorAll('.menu-item');

    function toggleMenu() {
        menuOverlay.classList.toggle('active');
    }

    if (menuIcon) menuIcon.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

    // Tutup menu jika salah satu link diklik
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
        });
    });
})();
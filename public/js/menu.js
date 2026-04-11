// Toggle Menu
if (menuIcon && menuOverlay && closeMenu) {
    // Fungsi Buka
    menuIcon.addEventListener('click', () => {
        menuOverlay.classList.add('active');
    });

    // Fungsi Tutup
    const handleClose = () => {
        menuOverlay.classList.remove('active');
    };

    closeMenu.addEventListener('click', handleClose);

    // Menutup juga bisa dengan klik area hitam (backdrop)
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', handleClose);
    }
}
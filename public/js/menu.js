// Lebih baik error handling
if (!menuIcon || !menuOverlay || !closeMenu) {
    console.error('Menu elements not found');
    return;
}

// Tambah stopPropagation
menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    menuOverlay.classList.add('active');
});

// Keyboard support (ESC untuk close)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        menuOverlay.classList.remove('active');
    }
});
// galeria.js — substitua o arquivo inteiro por este
// Voltar ao topo (se usar)
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');

    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    // Seleciona os itens inteiros (assim o overlay não bloqueia)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imagesSrc = [];

    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img && img.src) imagesSrc.push(img.src);
    });

    let currentIndex = 0;

    function showImage(index) {
        if (imagesSrc.length === 0) return;
        if (index >= imagesSrc.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = imagesSrc.length - 1;
        } else {
            currentIndex = index;
        }

        lightboxImg.src = imagesSrc[currentIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // abre ao clicar no item todo (overlay inclusive)
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function (e) {
            // evita que cliques em links internos (se houver) façam navegação
            e.preventDefault?.();
            showImage(index);
        });
    });

    function closeModal() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        // limpa src (opcional)
        lightboxImg.src = '';
    }

    // segurança: checar existência antes de usar
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            // se clicar no fundo (fora da imagem e das setas), fecha
            if (e.target === lightbox) {
                closeModal();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex - 1);
        });
    } else {
        console.warn('prevBtn não encontrado');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex + 1);
        });
    } else {
        console.warn('nextBtn não encontrado');
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    // DEBUG: logs para confirmar elementos (remova depois)
    // console.log({ prevBtn, nextBtn, galleryItemsCount: galleryItems.length, imagesSrc });
});

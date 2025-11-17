// Voltar ao topo
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Lightbox
document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    
    // 1. Seleciona as setas que você adicionou no HTML
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    // 2. Pega todas as imagens da galeria
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const imagesSrc = []; // Array para guardar os links (src)
    
    // 3. Salva o 'src' de cada imagem no array
    galleryImages.forEach(img => {
        imagesSrc.push(img.src);
    });

    let currentIndex = 0; // Guarda o índice da imagem atual

    // 4. Função para ABRIR e MOSTRAR a imagem
    function showImage(index) {
        // Validação para o loop da galeria
        if (index >= imagesSrc.length) {
            currentIndex = 0; // Volta para a primeira
        } else if (index < 0) {
            currentIndex = imagesSrc.length - 1; // Vai para a última
        } else {
            currentIndex = index;
        }
        
        lightboxImg.src = imagesSrc[currentIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 5. Adiciona o clique em cada imagem da galeria
    // É ISSO QUE NÃO ESTAVA FUNCIONANDO POR CAUSA DO ERRO
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function () {
            showImage(index);
        });
    });

    // 6. Funções para fechar o lightbox
    function closeModal() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);

    lightbox.addEventListener('click', (e) => {
        // Fecha se clicar no fundo escuro (fora da imagem)
        if (e.target === lightbox) {
            closeModal();
        }
    });

    // 7. Funções das SETAS e TECLADO
    prevBtn.addEventListener('click', () => {
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showImage(currentIndex + 1);
    });

    document.addEventListener('keydown', (e) => {
        // Só funciona se o lightbox estiver ativo
        if (!lightbox.classList.contains('active')) {
            return;
        }
        
        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.key === 'ArrowLeft') {
            showImage(currentIndex - 1);
        }
        if (e.key === 'ArrowRight') {
            showImage(currentIndex + 1);
        }
    });

});
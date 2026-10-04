document.addEventListener("DOMContentLoaded", () => {
    // ===== CARROSSEL =====
    const track = document.querySelector(".carrossel-track");
    const slides = document.querySelectorAll(".carrossel-track .slide");
    const btnLeft = document.querySelector(".btn-left");
    const btnRight = document.querySelector(".btn-right");
    const bolinhas = document.querySelectorAll(".bolinhas div");

    let index = 0;
    const totalSlides = slides.length;

    if (track && totalSlides > 0) {
        function atualizarCarrossel() {
            const largura = document.querySelector(".carrossel").offsetWidth;
            track.style.transform = `translateX(-${index * largura}px)`;
            atualizarBolinhas();
        }

        function atualizarBolinhas() {
            bolinhas.forEach((b, i) => {
                if (i === index) {
                    b.classList.add("active");
                    b.style.background = "#31B26A";
                } else {
                    b.classList.remove("active");
                    b.style.background = "#bbb";
                }
            });
        }

        if (btnRight) {
            btnRight.addEventListener("click", () => {
                index = (index + 1) % totalSlides;
                atualizarCarrossel();
            });
        }

        if (btnLeft) {
            btnLeft.addEventListener("click", () => {
                index = (index - 1 + totalSlides) % totalSlides;
                atualizarCarrossel();
            });
        }

        bolinhas.forEach((b, i) => {
            b.addEventListener("click", () => {
                index = i;
                atualizarCarrossel();
            });
        });

        // Touch/Swipe suporte para mobile
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) {
                    // Swipe para a esquerda -> próximo
                    index = (index + 1) % totalSlides;
                } else {
                    // Swipe para a direita -> anterior
                    index = (index - 1 + totalSlides) % totalSlides;
                }
                atualizarCarrossel();
            }
        }

        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(atualizarCarrossel, 100);
        });

        atualizarCarrossel();
    }

    // ===== WHATSAPP DIRETO =====
    const textarea = document.getElementById("mensagemZap");
    const botaoZap = document.getElementById("btnEnviarZap");

    if (textarea && botaoZap) {
        botaoZap.addEventListener("click", () => {
            const msg = textarea.value.trim();
            if (!msg) {
                alert("Por favor, digite sua mensagem!");
                textarea.focus();
                return;
            }

            const numero = "5511980487555";
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
            window.open(url, "_blank", "noopener,noreferrer");
            textarea.value = "";
        });
    }
});

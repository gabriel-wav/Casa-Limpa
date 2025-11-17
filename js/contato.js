// ===== CARROSSEL =====
const track = document.querySelector(".carrossel-track");
const slides = document.querySelectorAll(".carrossel-track img");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const bolinhas = document.querySelectorAll(".bolinhas div");

let index = 0;

// Verifica se os elementos do carrossel existem antes de adicionar eventos
if (track && slides.length > 0 && btnLeft && btnRight && bolinhas.length > 0) {
  
  function atualizarCarrossel() {
    const largura = document.querySelector(".carrossel").offsetWidth;
    track.style.transform = `translateX(-${index * largura}px)`;
    atualizarBolinhas();
  }

  function atualizarBolinhas() {
    bolinhas.forEach((b, i) => {
      b.style.background = (i === index) ? "#31B26A" : "#3A3A3A";
    });
  }

  btnRight.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    atualizarCarrossel();
  });

  btnLeft.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    atualizarCarrossel();
  });

  bolinhas.forEach((b, i) => {
    b.addEventListener("click", () => {
      index = i;
      atualizarCarrossel();
    });
  });

  window.addEventListener("resize", atualizarCarrossel);
  atualizarCarrossel();
}

// ===== WHATSAPP DIRETO =====
// Adicionado "DOMContentLoaded" para garantir que o HTML carregou
document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById('mensagemZap');
  const botaoZap = document.getElementById('btnEnviarZap');

  // Verifica se os elementos do formulário WhatsApp existem
  if (!textarea || !botaoZap) {
    console.log('Elementos do formulário WhatsApp não encontrados.');
    return; 
  }

  botaoZap.addEventListener('click', () => {
    const msg = textarea.value.trim();
    if (!msg) {
      alert('Digite uma mensagem!');
      return;
    }

    const numero = "5511980487555"; // Número de WhatsApp
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    textarea.value = '';
  });
});

// O FORMSPREE CUIDARÁ DO ENVIO
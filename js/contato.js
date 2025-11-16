// ===== CARROSSEL =====
const track = document.querySelector(".carrossel-track");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const bolinhas = document.querySelectorAll(".bolinhas div");

let index = 0;

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



// ===== FORMULÁRIO PARA E-MAIL (mailto: - SEM SERVIÇO EXTERNO) =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('formContato');
  if (!form) return;

  const botao = form.querySelector('button');
  const textoOriginal = botao.textContent;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Captura valores
    const nome = document.getElementById('Nome').value.trim();
    const bairro = document.getElementById('Bairro').value.trim();
    const telefone = document.getElementById('Telefone').value.trim();
    const mensagem = document.getElementById('Mensagem').value.trim();
    const checkboxes = document.querySelectorAll('input[name="tipoLimpeza"]:checked');
    const tipos = Array.from(checkboxes).map(cb => cb.value).join(' e ') || 'Nenhum';

    // Validação
    if (!nome || !bairro || !telefone || !mensagem || checkboxes.length === 0) {
      alert('Preencha todos os campos e selecione pelo menos um tipo de limpeza.');
      return;
    }

    // Feedback
    botao.textContent = 'Preparando e-mail...';
    botao.disabled = true;

    // Monta corpo do e-mail
    const corpo = `
      Olá Casa Limpa!

      Novo contato do site:

      Nome: ${nome}
      Bairro: ${bairro}
      Telefone: ${telefone}
      Tipo de limpeza: ${tipos}

      Mensagem:
      ${mensagem}

      ---
      Enviado em: ${new Date().toLocaleString('pt-BR')}
    `.trim();

    // SEU E-MAIL
    const seuEmail = "contato@casalimpa.com"; // ← COLOQUE SEU E-MAIL AQUI

    // Monta mailto
    const mailtoLink = `mailto:${seuEmail}?subject=Novo%20Contato%20do%20Site&body=${encodeURIComponent(corpo)}`;

    // Abre o cliente de e-mail
    window.location.href = mailtoLink;

    // Feedback final
    setTimeout(() => {
      alert('Seu cliente de e-mail foi aberto. Clique em "Enviar" lá para confirmar!');
      form.reset();
      botao.textContent = textoOriginal;
      botao.disabled = false;
    }, 1000);
  });
});


// ===== VALIDAÇÃO CORRIGIDA: CHECKBOX + TELEFONE FICTÍCIO OK =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('formContato');
  const telefoneInput = document.getElementById('Telefone');
  const botao = form.querySelector('button');
  const textoOriginal = botao.textContent;

  if (!form || !telefoneInput) return;

  // === MÁSCARA DE TELEFONE ===
  telefoneInput.addEventListener('input', function(e) {
    let v = e.target.value.replace(/\D/g, ''); // só números
    if (v.length <= 2) {
      v = v.replace(/^(\d{0,2})/, '($1');
    } else if (v.length <= 7) {
      v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    e.target.value = v.substring(0, 15);
  });

  // === VALIDAÇÃO AO ENVIAR ===
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // --- Captura dados ---
    const nome = document.getElementById('Nome').value.trim();
    const bairro = document.getElementById('Bairro').value.trim();
    const telefone = telefoneInput.value.replace(/\D/g, ''); // só números
    const mensagem = document.getElementById('Mensagem').value.trim();

    // --- Checkboxes ---
    const checkboxes = document.querySelectorAll('input[name="tipoLimpeza"]:checked');
    const tipos = Array.from(checkboxes).map(cb => cb.value);

    // --- Validação ---
    if (!nome || !bairro || !mensagem) {
      alert('Preencha nome, bairro e mensagem.');
      return;
    }

    if (telefone.length !== 11) {
      alert('Telefone deve ter 11 dígitos: (XX) 9XXXX-XXXX');
      return;
    }

    if (!telefone.startsWith('9', 2)) {
      alert('Celular deve começar com 9 após o DDD.');
      return;
    }

    if (tipos.length === 0) {
      alert('Selecione pelo menos um tipo de limpeza.');
      return;
    }

    // --- Feedback ---
    botao.textContent = 'Preparando...';
    botao.disabled = true;

    // --- Monta e-mail (mailto) ---
    const corpo = `
      Novo contato do site!

      Nome: ${nome}
      Bairro: ${bairro}
      Telefone: (${telefone.substring(0,2)}) ${telefone.substring(2,7)}-${telefone.substring(7)}
      Tipo: ${tipos.join(' e ')}
      
      Mensagem:
      ${mensagem}
    `.trim();

    const seuEmail = "cslimpa.organizada@gmail.com";
    const mailto = `mailto:${seuEmail}?subject=Contato do Site&body=${encodeURIComponent(corpo)}`;

    // --- Abre e-mail ---
    window.location.href = mailto;

    setTimeout(() => {
      alert('Seu e-mail foi aberto! Clique em "Enviar" para confirmar.');
      form.reset();
      botao.textContent = textoOriginal;
      botao.disabled = false;
    }, 1000);
  });
});

// ===== WHATSAPP DIRETO =====
document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById('mensagemZap');
  const botaoZap = document.getElementById('btnEnviarZap');

  if (!textarea || !botaoZap) return;

  botaoZap.addEventListener('click', () => {
    const msg = textarea.value.trim();
    if (!msg) {
      alert('Digite uma mensagem!');
      return;
    }

    const numero = "5511980487555"; // ← MUDE PARA SEU NÚMERO
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    textarea.value = '';
  });
});
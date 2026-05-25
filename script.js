/* =============================================
   BARBEARIA MADICK — script.js
   ============================================= */

/* === CARREGA AS FOTOS === */
function loadImages() {
  /* As imagens ficam na pasta /img/
     Coloque os arquivos:
       img/foto1.jpg  (barbeiro com tesoura)
       img/foto2.jpg  (barbeiro com máquina)
  */
  var img1 = document.getElementById('img1');
  var img2 = document.getElementById('img2');
  var gimg1 = document.getElementById('gimg1');
  var gimg2 = document.getElementById('gimg2');

  if (img1)  img1.src  = 'img/foto1.jpg';
  if (img2)  img2.src  = 'img/foto2.jpg';
  if (gimg1) gimg1.src = 'img/foto1.jpg';
  if (gimg2) gimg2.src = 'img/foto2.jpg';
}

/* === FORMULÁRIO DE AGENDAMENTO === */
function handleBooking(e) {
  e.preventDefault();

  var btn = e.target.querySelector('button[type=submit]');
  var original = btn.textContent;

  /* Pega os dados do formulário */
  var nome    = e.target.querySelector('input[name=nome]').value;
  var tel     = e.target.querySelector('input[name=tel]').value;
  var data    = e.target.querySelector('input[name=data]').value;
  var horario = e.target.querySelector('select[name=horario]').value;
  var servico = e.target.querySelector('select[name=servico]').value;

  /* Formata data para pt-BR */
  var dataFormatada = data
    ? new Date(data + 'T12:00:00').toLocaleDateString('pt-BR')
    : '';

  /* Monta mensagem para WhatsApp */
  var msg = [
    '✂️ *Agendamento - Barbearia Madick*',
    '',
    '👤 Nome: ' + nome,
    '📱 WhatsApp: ' + tel,
    '📅 Data: ' + dataFormatada,
    '🕐 Horário: ' + horario,
    '💈 Serviço: ' + servico,
  ].join('\n');

  /* Feedback visual */
  btn.textContent = '✓ Redirecionando para WhatsApp...';
  btn.style.background = '#25D366';
  btn.style.color = '#fff';

  /* Abre WhatsApp com a mensagem */
  setTimeout(function() {
    openWhatsApp(msg);
    btn.textContent = original;
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 800);
}

/* === WHATSAPP === */
function openWhatsApp(mensagem) {
  /* ⚠️ TROQUE pelo número real com DDD + 9 dígitos, sem espaços ou traços */
  var NUMERO = '11992037912';

  var texto = mensagem || 'Olá! Gostaria de agendar um horário na Barbearia Madick 💈';
  var url = 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(texto);
  window.open(url, '_blank');
}

/* === SCROLL SUAVE DOS BOTÕES DA NAV === */
function initNav() {
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* === ANIMAÇÃO AO ROLAR (Intersection Observer) === */
function initScrollAnimations() {
  var cards = document.querySelectorAll('.service-card, .gallery-photo');

  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(function(card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease ' + (i * 0.07) + 's, transform 0.5s ease ' + (i * 0.07) + 's';
    observer.observe(card);
  });
}

/* === INICIALIZA TUDO === */
document.addEventListener('DOMContentLoaded', function() {
  loadImages();
  initNav();
  initScrollAnimations();
});

const WHATSAPP_NUMBER = '5511992037912';

/* === FORMULÁRIO DE AGENDAMENTO === */
function handleBooking(e) {
  e.preventDefault();

  var btn = e.target.querySelector('button[type=submit]');
  var original = btn.textContent;

  var nome = e.target.querySelector('input[name=nome]').value.trim();
  var tel = e.target.querySelector('input[name=tel]').value.trim();
  var data = e.target.querySelector('input[name=data]').value;
  var horario = e.target.querySelector('select[name=horario]').value;
  var servico = e.target.querySelector('select[name=servico]').value;

  if (!nome || !tel || !data) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  var dataFormatada = new Date(data + 'T12:00:00').toLocaleDateString('pt-BR');

  var msg = `✂️ *Agendamento - Barbearia Madick*

👤 Nome: ${nome}
📱 WhatsApp: ${tel}
📅 Data: ${dataFormatada}
🕐 Horário: ${horario}
💈 Serviço: ${servico}`;

  btn.textContent = 'Redirecionando...';
  btn.style.background = '#25D366';

  setTimeout(function () {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.location.href = url;

    btn.textContent = original;
    e.target.reset();
  }, 600);
}
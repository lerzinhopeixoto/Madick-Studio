import { db } from './firebase.js';
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const WHATSAPP_NUMBER = '5511992037912';

window.handleBooking = async function (e) {
  e.preventDefault();

  const btn = e.target.querySelector('button[type=submit]');
  const original = btn.textContent;

  const nome = e.target.querySelector('input[name=nome]').value.trim();
  const tel = e.target.querySelector('input[name=tel]').value.trim();
  const data = e.target.querySelector('input[name=data]').value;
  const horario = e.target.querySelector('select[name=horario]').value;
  const servico = e.target.querySelector('select[name=servico]').value;

  if (!nome || !tel || !data) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  try {
    const dataFormatada = new Date(data + 'T12:00:00').toLocaleDateString('pt-BR');

    const msg = `✂️ *Agendamento - Barbearia Madick*

👤 Nome: ${nome}
📱 WhatsApp: ${tel}
📅 Data: ${dataFormatada}
🕐 Horário: ${horario}
💈 Serviço: ${servico}`;

    btn.textContent = 'Redirecionando...';

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    await addDoc(collection(db, "agendamentos"), {
      nome,
      telefone: tel,
      data,
      horario,
      servico,
      criadoEm: new Date()
    });

  } catch (error) {
    console.error(error);
    alert("Erro ao salvar agendamento.");
  }

  btn.textContent = original;
};
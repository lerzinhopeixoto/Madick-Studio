import { db } from './firebase.js';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

async function handleBooking(e) {
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
    const q = query(
      collection(db, "agendamentos"),
      where("data", "==", data),
      where("horario", "==", horario)
    );
    const snap = await getDocs(q);

    if (!snap.empty) {
      mostrarMensagem("❌ Esse horário já está ocupado! Escolha outro.", "erro");
      return;
    }

    btn.textContent = 'Agendando...';

    await addDoc(collection(db, "agendamentos"), {
      nome,
      telefone: tel,
      data,
      horario,
      servico,
      criadoEm: new Date()
    });

    const dataFormatada = new Date(data + 'T12:00:00').toLocaleDateString('pt-BR');
    mostrarMensagem(`✅ Agendamento confirmado! Te esperamos no dia ${dataFormatada} às ${horario}.`, "sucesso");
    e.target.reset();

  } catch (error) {
    console.error(error);
    mostrarMensagem("❌ Erro ao agendar. Tente novamente.", "erro");
  }

  btn.textContent = original;
}

function mostrarMensagem(texto, tipo) {
  let msg = document.getElementById('booking-msg');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'booking-msg';
    const form = document.querySelector('form');
    form.parentNode.insertBefore(msg, form.nextSibling);
  }
  msg.textContent = texto;
  msg.style.cssText = `
    margin-top: 1rem;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    background: ${tipo === 'sucesso' ? '#d1fae5' : '#fee2e2'};
    color: ${tipo === 'sucesso' ? '#065f46' : '#991b1b'};
    border: 1px solid ${tipo === 'sucesso' ? '#6ee7b7' : '#fca5a5'};
  `;
  setTimeout(() => { msg.textContent = ''; msg.style.cssText = ''; }, 6000);
}

document.getElementById('booking-form').addEventListener('submit', handleBooking);
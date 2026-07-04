import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


async function handleBooking(e) {
  e.preventDefault();

  const form = e.target;

  const btn = form.querySelector('button[type=submit]');
  const originalText = btn.textContent;

  const nome = form.querySelector('input[name=nome]').value.trim();
  const tel = form.querySelector('input[name=tel]').value.trim();
  const data = form.querySelector('input[name=data]').value;
  const horario = form.querySelector('select[name=horario]').value;
  const servico = form.querySelector('select[name=servico]').value;

  if (!nome || !tel || !data || !horario || !servico) {
    mostrarMensagem("Preencha todos os campos.", "erro");
    return;
  }

  btn.textContent = "Verificando...";

  try {
    // 🔍 checar se horário já existe
    const q = query(
      collection(db, "agendamentos"),
      where("data", "==", data),
      where("horario", "==", horario)
    );

    const snap = await getDocs(q);

    if (!snap.empty) {
      mostrarMensagem("❌ Esse horário já está ocupado!", "erro");
      return;
    }

    btn.textContent = "Agendando...";

    // 💾 salvar no Firestore
    await addDoc(collection(db, "agendamentos"), {
      nome,
      telefone: tel,
      data,
      horario,
      servico,
      criadoEm: new Date()
    });

    const dataFormatada = new Date(data + "T12:00:00")
      .toLocaleDateString("pt-BR");

    mostrarMensagem(
      `✅ Agendado com sucesso! Dia ${dataFormatada} às ${horario}`,
      "sucesso"
    );

    form.reset();

  } catch (error) {
    // 🔥 ISSO AQUI É O MAIS IMPORTANTE
    console.error("🔥 ERRO FIREBASE COMPLETO:", error);
    alert(error.message || error);

    mostrarMensagem("❌ Erro ao agendar. Verifique o console.", "erro");

  } finally {
    btn.textContent = originalText;
  }
}


// 💬 mensagem bonita
function mostrarMensagem(texto, tipo) {
  let msg = document.getElementById("booking-msg");

  if (!msg) {
    msg = document.createElement("div");
    msg.id = "booking-msg";

    const form = document.querySelector("form");
    form.parentNode.insertBefore(msg, form.nextSibling);
  }

  msg.textContent = texto;

  msg.style.cssText = `
    margin-top: 1rem;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    background: ${tipo === "sucesso" ? "#d1fae5" : "#fee2e2"};
    color: ${tipo === "sucesso" ? "#065f46" : "#991b1b"};
    border: 1px solid ${tipo === "sucesso" ? "#6ee7b7" : "#fca5a5"};
  `;

  setTimeout(() => {
    msg.textContent = "";
    msg.style.cssText = "";
  }, 6000);
}


// 🚀 evento do formulário
document.getElementById("booking-form")
  .addEventListener("submit", handleBooking);
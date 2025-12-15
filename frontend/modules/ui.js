// modules/ui.js
// Renderiza resultados e erros na UI de acordo com o contrato do evaluator:
// { nivel: "verde"|"laranja"|"vermelho", titulo: string, motivos: string[], acoes: string[] }

export function hideResult(box) {
  box.classList.add("oculto");
  box.classList.remove("verde", "laranja", "vermelho", "erro");
  box.innerHTML = "";
}

export function renderErrors(box, errors) {
  box.classList.remove("oculto", "verde", "laranja", "vermelho");
  box.classList.add("erro");

  box.innerHTML = `
    <h2>Corrija os campos</h2>
    <ul>${errors.map((e) => `<li>${e}</li>`).join("")}</ul>
  `;
}

export function renderResult(box, result) {
  // Segurança: evita quebrar a tela se vier algo inesperado
  if (!result || !result.nivel) {
    renderErrors(box, ["Resultado inválido retornado pelo avaliador."]);
    return;
  }

  box.classList.remove("oculto", "erro", "verde", "laranja", "vermelho");
  box.classList.add(result.nivel);

  const motivosHtml = (result.motivos?.length)
    ? `<h3>Motivos</h3><ul>${result.motivos.map((m) => `<li>${m}</li>`).join("")}</ul>`
    : "";

  const acoesHtml = (result.acoes?.length)
    ? `<h3>Ações</h3><ul>${result.acoes.map((a) => `<li>${a}</li>`).join("")}</ul>`
    : "";

  box.innerHTML = `
    <h2>Resultado</h2>
    <p><strong>${result.titulo}</strong></p>
    ${motivosHtml}
    ${acoesHtml}
  `;
}

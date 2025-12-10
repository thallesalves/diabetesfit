// Renderiza resultados e erros na UI

export function hideResult(box) {
  box.classList.add("oculto");
  box.innerHTML = "";
}

export function renderErrors(box, errors) {
  box.classList.remove("oculto");
  box.classList.remove("verde", "laranja", "vermelho");
  box.classList.add("erro");

  box.innerHTML = `
    <h2>Corrija os campos</h2>
    <ul>${errors.map((e) => `<li>${e}</li>`).join("")}</ul>
  `;
}

export function renderResult(box, result) {
  box.classList.remove("oculto", "erro", "verde", "laranja", "vermelho");
  box.classList.add(result.level); // classe CSS = verde|laranja|vermelho

  const notesHtml = result.notes?.length
    ? `<ul class="notes">${result.notes.map((n) => `<li>${n}</li>`).join("")}</ul>`
    : "";

  box.innerHTML = `
    <h2>Resultado</h2>
    <div class="pill ${result.level}">${result.label}</div>
    ${notesHtml}
  `;
}

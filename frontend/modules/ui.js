// frontend/modules/ui.js

// Renderiza resultados e erros na interface.
//
// Contrato do evaluator:
//
// {
//   nivel: "verde" | "laranja" | "vermelho",
//   titulo: string,
//   motivos: string[],
//   acoes: string[]
// }

export function hideResult(box) {
  box.classList.add("oculto");

  box.classList.remove("verde", "laranja", "vermelho", "erro");

  box.innerHTML = "";
}

export function renderErrors(box, errors) {
  box.classList.remove("oculto", "verde", "laranja", "vermelho");

  box.classList.add("erro");

  box.innerHTML = `
    <div class="resultado-card">
      <h2>Corrija os campos</h2>

      <div class="resultado-items">
        ${errors
          .map(
            (error) => `
              <div class="resultado-item">
                <span class="resultado-icon">!</span>

                <p>${error}</p>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

export function renderResult(box, result) {
  if (!result || !result.nivel) {
    renderErrors(box, ["Resultado inválido retornado pelo avaliador."]);

    return;
  }

  box.classList.remove("oculto", "erro", "verde", "laranja", "vermelho");

  box.classList.add(result.nivel);

  const motivosHtml = createList("Motivos", result.motivos, "motivo");

  const acoesHtml = createList("Ações recomendadas", result.acoes, "acao");

  box.innerHTML = `
    <article class="resultado-card">
      <h2>${result.titulo}</h2>

      ${motivosHtml}

      ${acoesHtml}
    </article>
  `;
}

export function renderHistory(historyList, history) {
  if (history.length === 0) {
    historyList.innerHTML = `
      <p>Nenhuma avaliação realizada.</p>
    `;

    return;
  }

  historyList.innerHTML = "";

  history
    .slice()
    .reverse()
    .forEach((evaluation) => {
      const historyItem = document.createElement("article");

      historyItem.classList.add(
        "history-item",
        `history-item-${evaluation.nivel}`,
      );

      historyItem.innerHTML = `
        <p class="history-date">
          ${evaluation.data}
        </p>

        <h3>
          ${evaluation.resultado}
        </h3>

        <details class="history-details">
          <summary>Ver detalhes</summary>

          <div class="history-content">
            <p>
              <strong>Glicemia:</strong>
              ${evaluation.glicemia} mg/dL
            </p>

            <p>
              <strong>Insulina ativa:</strong>
              ${evaluation.insulinaAtiva} U
            </p>

            <p>
              <strong>Treino:</strong>
              ${evaluation.tipoTreino}
            </p>
          </div>
        </details>
      `;

      historyList.appendChild(historyItem);
    });
}

export function renderStatistics(statisticsSection, statistics) {
  statisticsSection.innerHTML = `
    <h2>Resumo das avaliações</h2>

    <div class="statistics-card">
      <p>
        <strong>Total de avaliações:</strong>
        ${statistics.total}
      </p>

      <p>
        🟢 Liberado:
        ${statistics.percentualVerde}%
      </p>

      <p>
        🟠 Atenção:
        ${statistics.percentualLaranja}%
      </p>

      <p>
        🔴 Não iniciar:
        ${statistics.percentualVermelho}%
      </p>
    </div>
  `;
}

function createList(title, items, type) {
  if (!items || items.length === 0) {
    return "";
  }

  return `
    <section class="resultado-section">
      <h3>${title}</h3>

      <div class="resultado-items">
        ${items
          .map(
            (item) => `
              <div
                class="resultado-item resultado-item-${type}"
              >
                <span class="resultado-icon">
                  ${type === "motivo" ? "!" : "✓"}
                </span>

                <p>${item}</p>
              </div>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

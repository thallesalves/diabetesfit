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
              <strong>Última dose de insulina rápida:</strong>
              ${evaluation.insulinaAtiva} 
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
  if (statistics.total === 0) {
    statisticsSection.innerHTML = `
      <section class="statistics-card statistics-empty">
        <h2>Resumo das avaliações</h2>

        <p>
          As estatísticas aparecerão depois da primeira avaliação.
        </p>
      </section>
    `;

    return;
  }

  statisticsSection.innerHTML = `
    <section class="statistics-card">
      <div class="statistics-header">
        <div>
          <p class="statistics-label">
            Resumo
          </p>

          <h2>Últimas avaliações</h2>
        </div>

        <div class="statistics-total">
          <strong>${statistics.total}</strong>

          <span>
            ${statistics.total === 1 ? "avaliação" : "avaliações"}
          </span>
        </div>
      </div>

      <div class="statistics-list">
        <div class="statistics-item">
          <div class="statistics-item-header">
            <span class="statistics-name">
              <span class="statistics-dot statistics-dot-verde"></span>
              Treino liberado
            </span>

            <strong>
              ${statistics.percentualVerde}%
            </strong>
          </div>

          <p class="statistics-count">
            ${statistics.verdes}
            ${statistics.verdes === 1 ? "avaliação" : "avaliações"}
          </p>

          <div class="statistics-progress">
            <div
              class="statistics-progress-fill statistics-progress-verde"
              style="width: ${statistics.percentualVerde}%"
            ></div>
          </div>
        </div>

        <div class="statistics-item">
          <div class="statistics-item-header">
            <span class="statistics-name">
              <span class="statistics-dot statistics-dot-laranja"></span>
              Atenção
            </span>

            <strong>
              ${statistics.percentualLaranja}%
            </strong>
          </div>

          <p class="statistics-count">
            ${statistics.laranjas}
            ${statistics.laranjas === 1 ? "avaliação" : "avaliações"}
          </p>

          <div class="statistics-progress">
            <div
              class="statistics-progress-fill statistics-progress-laranja"
              style="width: ${statistics.percentualLaranja}%"
            ></div>
          </div>
        </div>

        <div class="statistics-item">
          <div class="statistics-item-header">
            <span class="statistics-name">
              <span class="statistics-dot statistics-dot-vermelho"></span>
              Não iniciar
            </span>

            <strong>
              ${statistics.percentualVermelho}%
            </strong>
          </div>

          <p class="statistics-count">
            ${statistics.vermelhos}
            ${statistics.vermelhos === 1 ? "avaliação" : "avaliações"}
          </p>

          <div class="statistics-progress">
            <div
              class="statistics-progress-fill statistics-progress-vermelho"
              style="width: ${statistics.percentualVermelho}%"
            ></div>
          </div>
        </div>
      </div>
    </section>
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

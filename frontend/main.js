// frontend/main.js

import { normalizeNumber, minutesSince } from "./modules/format.js";

import { validateInputs } from "./modules/validators.js";

import { evaluateSafety } from "./modules/evaluator.js";

import { calculateStatistics } from "./modules/statistics.js";

import {
  renderResult,
  renderErrors,
  hideResult,
  renderHistory,
  renderStatistics,
} from "./modules/ui.js";

import {
  saveLastEvaluation,
  getLastEvaluation,
  saveHistory,
  getHistory,
  clearHistory,
} from "./modules/storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAvaliacao");

  const resultadoBox = document.getElementById("resultado");

  const feedbackSection = document.getElementById("feedbackSection");

  const feedbackLink = document.getElementById("feedbackLink");

  const historyList = document.getElementById("historyList");

  const clearHistoryButton = document.getElementById("clearHistoryButton");

  const statisticsSection = document.getElementById("statisticsSection");

  function updateHistoryInterface() {
    const history = getHistory();

    renderHistory(historyList, history);

    const statistics = calculateStatistics(history);

    renderStatistics(statisticsSection, statistics);
  }

  const lastEvaluation = getLastEvaluation();

  if (lastEvaluation) {
    document.getElementById("glicemia").value = lastEvaluation.glicemiaStr;

    document.getElementById("insulina").value = lastEvaluation.insulinaStr;

    document.getElementById("horarioInsulina").value =
      lastEvaluation.horarioStr;

    document.getElementById("treino").value = lastEvaluation.tipoTreino;
  }

  updateHistoryInterface();

  clearHistoryButton.addEventListener("click", () => {
    const confirmClear = confirm(
      "Deseja realmente apagar todo o histórico de avaliações?",
    );

    if (!confirmClear) {
      return;
    }

    clearHistory();

    updateHistoryInterface();
  });

  feedbackLink.addEventListener("click", () => {
    // Analytics: records only that the feedback link was clicked.
    // No health or assessment data is sent.
    if (typeof gtag === "function") {
      gtag("event", "feedback_clicked");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const glicemiaStr = document.getElementById("glicemia").value;

    const insulinaStr = document.getElementById("insulina").value;

    const horarioStr = document.getElementById("horarioInsulina").value;

    const tipoTreino = document.getElementById("treino").value;

    saveLastEvaluation({
      glicemiaStr,
      insulinaStr,
      horarioStr,
      tipoTreino,
    });

    const validation = validateInputs({
      glicemiaStr,
      insulinaStr,
      horarioStr,
      tipoTreino,
    });

    if (!validation.valid) {
      hideResult(resultadoBox);

      renderErrors(resultadoBox, validation.errors);

      return;
    }

    const glicemia = normalizeNumber(glicemiaStr);

    const insulina = normalizeNumber(insulinaStr);

    const minutosDesdeAplicacao = minutesSince(horarioStr);

    const resultado = evaluateSafety({
      glicemia,
      insulinaAtiva: insulina,
      minutosDesdeAplicacao,
      tipoTreino,
    });

    saveHistory({
      data: new Date().toLocaleString("pt-BR"),
      glicemia,
      insulinaAtiva: insulina,
      tipoTreino,
      resultado: resultado.titulo,
      nivel: resultado.nivel,
    });

    updateHistoryInterface();

    renderResult(resultadoBox, resultado);

    // Analytics: records only that a valid assessment was completed.
    // No glucose, insulin, exercise, or clinical result data is sent.
    if (typeof gtag === "function") {
      gtag("event", "assessment_completed");
    }

    feedbackSection.classList.remove("oculto");
  });
});

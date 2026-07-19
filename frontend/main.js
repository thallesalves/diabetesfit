// frontend/main.js

import { normalizeNumber, minutesSince } from "./modules/format.js";

import { validateInputs } from "./modules/validators.js";

import { evaluateSafety } from "./modules/evaluator.js";

import {
  renderResult,
  renderErrors,
  hideResult,
  renderHistory,
} from "./modules/ui.js";

import {
  saveLastEvaluation,
  getLastEvaluation,
  saveHistory,
  getHistory,
} from "./modules/storage.js";

// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAvaliacao");
  const resultadoBox = document.getElementById("resultado");
  const historyList = document.getElementById("historyList");

  // Recupera a última avaliação salva
  const lastEvaluation = getLastEvaluation();

  // Preenche o formulário com os últimos dados salvos
  if (lastEvaluation) {
    document.getElementById("glicemia").value = lastEvaluation.glicemiaStr;

    document.getElementById("insulina").value = lastEvaluation.insulinaStr;

    document.getElementById("horarioInsulina").value =
      lastEvaluation.horarioStr;

    document.getElementById("treino").value = lastEvaluation.tipoTreino;
  }

  // Busca e mostra o histórico ao abrir a página
  renderHistory(historyList, getHistory());

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Coleta os valores digitados no formulário
    const glicemiaStr = document.getElementById("glicemia").value;

    const insulinaStr = document.getElementById("insulina").value;

    const horarioStr = document.getElementById("horarioInsulina").value;

    const tipoTreino = document.getElementById("treino").value;

    // Salva os dados para preencher o formulário novamente
    // quando a página for recarregada
    saveLastEvaluation({
      glicemiaStr,
      insulinaStr,
      horarioStr,
      tipoTreino,
    });

    // Valida os valores antes de realizar a avaliação
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

    // Converte os textos válidos para os formatos necessários
    const glicemia = normalizeNumber(glicemiaStr);
    const insulina = normalizeNumber(insulinaStr);
    const minutosDesdeAplicacao = minutesSince(horarioStr);

    // Executa as regras de avaliação
    const resultado = evaluateSafety({
      glicemia,
      insulinaAtiva: insulina,
      minutosDesdeAplicacao,
      tipoTreino,
    });

    // Salva a nova avaliação no histórico
    saveHistory({
      data: new Date().toLocaleString("pt-BR"),
      glicemia,
      insulinaAtiva: insulina,
      tipoTreino,
      resultado: resultado.titulo,
      nivel: resultado.nivel,
    });

    // Busca novamente o histórico atualizado
    // e o renderiza na tela
    renderHistory(historyList, getHistory());

    // Mostra o resultado atual
    renderResult(resultadoBox, resultado);
  });
});

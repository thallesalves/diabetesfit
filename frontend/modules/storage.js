// frontend/modules/storage.js
// Responsável por salvar e recuperar dados simples no localStorage.

const STORAGE_KEY = "diabetesfit:lastEvaluation";
const HISTORY_KEY = "diabetesfit:history";

export function saveLastEvaluation(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getLastEvaluation() {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (!storedData) {
    return null;
  }

  return JSON.parse(storedData);
}

export function clearLastEvaluation() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getHistory() {
  // Busca o histórico salvo no navegador.
  const storedHistory = localStorage.getItem(HISTORY_KEY);

  // Se ainda não existe histórico, retorna um array vazio.
  if (!storedHistory) {
    return [];
  }

  // Converte o texto salvo novamente em um array.
  return JSON.parse(storedHistory);
}

export function saveHistory(evaluation) {
  // Busca o histórico salvo.
  const history = getHistory();

  // Adiciona a nova avaliação no final do array.
  history.push(evaluation);

  // Salva novamente o array atualizado.
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
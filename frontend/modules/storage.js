const STORAGE_KEY = "diabetesfit:lastEvaluation";
const HISTORY_KEY = "diabetesfit:history";

// Última avaliação
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

// Histórico de avaliações
export function getHistory() {
  const storedHistory = localStorage.getItem(HISTORY_KEY);

  if (!storedHistory) {
    return [];
  }

  return JSON.parse(storedHistory);
}

export function saveHistory(evaluation) {
  const history = getHistory();

  history.push(evaluation);

  // Mantém apenas as 20 avaliações mais recentes.
  if (history.length > 20) {
    history.shift();
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

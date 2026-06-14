// frontend/modules/storage.js
// Responsável por salvar e recuperar dados simples no localStorage.

const STORAGE_KEY = "diabetesfit:lastEvaluation";

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
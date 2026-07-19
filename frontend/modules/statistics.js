// frontend/modules/statistics.js

// Calcula as estatísticas do histórico de avaliações.

export function calculateStatistics(history) {
  const total = history.length;

  if (total === 0) {
    return {
      total: 0,
      verdes: 0,
      laranjas: 0,
      vermelhos: 0,
      percentualVerde: 0,
      percentualLaranja: 0,
      percentualVermelho: 0,
    };
  }

  const verdes = history.filter(
    (evaluation) => evaluation.nivel === "verde",
  ).length;

  const laranjas = history.filter(
    (evaluation) => evaluation.nivel === "laranja",
  ).length;

  const vermelhos = history.filter(
    (evaluation) => evaluation.nivel === "vermelho",
  ).length;

  return {
    total,
    verdes,
    laranjas,
    vermelhos,

    percentualVerde: Math.round((verdes / total) * 100),

    percentualLaranja: Math.round((laranjas / total) * 100),

    percentualVermelho: Math.round((vermelhos / total) * 100),
  };
}

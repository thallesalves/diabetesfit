// modules/training.js
// Metadados do treino (domínio). Aqui a gente define "o que cada treino é".

const TRAINING_META = {
  musculacao: { categoria: "forca" },
  crossfit:   { categoria: "intenso" },
  corrida:    { categoria: "aerobico" },
  natacao:    { categoria: "aerobico" },
  ciclismo:   { categoria: "aerobico" },
};

export function getTrainingMeta(tipoTreino) {
  return TRAINING_META[tipoTreino] ?? null;
}

export function isAerobic(tipoTreino) {
  const meta = getTrainingMeta(tipoTreino);
  return meta?.categoria === "aerobico";
}

export function isIntense(tipoTreino) {
  const meta = getTrainingMeta(tipoTreino);
  return meta?.categoria === "intenso" || meta?.categoria === "forca";
}

// Valida os inputs do formulário de avaliação
// Retorna { valid: boolean, errors: string[] }

export function validateInputs({ glicemiaStr, insulinaStr, horarioStr, tipoTreino }) {
  const errors = [];

  // presença
  if (!glicemiaStr) errors.push("Informe a glicemia pré-treino.");
  if (!insulinaStr) errors.push("Informe a insulina rápida ativa (pode ser 0).");
  if (!tipoTreino) errors.push("Selecione o tipo de treino.");

  // formato numérico básico
  const glicemiaOk = /^[0-9]+([,.][0-9]+)?$/.test(glicemiaStr);
  const insulinaOk = /^[0-9]+([,.][0-9]+)?$/.test(insulinaStr);

  if (glicemiaStr && !glicemiaOk) errors.push("Glicemia em formato inválido.");
  if (insulinaStr && !insulinaOk) errors.push("Insulina em formato inválido.");

  // horário é opcional (pode estar vazio), mas se vier, precisa ser HH:MM
  if (horarioStr && !/^\d{2}:\d{2}$/.test(horarioStr)) {
    errors.push("Horário de aplicação deve estar no formato HH:MM.");
  }

  return { valid: errors.length === 0, errors };
}

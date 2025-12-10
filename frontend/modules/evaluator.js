/**
 * Entrada esperada:
 * {
 *   glicemia: number,
 *   insulinaAtiva: number,
 *   minutosDesdeAplicacao: number | NaN,
 *   tipoTreino: 'musculacao' | 'corrida' | 'natacao' | string
 * }
 */

export function evaluateSafety({ glicemia, insulinaAtiva, minutosDesdeAplicacao, tipoTreino }) {
  const notes = [];

  // --------- Regras base (placeholder) ---------
  // TODO (Talles): Ajustar faixas e condições reais com sua expertise.

  // 1) Glicemias críticas
  if (glicemia < 70) {
    notes.push("Glicemia < 70 mg/dL.");
    return makeResult("vermelho", "Não recomendado iniciar o treino.", notes);
  }
  if (glicemia >= 300) {
    notes.push("Glicemia ≥ 300 mg/dL.");
    return makeResult("vermelho", "Não recomendado iniciar o treino.", notes);
  }

  // 2) Faixa de atenção por baixa (70–89) com insulina ativa > 0
  if (glicemia >= 70 && glicemia < 90 && insulinaAtiva > 0) {
    notes.push("Glicemia baixa com insulina ativa.");
    return makeResult("laranja", "Atenção: risco de queda.", notes);
  }

  // 3) Considerar tempo desde aplicação (se conhecido)
  if (!Number.isNaN(minutosDesdeAplicacao)) {
    if (minutosDesdeAplicacao < 60 && insulinaAtiva > 0) {
      notes.push("Menos de 60 min desde a última aplicação com insulina ativa.");
      return makeResult("laranja", "Atenção: risco de hipoglicemia.", notes);
    }
  } else {
    notes.push("Horário da última aplicação não informado.");
  }

  // 4) Ajuste simples por tipo de treino (placeholder)
  if (tipoTreino === "corrida" && glicemia < 100) {
    notes.push("Treino aeróbio com glicemia < 100 mg/dL.");
    return makeResult("laranja", "Atenção para quedas rápidas em aeróbios.", notes);
  }

  // 5) Faixa segura provisória (90–180)
  if (glicemia >= 90 && glicemia <= 180) {
    notes.push("Faixa geral segura provisória (90–180 mg/dL).");
    return makeResult("verde", "Seguro para treinar.", notes);
  }

  // 6) Acima de 180 → atenção leve (placeholder)
  if (glicemia > 180 && glicemia < 300) {
    notes.push("Glicemia acima de 180 mg/dL (faixa de atenção).");
    return makeResult("laranja", "Atenção: avalie correções e hidratação.", notes);
  }

  // fallback (não deve cair aqui com as regras acima)
  return makeResult("laranja", "Atenção.", notes);
}

function makeResult(level, label, notes = []) {
  return { level, label, notes };
}

// 1) Constantes clínicas (limiares do MVP)
// No futuro, isso pode virar configuração por usuário

import { isAerobic } from "./training.js";

const LIMITES = {
  HIPO: 70,
  HIPER: 180,

  INSULINA_ALTA: 5,
  INSULINA_MEDIA: 3,
  INSULINA_BAIXA: 2,

  INSULINA_RECENTE_MIN: 120,
  INSULINA_MUITO_RECENTE_MIN: 15,
};

// 2) Função pública do módulo (motor de decisão)
export function evaluateSafety({
  glicemia,
  insulinaAtiva,
  minutosDesdeAplicacao,
  tipoTreino,
}) {
  const red = checkRedRules({
    glicemia,
    insulinaAtiva,
    minutosDesdeAplicacao,
    tipoTreino,
  });
  if (red) return red;

  const orange = checkOrangeRules({
    glicemia,
    insulinaAtiva,
    minutosDesdeAplicacao,
    tipoTreino,
  });
  if (orange) return orange;

  // Fallback verde (regra explícita)
  return buildResult({
    nivel: "verde",
    titulo: "Treino liberado",
    motivos: ["Nenhuma condição de risco detectada pelas regras atuais."],
    acoes: ["Inicie o treino e monitore conforme sua rotina habitual."],
  });
}

// -----------------------------
// 3) Regras Vermelhas
// -----------------------------
function checkRedRules({
  glicemia,
  insulinaAtiva,
  minutosDesdeAplicacao,
  tipoTreino,
}) {
  // Hipoglicemia absoluta
  if (glicemia < LIMITES.HIPO) {
    return buildResult({
      nivel: "vermelho",
      titulo: "Não iniciar o treino",
      motivos: ["Glicemia abaixo de 70 mg/dL."],
      acoes: [
        "Tratar hipoglicemia antes de qualquer atividade física.",
        "Reavaliar a glicemia antes de iniciar o treino.",
      ],
    });
  }

  // Insulina alta recente (risco elevado de hipoglicemia)
  if (
    insulinaAtiva > LIMITES.INSULINA_ALTA &&
    minutosDesdeAplicacao <= LIMITES.INSULINA_RECENTE_MIN
  ) {
    return buildResult({
      nivel: "vermelho",
      titulo: "Não iniciar o treino",
      motivos: ["Alta quantidade de insulina ativa aplicada recentemente."],
      acoes: [
        "Aguardar redução da insulina ativa antes do exercício.",
        "Monitorar glicemia com atenção.",
      ],
    });
  }

  // Hiperglicemia > 180 com exceções
  if (glicemia > LIMITES.HIPER) {
    const excecaoAerobico =
      isAerobic(tipoTreino) &&
      insulinaAtiva > 0 &&
      minutosDesdeAplicacao <= LIMITES.INSULINA_RECENTE_MIN;

    if (!excecaoAerobico) {
      return buildResult({
        nivel: "vermelho",
        titulo: "Não iniciar o treino",
        motivos: ["Glicemia acima de 180 mg/dL."],
        acoes: [
          "Corrigir a glicemia antes do exercício.",
          "Aguardar estabilização antes de treinar.",
        ],
      });
    }
  }

  return null;
}

// -----------------------------
// 4) Regras Laranja
// -----------------------------
function checkOrangeRules({
  glicemia,
  insulinaAtiva,
  minutosDesdeAplicacao,
  tipoTreino,
}) {
  const insulinaRecente = minutosDesdeAplicacao <= LIMITES.INSULINA_RECENTE_MIN;
  const insulinaMuitoRecente =
    minutosDesdeAplicacao <= LIMITES.INSULINA_MUITO_RECENTE_MIN;

  // O1) 70–85 para aeróbico, independente da insulina
  if (isAerobic(tipoTreino) && glicemia >= 70 && glicemia <= 85) {
    return buildResult({
      nivel: "laranja",
      titulo: "Atenção",
      motivos: ["Glicemia baixa para exercício aeróbico."],
      acoes: [
        "Considere ingestão de carboidrato antes do treino.",
        "Monitorar glicemia durante a atividade.",
      ],
    });
  }

  // O2) Aeróbico + insulina MUITO recente (até 15 min) com glicemia < 100
  // Ex.: glicemia 90, 2U, 15 min → NÃO pode ser verde
  if (
    isAerobic(tipoTreino) &&
    glicemia < 100 &&
    insulinaAtiva >= LIMITES.INSULINA_BAIXA &&
    insulinaMuitoRecente
  ) {
    return buildResult({
      nivel: "laranja",
      titulo: "Atenção",
      motivos: [
        "Insulina aplicada muito recentemente antes de exercício aeróbico com glicemia < 100.",
      ],
      acoes: [
        "Redobre a atenção para queda rápida.",
        "Tenha carboidrato disponível e monitore durante o treino.",
      ],
    });
  }

  // O3) Aeróbico + insulina recente >2U com glicemia < 100 (regra ampla que você definiu)
  if (
    isAerobic(tipoTreino) &&
    glicemia < 100 &&
    insulinaAtiva > LIMITES.INSULINA_BAIXA &&
    insulinaRecente
  ) {
    return buildResult({
      nivel: "laranja",
      titulo: "Atenção",
      motivos: [
        "Glicemia < 100 com insulina ativa recente em exercício aeróbico.",
      ],
      acoes: [
        "Avaliar ingestão de carboidrato antes do treino.",
        "Monitorar glicemia com mais frequência.",
      ],
    });
  }

  // O4) Qualquer treino + insulina recente >3U com glicemia 70–100
  if (
    glicemia >= 70 &&
    glicemia <= 100 &&
    insulinaAtiva > LIMITES.INSULINA_MEDIA &&
    insulinaRecente
  ) {
    return buildResult({
      nivel: "laranja",
      titulo: "Atenção",
      motivos: ["Glicemia 70–100 com insulina ativa recente elevada."],
      acoes: [
        "Avaliar ingestão de carboidrato.",
        "Monitorar glicemia com mais frequência.",
      ],
    });
  }

  return null;
}

// -----------------------------
// 5) Builder de resultado
// -----------------------------
function buildResult({ nivel, titulo, motivos, acoes }) {
  return { nivel, titulo, motivos, acoes };
}

// Export opcional (útil para testes futuros)
export { LIMITES };

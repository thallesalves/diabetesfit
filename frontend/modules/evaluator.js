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
    motivos: [
      "Alta quantidade de insulina ativa aplicada recentemente."
    ],
    acoes: [
      "Aguardar redução da insulina ativa antes do exercício.",
      "Monitorar glicemia com atenção."
    ]
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

  // 70–85 para aeróbico, independente da insulina
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

  // 70–100 com >3U recente (qualquer treino)
  if (
    isAerobic(tipoTreino) &&
    glicemia >= 70 &&
    glicemia <= 100 &&
    insulinaAtiva > LIMITES.INSULINA_BAIXA &&
    insulinaRecente
  ) {
    return buildResult({
      nivel: "laranja",
      titulo: "Atenção",
      motivos: ["Glicemia na faixa inferior com insulina ativa recente."],
      acoes: [
        "Avaliar ingestão de carboidrato.",
        "Monitorar glicemia com mais frequência.",
      ],
    });
  }

  // 70–100 com >2U recente para aeróbico
  if (
    tipoTreino === "corrida" &&
    glicemia >= 70 &&
    glicemia <= 100 &&
    insulinaAtiva > LIMITES.INSULINA_BAIXA &&
    insulinaRecente
  ) {
    return buildResult({
      nivel: "laranja",
      titulo: "Atenção",
      motivos: ["Risco aumentado de queda glicêmica em exercício aeróbico."],
      acoes: [
        "Considere ajustar estratégia antes de iniciar.",
        "Tenha carboidrato disponível durante o treino.",
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

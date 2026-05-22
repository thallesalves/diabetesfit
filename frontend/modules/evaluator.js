// frontend/modules/evaluator.js
// Motor de decisão clínica do DiabetesFit

import { isAerobic } from "./training.js";
import {
  createRedResult,
  createOrangeResult,
  createGreenResult,
} from "./resultFactory.js";

// 1) Constantes clínicas do MVP
// No futuro, isso pode virar configuração por usuário.
const LIMITES = {
  HIPO: 70,
  HIPER: 180,
  HIPER_ABSOLUTA: 200,

  INSULINA_ALTA: 5,
  INSULINA_MEDIA: 3,
  INSULINA_BAIXA: 2,

  INSULINA_RECENTE_MIN: 120,
  INSULINA_MUITO_RECENTE_MIN: 15,
};

// 2) Função pública do módulo
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

  return createGreenResult(
    "Treino liberado",
    ["Nenhuma condição de risco detectada pelas regras atuais."],
    ["Inicie o treino e monitore conforme sua rotina habitual."],
  );
}

// 3) Regras Vermelhas
function checkRedRules({
  glicemia,
  insulinaAtiva,
  minutosDesdeAplicacao,
  tipoTreino,
}) {
  // R001 — Hipoglicemia absoluta
  if (glicemia < LIMITES.HIPO) {
    return createRedResult(
      "Não iniciar o treino",
      ["Glicemia abaixo de 70 mg/dL."],
      [
        "Tratar hipoglicemia antes de qualquer atividade física.",
        "Reavaliar a glicemia antes de iniciar o treino.",
      ],
    );
  }

  // R002 — Alta quantidade de insulina ativa recente
  if (
    insulinaAtiva > LIMITES.INSULINA_ALTA &&
    minutosDesdeAplicacao <= LIMITES.INSULINA_RECENTE_MIN
  ) {
    return createRedResult(
      "Não iniciar o treino",
      ["Alta quantidade de insulina ativa aplicada recentemente."],
      [
        "Aguardar redução da insulina ativa antes do exercício.",
        "Monitorar glicemia com atenção.",
      ],
    );
  }

  // R003 — Hiperglicemia absoluta
  // Esta regra vem ANTES da exceção aeróbica.
  if (glicemia >= LIMITES.HIPER_ABSOLUTA) {
    return createRedResult(
      "Não iniciar o treino",
      ["Glicemia igual ou acima de 200 mg/dL."],
      [
        "Corrigir a glicemia antes do exercício.",
        "Aguardar estabilização antes de treinar.",
      ],
    );
  }

  // R004 — Hiperglicemia acima de 180 sem exceção segura
  if (glicemia > LIMITES.HIPER) {
    const temExcecaoAerobica =
      isAerobic(tipoTreino) &&
      insulinaAtiva > 0 &&
      minutosDesdeAplicacao <= LIMITES.INSULINA_RECENTE_MIN;

    if (!temExcecaoAerobica) {
      return createRedResult(
        "Não iniciar o treino",
        ["Glicemia acima de 180 mg/dL."],
        [
          "Corrigir a glicemia antes do exercício.",
          "Aguardar estabilização antes de treinar.",
        ],
      );
    }
  }

  return null;
}

// 4) Regras Laranja
function checkOrangeRules({
  glicemia,
  insulinaAtiva,
  minutosDesdeAplicacao,
  tipoTreino,
}) {
  const insulinaRecente = minutosDesdeAplicacao <= LIMITES.INSULINA_RECENTE_MIN;

  const insulinaMuitoRecente =
    minutosDesdeAplicacao <= LIMITES.INSULINA_MUITO_RECENTE_MIN;

  // R101 — Glicemia baixa para exercício aeróbico
  if (isAerobic(tipoTreino) && glicemia >= 70 && glicemia <= 85) {
    return createOrangeResult(
      "Atenção",
      ["Glicemia baixa para exercício aeróbico."],
      [
        "Considerar ingestão de carboidrato antes do treino.",
        "Monitorar glicemia durante a atividade.",
      ],
    );
  }

  // R102 — Insulina aplicada muito recentemente antes de exercício aeróbico
  if (isAerobic(tipoTreino) && insulinaAtiva > 0 && insulinaMuitoRecente) {
    return createOrangeResult(
      "Atenção",
      ["Insulina aplicada muito recentemente antes do exercício."],
      [
        "Monitorar glicemia com maior frequência.",
        "Considerar aguardar mais tempo antes de iniciar o treino.",
      ],
    );
  }

  // R103 — Glicemia abaixo de 100 com insulina ativa recente em exercício aeróbico
  if (
    isAerobic(tipoTreino) &&
    glicemia < 100 &&
    insulinaAtiva > LIMITES.INSULINA_BAIXA &&
    insulinaRecente
  ) {
    return createOrangeResult(
      "Atenção",
      [
        "Glicemia abaixo de 100 mg/dL com insulina ativa recente em exercício aeróbico.",
      ],
      [
        "Avaliar ingestão de carboidrato antes do treino.",
        "Monitorar glicemia com mais frequência.",
      ],
    );
  }

  // R104 — Glicemia baixa-normal com quantidade moderada de insulina recente
  if (
    glicemia >= 70 &&
    glicemia <= 100 &&
    insulinaAtiva > LIMITES.INSULINA_MEDIA &&
    insulinaRecente
  ) {
    return createOrangeResult(
      "Atenção",
      ["Glicemia 70–100 com insulina ativa recente elevada."],
      [
        "Avaliar ingestão de carboidrato.",
        "Monitorar glicemia com mais frequência.",
      ],
    );
  }

  return null;
}

export { LIMITES };

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

// 2) Ordem oficial das regras
const redRules = [
  checkHypoglycemia,
  checkHighActiveInsulin,
  checkAbsoluteHyperglycemia,
  checkHyperglycemiaWithoutSafeException,
];

const orangeRules = [
  checkLowGlucoseAerobic,
  checkVeryRecentInsulinAerobic,
  checkAerobicLowGlucoseWithRecentInsulin,
  checkModerateInsulinWithLowGlucose,
];

// 3) Função pública do módulo
export function evaluateSafety({
  glicemia,
  insulinaAtiva,
  minutosDesdeAplicacao,
  tipoTreino,
}) {
  const input = {
    glicemia,
    insulinaAtiva,
    minutosDesdeAplicacao,
    tipoTreino,
  };

  const red = runRules(redRules, input);
  if (red) return red;

  const orange = runRules(orangeRules, input);
  if (orange) return orange;

  return createGreenResult(
    "Treino liberado",
    ["Nenhuma condição de risco detectada pelas regras atuais."],
    ["Inicie o treino e monitore conforme sua rotina habitual."],
  );
}

// 4) Executor genérico de regras
function runRules(rules, input) {
  for (const rule of rules) {
    const result = rule(input);

    if (result) {
      return result;
    }
  }

  return null;
}

// 5) Regras Vermelhas

function checkHypoglycemia({ glicemia }) {
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

  return null;
}

function checkHighActiveInsulin({ insulinaAtiva, minutosDesdeAplicacao }) {
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

  return null;
}

function checkAbsoluteHyperglycemia({ glicemia }) {
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

  return null;
}

function checkHyperglycemiaWithoutSafeException({
  glicemia,
  insulinaAtiva,
  minutosDesdeAplicacao,
  tipoTreino,
}) {
  if (glicemia <= LIMITES.HIPER) {
    return null;
  }

  const temExcecaoAerobica =
    isAerobic(tipoTreino) &&
    insulinaAtiva > 0 &&
    minutosDesdeAplicacao <= LIMITES.INSULINA_RECENTE_MIN;

  if (temExcecaoAerobica) {
    return null;
  }

  return createRedResult(
    "Não iniciar o treino",
    ["Glicemia acima de 180 mg/dL."],
    [
      "Corrigir a glicemia antes do exercício.",
      "Aguardar estabilização antes de treinar.",
    ],
  );
}

// 6) Regras Laranja

function checkLowGlucoseAerobic({ glicemia, tipoTreino }) {
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

  return null;
}

function checkVeryRecentInsulinAerobic({
  insulinaAtiva,
  minutosDesdeAplicacao,
  tipoTreino,
}) {
  if (
    isAerobic(tipoTreino) &&
    insulinaAtiva > 0 &&
    minutosDesdeAplicacao <= LIMITES.INSULINA_MUITO_RECENTE_MIN
  ) {
    return createOrangeResult(
      "Atenção",
      ["Insulina aplicada muito recentemente antes do exercício."],
      [
        "Monitorar glicemia com maior frequência.",
        "Considerar aguardar mais tempo antes de iniciar o treino.",
      ],
    );
  }

  return null;
}

function checkAerobicLowGlucoseWithRecentInsulin({
  glicemia,
  insulinaAtiva,
  minutosDesdeAplicacao,
  tipoTreino,
}) {
  const insulinaRecente = minutosDesdeAplicacao <= LIMITES.INSULINA_RECENTE_MIN;

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

  return null;
}

function checkModerateInsulinWithLowGlucose({
  glicemia,
  insulinaAtiva,
  minutosDesdeAplicacao,
}) {
  const insulinaRecente = minutosDesdeAplicacao <= LIMITES.INSULINA_RECENTE_MIN;

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

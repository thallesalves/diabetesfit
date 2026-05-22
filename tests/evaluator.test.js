import { describe, it, expect } from "vitest";
import { evaluateSafety } from "../frontend/modules/evaluator.js";

describe("evaluateSafety", () => {
  it("deve retornar vermelho quando a glicemia estiver abaixo de 70", () => {
    const resultado = evaluateSafety({
      glicemia: 69,
      insulinaAtiva: 0,
      minutosDesdeAplicacao: 999,
      tipoTreino: "musculacao",
    });

    expect(resultado.nivel).toBe("vermelho");
  });

  it("deve retornar vermelho quando houver insulina alta recente", () => {
    const resultado = evaluateSafety({
      glicemia: 120,
      insulinaAtiva: 6,
      minutosDesdeAplicacao: 60,
      tipoTreino: "corrida",
    });

    expect(resultado.nivel).toBe("vermelho");
  });

  it("deve retornar vermelho quando a glicemia estiver em 201", () => {
    const resultado = evaluateSafety({
      glicemia: 201,
      insulinaAtiva: 0,
      minutosDesdeAplicacao: 999,
      tipoTreino: "corrida",
    });

    expect(resultado.nivel).toBe("vermelho");
  });

  it("deve retornar vermelho em hiperglicemia sem exceção", () => {
    const resultado = evaluateSafety({
      glicemia: 190,
      insulinaAtiva: 0,
      minutosDesdeAplicacao: 999,
      tipoTreino: "musculacao",
    });

    expect(resultado.nivel).toBe("vermelho");
  });

  it("deve retornar laranja para aeróbico com glicemia baixa", () => {
    const resultado = evaluateSafety({
      glicemia: 80,
      insulinaAtiva: 0,
      minutosDesdeAplicacao: 999,
      tipoTreino: "corrida",
    });

    expect(resultado.nivel).toBe("laranja");
  });

  it("deve retornar laranja para aeróbico com insulina muito recente", () => {
    const resultado = evaluateSafety({
      glicemia: 90,
      insulinaAtiva: 2,
      minutosDesdeAplicacao: 15,
      tipoTreino: "corrida",
    });

    expect(resultado.nivel).toBe("laranja");
  });

  it("deve retornar laranja para aeróbico com insulina recente acima de 2U", () => {
    const resultado = evaluateSafety({
      glicemia: 95,
      insulinaAtiva: 2.5,
      minutosDesdeAplicacao: 60,
      tipoTreino: "natacao",
    });

    expect(resultado.nivel).toBe("laranja");
  });

  it("deve retornar laranja para qualquer treino com insulina recente acima de 3U", () => {
    const resultado = evaluateSafety({
      glicemia: 90,
      insulinaAtiva: 4,
      minutosDesdeAplicacao: 60,
      tipoTreino: "musculacao",
    });

    expect(resultado.nivel).toBe("laranja");
  });

  it("deve retornar verde para força com glicemia boa e sem insulina ativa", () => {
    const resultado = evaluateSafety({
      glicemia: 140,
      insulinaAtiva: 0,
      minutosDesdeAplicacao: 999,
      tipoTreino: "musculacao",
    });

    expect(resultado.nivel).toBe("verde");
  });

  it("deve retornar verde para aeróbico sem risco relevante", () => {
    const resultado = evaluateSafety({
      glicemia: 120,
      insulinaAtiva: 1,
      minutosDesdeAplicacao: 180,
      tipoTreino: "ciclismo",
    });

    expect(resultado.nivel).toBe("verde");
  });
});

it("70 mg/dL não deve ser vermelho", () => {
  const resultado = evaluateSafety({
    glicemia: 70,
    insulinaAtiva: 0,
    minutosDesdeAplicacao: 999,
    tipoTreino: "musculacao",
  });

  expect(resultado.nivel).not.toBe("vermelho");
});

it("85 mg/dL em aeróbico deve ser laranja", () => {
  const resultado = evaluateSafety({
    glicemia: 85,
    insulinaAtiva: 0,
    minutosDesdeAplicacao: 999,
    tipoTreino: "corrida",
  });

  expect(resultado.nivel).toBe("laranja");
});

it("86 mg/dL em aeróbico sem insulina não deve ser laranja", () => {
  const resultado = evaluateSafety({
    glicemia: 86,
    insulinaAtiva: 0,
    minutosDesdeAplicacao: 999,
    tipoTreino: "corrida",
  });

  expect(resultado.nivel).not.toBe("laranja");
});

it("100 mg/dL com 2U em aeróbico não deve ativar regra >2U", () => {
  const resultado = evaluateSafety({
    glicemia: 100,
    insulinaAtiva: 2,
    minutosDesdeAplicacao: 60,
    tipoTreino: "corrida",
  });

  expect(resultado.nivel).not.toBe("laranja");
});

it("180 mg/dL não deve ser vermelho", () => {
  const resultado = evaluateSafety({
    glicemia: 180,
    insulinaAtiva: 0,
    minutosDesdeAplicacao: 999,
    tipoTreino: "musculacao",
  });

  expect(resultado.nivel).not.toBe("vermelho");
});

it("200 mg/dL deve ser vermelho absoluto", () => {
  const resultado = evaluateSafety({
    glicemia: 200,
    insulinaAtiva: 2,
    minutosDesdeAplicacao: 30,
    tipoTreino: "corrida",
  });

  expect(resultado.nivel).toBe("vermelho");
});

it("120 minutos ainda conta como insulina recente", () => {
  const resultado = evaluateSafety({
    glicemia: 90,
    insulinaAtiva: 4,
    minutosDesdeAplicacao: 120,
    tipoTreino: "musculacao",
  });

  expect(resultado.nivel).toBe("laranja");
});

it("121 minutos não deve contar como insulina recente", () => {
  const resultado = evaluateSafety({
    glicemia: 90,
    insulinaAtiva: 4,
    minutosDesdeAplicacao: 121,
    tipoTreino: "musculacao",
  });

  expect(resultado.nivel).not.toBe("laranja");
});

it("15 minutos deve ativar regra de insulina muito recente", () => {
  const resultado = evaluateSafety({
    glicemia: 120,
    insulinaAtiva: 1,
    minutosDesdeAplicacao: 15,
    tipoTreino: "corrida",
  });

  expect(resultado.nivel).toBe("laranja");
});

it("16 minutos não deve ativar regra de 15 minutos", () => {
  const resultado = evaluateSafety({
    glicemia: 120,
    insulinaAtiva: 1,
    minutosDesdeAplicacao: 16,
    tipoTreino: "corrida",
  });

  expect(resultado.nivel).not.toBe("laranja");
});
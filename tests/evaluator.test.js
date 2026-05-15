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
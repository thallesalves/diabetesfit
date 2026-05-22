export function createRedResult(titulo, motivos, acoes) {
  return {
    nivel: "vermelho",
    titulo,
    motivos,
    acoes,
  };
}

export function createOrangeResult(titulo, motivos, acoes) {
  return {
    nivel: "laranja",
    titulo,
    motivos,
    acoes,
  };
}

export function createGreenResult(titulo, motivos, acoes) {
  return {
    nivel: "verde",
    titulo,
    motivos,
    acoes,
  };
}
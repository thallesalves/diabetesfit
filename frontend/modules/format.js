
// Converte string numérica com vírgula ou pontos em número
// "120" | "120,5" → 120 | 120.5
// Se inválido: retorna NaN
export function normalizeNumber(str) {
  if (typeof str !== "string") return NaN;
  const cleaned = str.replace(",", ".").replace(/[^\d.]/g, "");
  return Number(cleaned);
}


// Recebe "HH:MM" (24h) e calcula quantos minutos se passaram
// desde esse horário até agora, considerando virada de dia.
// Se vazio/ inválido: retorna NaN.
 
export function minutesSince(hhmm) {
  if (!hhmm || typeof hhmm !== "string") return NaN;

  const [hStr, mStr] = hhmm.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return NaN;

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const givenMin = h * 60 + m;

  // se deu “volta no relógio” (aplicou 23:40 e agora 00:10)
  const diff = nowMin - givenMin;
  return diff >= 0 ? diff : diff + 24 * 60;
}

# Regras Clínicas — DiabetesFit

Este documento define oficialmente as regras clínicas utilizadas pelo motor de avaliação de segurança do DiabetesFit.

As regras aqui descritas representam a fonte de verdade do sistema.
O evaluator.js deve apenas implementar estas regras.

---

# Regras Vermelhas

## R001 — Hipoglicemia absoluta

Prioridade: Vermelho

Condição:
- glicemia < 70 mg/dL

Resultado:
- vermelho

Título:
- Não iniciar o treino

Motivos:
- Glicemia abaixo de 70 mg/dL.

Ações:
- Tratar hipoglicemia antes de qualquer atividade física.
- Reavaliar glicemia antes de iniciar o treino.

Justificativa:
- Existe risco imediato de hipoglicemia durante o exercício.

---

## R002 — Alta quantidade de insulina ativa recente

Prioridade: Vermelho

Condição:
- insulina ativa > 5U
- aplicação há menos de 120 minutos

Resultado:
- vermelho

Título:
- Não iniciar o treino

Motivos:
- Alta quantidade de insulina ativa aplicada recentemente.

Ações:
- Aguardar redução da insulina ativa antes do exercício.
- Monitorar glicemia com atenção.

Justificativa:
- Grande quantidade de insulina ativa aumenta significativamente o risco de hipoglicemia durante o exercício.

---

## R003 — Hiperglicemia elevada sem exceção segura

Prioridade: Vermelho

Condição:
- glicemia > 180 mg/dL
- NÃO existir exceção aeróbica segura

Resultado:
- vermelho

Título:
- Não iniciar o treino

Motivos:
- Glicemia acima de 180 mg/dL.

Ações:
- Corrigir glicemia antes do exercício.
- Aguardar estabilização antes de treinar.

Justificativa:
- Exercício em hiperglicemia elevada pode aumentar ainda mais a glicose dependendo do contexto fisiológico.

---

## Exceção E001 — Exceção aeróbica segura

Condição:
- exercício aeróbico
- insulina ativa > 0
- aplicação há menos de 120 minutos

Efeito:
- bloqueia R003

Justificativa:
- Exercícios aeróbicos tendem a reduzir glicemia quando existe insulina ativa recente.


# Regras Laranja

## R101 — Glicemia baixa para exercício aeróbico

Prioridade: Laranja

Condição:
- exercício aeróbico
- glicemia entre 70 e 85 mg/dL

Resultado:
- laranja

Título:
- Atenção

Motivos:
- Glicemia baixa para exercício aeróbico.

Ações:
- Considerar ingestão de carboidrato antes do treino.
- Monitorar glicemia durante a atividade.

Justificativa:
- Exercícios aeróbicos aumentam risco de queda glicêmica quando iniciados em glicemias mais baixas.

---

## R102 — Glicemia abaixo de 100 com insulina ativa recente em exercício aeróbico

Prioridade: Laranja

Condição:
- exercício aeróbico
- glicemia < 100 mg/dL
- insulina ativa > 2U
- aplicação há menos de 120 minutos

Resultado:
- laranja

Título:
- Atenção

Motivos:
- Risco aumentado de queda glicêmica em exercício aeróbico.

Ações:
- Considerar ajuste de estratégia antes do treino.
- Ter carboidrato disponível durante a atividade.

Justificativa:
- Exercícios aeróbicos associados a insulina ativa recente aumentam significativamente a chance de hipoglicemia.

---

## R103 — Insulina aplicada muito recentemente antes de exercício aeróbico

Prioridade: Laranja

Condição:
- exercício aeróbico
- insulina ativa > 0U
- aplicação há menos de 15 minutos

Resultado:
- laranja

Título:
- Atenção

Motivos:
- Insulina aplicada muito recentemente antes do exercício.

Ações:
- Monitorar glicemia com maior frequência.
- Considerar aguardar mais tempo antes de iniciar o treino.

Justificativa:
- O início do pico de ação da insulina pode coincidir com o exercício, aumentando imprevisibilidade glicêmica.

---

## R104 — Glicemia baixa com quantidade moderada de insulina recente

Prioridade: Laranja

Condição:
- glicemia entre 70 e 100 mg/dL
- insulina ativa > 3U
- aplicação há menos de 120 minutos

Resultado:
- laranja

Título:
- Atenção

Motivos:
- Glicemia na faixa inferior com insulina ativa recente.

Ações:
- Avaliar ingestão de carboidrato antes do treino.
- Monitorar glicemia com mais frequência.

Justificativa:
- A combinação de glicemia baixa-normal com insulina ativa recente aumenta o risco de hipoglicemia durante exercício.

# Prioridade das Regras

As regras do DiabetesFit devem ser avaliadas em ordem de prioridade.

A primeira regra satisfeita encerra a avaliação e define o resultado final.

A prioridade oficial do sistema é:

---

## 1. Regras Vermelhas

As regras vermelhas possuem prioridade máxima.

Se qualquer regra vermelha for satisfeita:
- a avaliação termina imediatamente
- o resultado final será vermelho

Exemplo:
- glicemia < 70
- insulina > 5U recente
- glicemia > 200

---

## 2. Regras Laranja

As regras laranja só devem ser avaliadas se nenhuma regra vermelha tiver sido satisfeita.

A primeira regra laranja satisfeita encerra a avaliação.

---

## 3. Verde (fallback)

O resultado verde só deve ocorrer quando:
- nenhuma regra vermelha foi satisfeita
- nenhuma regra laranja foi satisfeita

O verde representa ausência de condições de risco identificadas pelas regras atuais do sistema.

---

# Estratégia Atual de Implementação

A implementação atual utiliza:

- avaliação sequencial
- primeira regra satisfeita vence
- retorno imediato (`return`) ao encontrar uma condição válida

Estratégia utilizada no evaluator.js:

```js
if (regraVermelha) return vermelho;

if (regraLaranja) return laranja;

return verde;
```

---

# Observações Arquiteturais Futuras

No futuro, o sistema poderá evoluir para:

- múltiplos alertas simultâneos
- score de risco
- acúmulo de motivos
- pesos diferentes por tipo de exercício
- personalização por perfil do usuário
- sistema baseado em engine de regras configurável

A versão atual prioriza:
- simplicidade
- previsibilidade
- legibilidade
- baixo risco de ambiguidades
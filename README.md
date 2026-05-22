# DiabetesFit — Avaliador de Segurança para Exercício e Diabetes

## Visão Geral

O **DiabetesFit** é um aplicativo web desenvolvido para avaliar, de forma simples e rápida, se é seguro iniciar um treino com base em fatores glicêmicos e no contexto da insulina ativa.

O sistema funciona como uma calculadora inteligente de segurança para exercício físico em pessoas com diabetes.

O usuário informa:
- glicemia pré-treino;
- quantidade de insulina rápida ativa;
- horário da última aplicação;
- tipo de exercício.

Com base nessas informações, o sistema retorna um nível de segurança:

🟢 Verde → treino liberado  
🟠 Laranja → atenção / risco moderado  
🔴 Vermelho → não recomendado iniciar o treino  

---

# Objetivos do Projeto

O projeto foi criado com foco em:
- aprendizado prático de Engenharia de Software;
- arquitetura frontend modular;
- modelagem UML;
- implementação de regras de negócio reais;
- testes automatizados;
- construção incremental de software.

---

# Funcionalidades Implementadas

## Avaliação clínica
- cálculo automático do nível de segurança;
- regras clínicas organizadas por prioridade;
- diferenciação entre exercícios aeróbicos e não aeróbicos;
- tratamento de exceções clínicas.

---

## Interface
- formulário responsivo;
- feedback visual moderno;
- cards contextuais por nível de risco;
- renderização dinâmica via JavaScript.

---

## Arquitetura
- ES Modules;
- separação de responsabilidades;
- módulos independentes;
- baixo acoplamento;
- alta coesão.

---

## Testes Automatizados
- Vitest configurado;
- testes unitários do evaluator;
- testes de casos de fronteira;
- testes de regressão clínica.

---

# Estrutura do Projeto

```txt
diabetesfit/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── main.js
│   │
│   └── modules/
│       ├── evaluator.js
│       ├── format.js
│       ├── training.js
│       ├── ui.js
│       └── validators.js
│
├── tests/
│   └── evaluator.test.js
│
├── docs/
│   ├── regras-clinicas.md
│   │
│   └── modelagem/
│       ├── diagramacasousodiabetesfit.png
│       ├── diagramadeclassesdiabetesfit.png
│       ├── diagramadesequenciadiabetesfit.png
│       ├── diagramadeatividadediabetesfit.png
│       └── diagramadeestadosdiabetesfit.png
│
├── package.json
├── package-lock.json
└── README.md
```

---

# Tecnologias Utilizadas

## Frontend
- HTML5
- CSS3
- JavaScript ES Modules

## Testes
- Vitest

## Ferramentas
- VSCode
- Git
- GitHub
- Visual Paradigm

---

# Arquitetura da Aplicação

O projeto segue uma arquitetura modular.

Cada módulo possui uma responsabilidade específica.

| Arquivo | Responsabilidade |
|---|---|
| `main.js` | Orquestra o fluxo principal |
| `validators.js` | Validação dos inputs |
| `format.js` | Normalização de números e horários |
| `training.js` | Classificação de exercícios |
| `evaluator.js` | Motor de regras clínicas |
| `ui.js` | Renderização visual |
| `evaluator.test.js` | Testes automatizados |

---

# Regras Clínicas

As regras clínicas oficiais do sistema estão documentadas em:

```txt
docs/regras-clinicas.md
```

O documento define:
- regras vermelhas;
- regras laranja;
- regras verdes;
- prioridades;
- exceções;
- justificativas clínicas;
- comportamento oficial do evaluator.

---

# Regras Implementadas Atualmente

## Vermelho
- glicemia < 70 mg/dL;
- insulina ativa > 5U recente;
- glicemia ≥ 200 mg/dL;
- glicemia > 180 mg/dL sem exceção segura.

---

## Laranja
- glicemia baixa em aeróbico;
- exercício aeróbico com insulina muito recente;
- glicemia < 100 com insulina recente em aeróbico;
- glicemia 70–100 com insulina elevada recente.

---

## Verde
- fallback padrão quando nenhuma condição de risco é detectada.

---

# Sistema de Prioridade

O evaluator utiliza prioridade sequencial:

1. Regras vermelhas
2. Regras laranja
3. Verde (fallback)

A primeira regra satisfeita encerra a avaliação.

---

# Testes Automatizados

O projeto possui testes automatizados utilizando Vitest.

## Cobertura atual
- regras vermelhas;
- regras laranja;
- regras verdes;
- exceções;
- conflitos;
- casos de fronteira.

---

## Casos de fronteira testados
- 70 mg/dL
- 85 mg/dL
- 100 mg/dL
- 180 mg/dL
- 200 mg/dL
- 15 minutos
- 120 minutos

---

## Estado atual dos testes
✅ 20 testes automatizados passando

---

# Modelagem UML

O projeto possui modelagem UML completa:

- Diagrama de Caso de Uso
- Diagrama de Classes
- Diagrama de Sequência
- Diagrama de Atividades
- Diagrama de Estados

Localizados em:

```txt
docs/modelagem/
```

---

# Conceitos de Engenharia de Software Aplicados

- separação de responsabilidades;
- modularização;
- orientação a objetos;
- baixo acoplamento;
- alta coesão;
- documentação técnica;
- testes automatizados;
- arquitetura escalável;
- refatoração incremental;
- desenvolvimento guiado por regras.

---

# Estado Atual do Projeto

## Versão atual
**v0.7 — MVP funcional com regras clínicas e testes automatizados**

O sistema atualmente possui:
- frontend funcional;
- regras clínicas implementadas;
- arquitetura modular;
- testes automatizados;
- documentação técnica;
- UI moderna e responsiva.

---

# Próximas Evoluções

## Regras clínicas
- tendência glicêmica;
- refeições pré-treino;
- intensidade do exercício;
- cetonas;
- perfil individual do usuário.

---

## Arquitetura
- engine configurável de regras;
- score de risco;
- múltiplos alertas simultâneos;
- histórico local;
- persistência futura.

---

## Interface
- microinterações;
- animações;
- feedback em tempo real;
- PWA/mobile app.

---

# Autor

## Talles Alves
Profissional de Educação Física e estudante de Engenharia de Software.

- GitHub:
https://github.com/tallesalves

- LinkedIn:
https://www.linkedin.com/in/tallesalves/
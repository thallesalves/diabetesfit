# 🩺 DiabetesFit

> **Uma aplicação web desenvolvida para apoiar a tomada de decisão antes do exercício físico em pessoas com diabetes, utilizando regras clínicas implementadas em JavaScript.**

<p align="center">

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white">
<img src="https://img.shields.io/badge/Responsive-✔-22c55e?style=for-the-badge">
<img src="https://img.shields.io/badge/20_Testes-Passando-success?style=for-the-badge">
<img src="https://img.shields.io/badge/MVP-Concluído-2563EB?style=for-the-badge">

</p>

---

# 📖 Sobre o projeto

O **DiabetesFit** é uma aplicação web desenvolvida para aplicar conceitos de Engenharia de Software na resolução de um problema real da área da saúde.

Seu objetivo é auxiliar pessoas com diabetes na decisão sobre iniciar ou não um exercício físico, considerando fatores relacionados à glicemia, insulina ativa e tipo de exercício.

A aplicação funciona como uma **calculadora inteligente de segurança pré-treino**, aplicando regras clínicas para fornecer recomendações simples, objetivas e fáceis de interpretar.

Além da avaliação, o sistema registra o histórico das análises realizadas e apresenta estatísticas resumidas para facilitar o acompanhamento dos resultados.

---

# ✨ Funcionalidades

## 🩺 Avaliação Clínica

- Avaliação automática baseada em regras clínicas.
- Diferenciação entre exercícios aeróbicos e não aeróbicos.
- Priorização dos níveis de risco.
- Tratamento de exceções clínicas.
- Explicação do resultado apresentado.

---

## 📊 Histórico e Estatísticas

- Histórico persistente das avaliações.
- Armazenamento das últimas 20 avaliações.
- Estatísticas em tempo real.
- Percentual de avaliações por categoria.
- Barras de progresso.
- Restauração automática da última avaliação.

---

## 🎨 Interface

- Interface moderna e responsiva.
- Feedback visual por níveis de risco.
- Histórico expansível.
- Microinterações.
- Animações suaves.

---

## ✅ Qualidade do Código

- Arquitetura modular.
- Separação de responsabilidades.
- Código reutilizável.
- Testes automatizados.
- Fácil manutenção e expansão.

---

# 🛠️ Tecnologias

### Frontend

- HTML5
- CSS3
- JavaScript (ES Modules)

### Persistência

- LocalStorage

### Testes

- Vitest

### Ferramentas

- Git
- GitHub
- Visual Studio Code
- Visual Paradigm

---

# 🏛️ Arquitetura da Solução

A aplicação foi desenvolvida utilizando uma arquitetura modular baseada em responsabilidades.

```text
                Usuário
                    │
                    ▼
             main.js (Controller)
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
validators     evaluator      storage
                                   │
                                   ▼
                              statistics
                                   │
                                   ▼
                                   ui
```

Cada módulo possui apenas uma responsabilidade, reduzindo o acoplamento e facilitando a manutenção do sistema.

---

# 📁 Estrutura do Projeto

```text
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
│       ├── resultFactory.js
│       ├── statistics.js
│       ├── storage.js
│       ├── training.js
│       ├── ui.js
│       └── validators.js
│
├── tests/
│   └── evaluator.test.js
│
├── docs/
│   ├── regras-clinicas.md
│   └── modelagem/
│
├── package.json
├── package-lock.json
└── README.md
```

---

# 💡 Decisões de Projeto

Durante o desenvolvimento foram adotadas decisões arquiteturais para tornar o projeto organizado, escalável e de fácil manutenção.

### ES Modules

O código foi dividido em módulos independentes, facilitando a reutilização e a manutenção.

### Separação de responsabilidades

Cada módulo possui uma única responsabilidade.

| Arquivo | Responsabilidade |
|----------|------------------|
| `main.js` | Coordena toda a aplicação |
| `evaluator.js` | Motor de regras clínicas |
| `validators.js` | Validação dos dados |
| `format.js` | Conversões e normalização |
| `training.js` | Classificação dos exercícios |
| `storage.js` | Persistência em LocalStorage |
| `statistics.js` | Estatísticas das avaliações |
| `resultFactory.js` | Padronização dos resultados |
| `ui.js` | Renderização da interface |

### LocalStorage

Foi utilizado para persistir:

- Histórico das avaliações;
- Última avaliação realizada.

Sem necessidade de backend.

### HTML semântico

O histórico utiliza o elemento `<details>` para expandir informações, reduzindo JavaScript desnecessário e melhorando a acessibilidade.

### Atualização centralizada da interface

Toda atualização do histórico e das estatísticas acontece através da função `updateHistoryInterface()`, reduzindo duplicação de código.

---

# 🧪 Testes

O projeto utiliza **Vitest** para validar as regras clínicas implementadas.

Atualmente possui:

- ✅ 20 testes automatizados;
- Casos de fronteira;
- Regras de prioridade;
- Testes de regressão;
- Exceções clínicas;
- Cenários de conflito.

Para executar:

```bash
npm test
```

---

# 🚀 Como executar

Clone o repositório:

```bash
git clone https://github.com/tallesalves/diabetesfit.git
```

Entre na pasta:

```bash
cd diabetesfit
```

Instale as dependências:

```bash
npm install
```

Execute os testes:

```bash
npm test
```

Abra o arquivo:

```text
frontend/index.html
```

em qualquer navegador moderno.

---

# 📚 Documentação

O projeto possui documentação complementar em `docs/`, incluindo:

- Regras clínicas;
- Diagrama de Caso de Uso;
- Diagrama de Classes;
- Diagrama de Sequência;
- Diagrama de Atividades;
- Diagrama de Estados.

---

# 🎓 Aprendizados

Este projeto foi desenvolvido para consolidar conhecimentos em Engenharia de Software através da construção de uma aplicação completa baseada em um problema real da área da saúde.

Durante seu desenvolvimento foram aplicados conceitos de:

- Arquitetura modular;
- Separação de responsabilidades;
- HTML semântico;
- CSS responsivo;
- JavaScript moderno (ES Modules);
- Organização de código;
- Testes automatizados;
- Refatoração incremental;
- Modelagem UML;
- Desenvolvimento orientado por regras de negócio;
- Documentação técnica.

---

# 🛣️ Roadmap

Próximas evoluções planejadas:

- Tendência glicêmica;
- Intensidade do exercício;
- Refeição pré-treino;
- Perfil individual do usuário;
- Cetonas;
- Engine configurável de regras;
- Progressive Web App (PWA);
- Backend para autenticação;
- Persistência em banco de dados.

---

# 📄 Licença

Este projeto está licenciado sob a licença **MIT**.

---

# 👨‍💻 Autor

## Talles Alves

Profissional de Educação Física especializado em exercício para pessoas com diabetes e estudante de Engenharia de Software.

- **GitHub:** https://github.com/tallesalves
- **LinkedIn:** https://www.linkedin.com/in/tallesalves

---

<p align ="center">

Desenvolvido para aplicar conceitos de Engenharia de Software na construção de uma solução web voltada à segurança do exercício físico para pessoas com diabetes.

</p>
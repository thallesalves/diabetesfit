# DiabetesFit – Definição de Requisitos

## Visão Geral
O DiabetesFit é um aplicativo web simples que coleta informações do usuário sobre:
- Glicemia pré-exercício
- Tipo de exercício
- Quantidade de insulina rápida ativa

Com base nesses dados, o sistema devolve um **sinal (verde, laranja ou vermelho)** indicando se é seguro iniciar o treino.

---

## Requisitos Funcionais (RF)
- **RF01 – Inserir glicemia pré-exercício**  
  O usuário deve informar manualmente sua glicemia antes do treino.  
  **Prioridade:** Obrigatório  

- **RF02 – Informar tipo de exercício**  
  O usuário deve selecionar entre opções pré-definidas de tipo de exercício (ex: musculação, corrida, natação).  
  **Prioridade:** Obrigatório  

- **RF02 – Inserir o horário de aplicação da insulina rápida**  
  O usuário deve informar o horário de aplicação da última dose de insulina rápida.  
  **Prioridade:** Obrigatório

- **RF03 – Inserir quantidade de insulina rápida ativa**  
  O usuário deve informar a quantidade de insulina rápida que está ativa no corpo.  
  **Prioridade:** Obrigatório  


- **RF05 – Exibir resultado em cores**  
  O sistema deve calcular e exibir ao usuário um sinal:  
  - Verde: seguro para treinar  
  - Laranja: atenção, possível risco  
  - Vermelho: não recomendado iniciar treino  
  **Prioridade:** Obrigatório  

---

##  Requisitos Não Funcionais (RNF)
- **RNF01 – Compatibilidade com navegadores modernos**  
  O sistema deve funcionar corretamente em Chrome, Firefox e Edge.  

- **RNF02 – Interface simples e responsiva**  
  O design deve ser intuitivo e adaptado para celular e desktop.  

- **RNF03 – Não salvar dados**  
  A versão inicial não deve persistir informações em banco de dados.  

---

##  Próximos Passos
1. Validar os requisitos funcionais e não funcionais.  
2. Criar o **Diagrama de Caso de Uso (UML)**.  
3. Prototipar a interface simples em HTML.  
4. Implementar as regras em JavaScript.  

---

## Diagrama de Caso de Uso (UML)

O diagrama abaixo representa as interações principais do usuário com o sistema DiabetesFit e as dependências funcionais entre os casos de uso.

![Diagrama de Caso de Uso](diagramas\diagrama-caso-uso-diabetesfit.png)

## Descrição
- **Ator:** Usuário (pessoa com diabetes que deseja verificar a segurança para iniciar o treino)
- **Casos de uso principais:**
  - Inserir glicemia pré-treino  
  - Informar tipo de exercício  
  - Inserir horário da insulina rápida  
  - Inserir quantidade de insulina rápida ativa  
- **Caso de uso central:** Avaliar segurança do treino (exibir sinal verde, laranja ou vermelho)
- **Relacionamentos:**  
  - O caso “Avaliar segurança do treino” **inclui** todos os quatro casos anteriores, pois depende dessas informações para processar o resultado.
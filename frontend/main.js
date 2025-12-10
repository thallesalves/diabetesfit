// frontend/main.js
import { normalizeNumber, minutesSince } from "./modules/format.js";
import { validateInputs } from "./modules/validators.js";
import { evaluateSafety } from "./modules/evaluator.js";
import { renderResult, renderErrors, hideResult } from "./modules/ui.js";

//Aguarda DOM carregado (garantia contra race conditions)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAvaliacao"); // captura o formulário (faço isso para poder capturar o evento de submit e prevenir o reload da página)
  const resultadoBox = document.getElementById("resultado"); // cria uma variável para a div de resultado

  //Captura evento de submit
  form.addEventListener("submit", (event) => {
    event.preventDefault(); //Você está dizendo: Quando o usuário clicar no botão de enviar (submit), não recarregue a página.”. 'preventDefault()' bloqueia o comportamento padrão do formulário (que seria atualizar a página).

    //Coleta os valores do formulário
    const glicemiaStr = document.getElementById("glicemia").value;
    const insulinaStr = document.getElementById("insulina").value;
    const horarioStr = document.getElementById("horarioInsulina").value;
    const tipoTreino = document.getElementById("treino").value;

    //Validação
    const validation = validateInputs({ glicemiaStr, insulinaStr, horarioStr, tipoTreino }); // 'validateInputs' retorna um objeto { valid: boolean, errors: string[] }. É uma função que criamos no arquivo 'validators.js' para validar os inputs do formulário.
    if (!validation.valid) { 
      hideResult(resultadoBox); // esconde o box de resultado antes de mostrar os erros
      renderErrors(resultadoBox, validation.errors); // mostra os erros na tela
      return; // sai da função de submit (não prossegue para avaliação)
    }

    //Normalização
    const glicemia = normalizeNumber(glicemiaStr); // normalizeNumber() troca vírgula por ponto e converte pra Number (ex: "1,5" → 1.5);
    const insulina = normalizeNumber(insulinaStr);  // mesma coisa pra insulina
    const minutosDesdeAplicacao = minutesSince(horarioStr); // minutesSince() transforma o horário "14:30" em quantos minutos se passaram desde então (ex: se são 15:30 → resultado será 60 minutos)

    //Avaliação
    const resultado = evaluateSafety({
      glicemia,
      insulinaAtiva: insulina,
      minutosDesdeAplicacao,
      tipoTreino,
    });

    //Renderização final
    renderResult(resultadoBox, resultado);
  });
});

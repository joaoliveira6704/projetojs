function sendAlert(day) {
  // Get the class schedule for the day
  let schedule = getMessage(day);

  // Show the alert with the day and schedule
  alert("Dia: " + day + "\n" + schedule);
}

function getMessage(day) {
  // Define the schedule for each day
  switch (day) {
    case "Segunda-Feira": // Segunda-feira
      return "\nAulas:\n11:30 - 13:00: Matemática I\n14:00 - 16:00: Algoritmia e Estrutura de Dados\n16:00 - 18:00: Tecnologias Web";
    case "Terça-Feira": // Terça-feira
      return "\nAulas:\n14:00 - 15:30: Matemática I\n17:00 - 19:00: Fundamentos de Design";
    case "Quarta-Feira": // Quarta-feira
      return "\nAulas:\n9:00 - 11:00: Tecnologias Web\n11:00 - 13:00: Fundamentos de Design";
    case "Quinta-Feira": // Quinta-feira
      return "\nAulas:\n10:00 - 13:00: Algoritmia e Estrutura de Dados\n14:00 - 17:00: Sistemas Computacionais";
    case 1:
      return "\nTeste:\n16:00 - 18:00: Tecnologias Web";
    case 11:
      return "\nTeste:\n14:00 - 17:00: Sistemas Computacionais";
    case 15:
      return "\nAtividade de Progresso:\n14:00 - 16:00: Algoritmia e Estrutura de Dados";
    case 17:
      return "\nApresentação: 11:00 - 13:00: Fundamentos de Design";
    case 22:
      return "\nTeste:\n10:00 - 12:30: Matemática I";
    case 26:
      return "\nApresentação:\n13:30 - 17:00: Algoritmia e Estrutura de Dados";
    case 29:
      return "\nEntrega de Projeto:\n10:00: Tecnologias Web";
    case 31:
      return "\nApresentação:\n11:00 - 13:00: Sistemas Computacionais";
    default:
      return "\nDia Inválido! Não há atividades programadas para o dia selecionado.";
  }
}

const form = document.getElementById("notasForm");
const resultDiv = document.getElementById("resultado");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtém as notas das disciplinas
    const matematica = parseFloat(document.getElementById("matematica").value);
    const algoritmia = parseFloat(document.getElementById("algoritmia").value);
    const design = parseFloat(document.getElementById("design").value);
    const web = parseFloat(document.getElementById("web").value);
    const sistemas = parseFloat(document.getElementById("sistemas").value);

    // Calcula a média
    const media = (
      (matematica + algoritmia + design + web + sistemas) /
      5
    ).toFixed(2);

    // Exibe o resultado
    resultDiv.innerHTML = `
          <p><strong>Média:</strong> ${media}</p>
        `;

    // Cria o botão "Salvar Notas e Média"
    const saveButton = document.createElement("button");
    saveButton.textContent = "Salvar Notas e Média";
    saveButton.classList.add("btn", "btn-success", "mt-2");
    saveButton.addEventListener("click", function () {
      saveToFile(matematica, algoritmia, design, web, sistemas, media);
    });

    // Adiciona o botão ao resultado
    resultDiv.appendChild(saveButton);
  });
}

// Função para salvar os dados num arquivo .txt
function saveToFile(matematica, algoritmia, design, web, sistemas, media) {
  const content = `Notas das Disciplinas:
    - Matemática: ${matematica}
    - Algoritmia: ${algoritmia}
    - Fundamentos de Design: ${design}
    - Tecnologias Web: ${web}
    - Sistemas Computacionais: ${sistemas}
        
Média: ${media}`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "notas_media_tsiw.txt";
  link.click();
}

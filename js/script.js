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

    // Obtém dinamicamente as disciplinas e notas
    let disciplinas = [];
    let notas = [];

    for (let i = 1; i <= 5; i++) {
      let disciplinaNome = document.getElementById(
        `disciplina${i}-label`
      ).textContent;
      let nota = parseFloat(document.getElementById(`disciplina${i}`).value);

      disciplinas.push(disciplinaNome);
      notas.push(nota);
    }

    // Calcula a média
    const media = (
      notas.reduce((acc, nota) => acc + nota, 0) / notas.length
    ).toFixed(2);

    // Exibe o resultado
    resultDiv.innerHTML = `<p><strong>Média:</strong> ${media}</p>`;

    // Cria o botão "Salvar Notas e Média"
    const saveButton = document.createElement("button");
    saveButton.textContent = "Salvar Notas e Média";
    saveButton.classList.add("btn", "btn-success", "mt-2");
    saveButton.addEventListener("click", function () {
      saveToFile(disciplinas, notas, media);
    });

    // Adiciona o botão ao resultado
    resultDiv.appendChild(saveButton);
  });
}

// Função para obter a data e hora atual no formato D-M-A H:M:S
function getFormattedDateTime() {
  const now = new Date();
  const dia = now.getDate().toString().padStart(2, "0");
  const mes = (now.getMonth() + 1).toString().padStart(2, "0"); // Meses começam do zero
  const ano = now.getFullYear();
  const horas = now.getHours().toString().padStart(2, "0");
  const minutos = now.getMinutes().toString().padStart(2, "0");
  const segundos = now.getSeconds().toString().padStart(2, "0");

  return `${dia}-${mes}-${ano} ${horas}:${minutos}:${segundos}`;
}

// Função para salvar os dados num arquivo .txt
function saveToFile(disciplinas, notas, media) {
  const dataHora = getFormattedDateTime();

  let content = `Notas das Disciplinas (${dataHora}):
`;

  disciplinas.forEach((disciplina, index) => {
    content += `- ${disciplina}: ${notas[index]}\n`;
  });

  content += `\nMédia: ${media}`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `notas_media_${dataHora.replace(/[: ]/g, "_")}.txt`;
  link.click();
}

// Disciplinas organizadas por ano e semestre
const disciplinas = {
  1: {
    1: [
      "Matemática I",
      "Algoritmia e Estruturas de Dados",
      "Fundamentos de Design",
      "Tecnologias Web",
      "Sistemas Computacionais",
    ],
    2: [
      "Conceção e Produção Multimédia",
      "Interfaces e Design para Aplicações",
      "Matemática II",
      "Programação Orientada a Objetos",
      "Projeto I",
    ],
  },
  2: {
    1: [
      "Bases de Dados",
      "Computação Gráfica",
      "Engenharia de Software",
      "Ergonomia Cognitiva e Design de Interação",
      "Programação Web I",
    ],
    2: [
      "Inteligência Artificial",
      "Programação Web II",
      "Projeto II",
      "Programação I",
      "Vídeo I",
    ],
  },
  3: {
    1: [
      "Computação Móvel e Ubíqua",
      "Inovação e Empreendedorismo",
      "Negócio Eletrónico e Segurança",
      "Prototipagem Avançada em Plataformas Digitais",
      "Serviços e Interfaces para a Cloud",
    ],
    2: [
      "Marketing Digital",
      "Projeto Final/Estágio",
      "Usabilidade e User Experience",
      "Big Data",
      "Data Mining",
    ],
  },
};

// Atualiza os nomes das disciplinas conforme o ano e semestre selecionado
function atualizarDisciplinas() {
  const anoSelecionado = document.getElementById("ano").value;
  const semestreSelecionado = document.getElementById("semestre").value;

  if (
    disciplinas[anoSelecionado] &&
    disciplinas[anoSelecionado][semestreSelecionado]
  ) {
    for (let i = 1; i <= 5; i++) {
      document.getElementById(`disciplina${i}-label`).textContent =
        disciplinas[anoSelecionado][semestreSelecionado][i - 1];
    }
  }
}

// Atualiza o semestre ao trocar de ano
document.getElementById("ano").addEventListener("change", atualizarDisciplinas);
document
  .getElementById("semestre")
  .addEventListener("change", atualizarDisciplinas);

// Inicializar os valores das disciplinas na primeira carga
atualizarDisciplinas();

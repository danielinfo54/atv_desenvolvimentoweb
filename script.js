const livros = [
  { titulo: "Dom Casmurro", autor: "Machado de Assis", emoji: "📖",
    sinopse: "Um clássico sobre ciúme, memória e dúvida.", humores: ["nostalgico", "curioso"] },
  { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", emoji: "🌹",
    sinopse: "Uma fábula poética sobre amizade e o que é essencial.", humores: ["nostalgico", "relaxar"] },
  { titulo: "1984", autor: "George Orwell", emoji: "👁️",
    sinopse: "Um retrato sombrio de vigilância e controle.", humores: ["corajoso", "curioso"] },
  { titulo: "A Menina que Roubava Livros", autor: "Markus Zusak", emoji: "🕯️",
    sinopse: "A força das palavras em meio à guerra.", humores: ["nostalgico", "corajoso", "triste"] },
  { titulo: "O Alquimista", autor: "Paulo Coelho", emoji: "🧭",
    sinopse: "Uma jornada em busca do próprio destino.", humores: ["corajoso", "relaxar"] },
  { titulo: "Sapiens", autor: "Yuval Noah Harari", emoji: "🧠",
    sinopse: "Como a humanidade chegou até aqui.", humores: ["curioso"] },
  { titulo: "A Culpa é das Estrelas", autor: "John Green", emoji: "💔",
    sinopse: "Uma história de amor intensa e comovente.", humores: ["nostalgico", "triste"] },
  { titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", emoji: "⚡",
    sinopse: "O início de uma jornada mágica inesquecível.", humores: ["relaxar", "corajoso"] },
  { titulo: "A Metamorfose", autor: "Franz Kafka", emoji: "🪲",
    sinopse: "Uma reflexão inquietante sobre identidade.", humores: ["triste", "curioso"] },
  { titulo: "Extraordinário", autor: "R.J. Palacio", emoji: "🌟",
    sinopse: "Uma lição sobre gentileza e aceitação.", humores: ["relaxar", "nostalgico"] },
  { titulo: "O Hobbit", autor: "J.R.R. Tolkien", emoji: "🗡️",
    sinopse: "Uma aventura inesperada rumo ao desconhecido.", humores: ["corajoso", "relaxar"] },
  { titulo: "Como Fazer Amigos e Influenciar Pessoas", autor: "Dale Carnegie", emoji: "🤝",
    sinopse: "Lições práticas sobre relações humanas.", humores: ["curioso"] },
];

let humorAtual = null;      // último humor escolhido
let ultimoLivro = null;     // último livro sorteado (evita repetir seguido)
let totalSorteios = 0;      // quantas vezes o usuário já sorteou um livro

function configurarBotoesDeHumor() {
  const botoes = document.querySelectorAll(".btnHumor");

  botoes.forEach((botao) => {
    botao.addEventListener("click", function () {
      // Marca visualmente qual humor está ativo
      botoes.forEach((b) => b.classList.remove("ativo"));
      botao.classList.add("ativo");

      humorAtual = botao.getAttribute("data-humor");
      sortearLivro(humorAtual);
    });
  });
}

function sortearLivro(humor) {
  const livrosDoHumor = livros.filter((livro) => livro.humores.includes(humor));

  let livroEscolhido;
  do {
    const indiceAleatorio = Math.floor(Math.random() * livrosDoHumor.length);
    livroEscolhido = livrosDoHumor[indiceAleatorio];
  } while (livroEscolhido === ultimoLivro && livrosDoHumor.length > 1);
  // o "do while" evita mostrar o mesmo livro duas vezes seguidas, quando há opção

  ultimoLivro = livroEscolhido;
  totalSorteios++;

  exibirResultado(livroEscolhido);
  atualizarContador();
}


function exibirResultado(livro) {
  const cartao = document.getElementById("cartaoResultado");

  cartao.innerHTML = `
    <div class="capaEmoji">${livro.emoji}</div>
    <h2>${livro.titulo}</h2>
    <p class="autor">de ${livro.autor}</p>
    <p class="sinopse">${livro.sinopse}</p>
    <button id="btnOutro">🔄 Sortear outro</button>
  `;
   document.getElementById("btnOutro").addEventListener("click", function () {
    sortearLivro(humorAtual);
  });
}
function atualizarContador() {
  document.getElementById("totalSorteios").textContent = totalSorteios;
}
configurarBotoesDeHumor();
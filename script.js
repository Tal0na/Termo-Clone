let palavrasPossiveis = [
  "pinto",
  "xibiu",
  "merda",
  "porra",
  "carai",
  "foder",
  "bosta",
  "falta",
  "graça",
  "limbo",
  "firme",
  "rosto",
  "bravo",
  "selar",
  "subir",
  "volta",
  "nuvem",
  "exato",
  "ideal",
  "fluxo",
  'bilau',
]
let palavrasDisponiveis = [...palavrasPossiveis]

let palavraSecreta = escolherPalavraAleatoria(palavrasDisponiveis)
let tentativasRestantes = 5

function escolherPalavraAleatoria(listaPalavras) {
  const indiceAleatorio = Math.floor(Math.random() * listaPalavras.length)
  return listaPalavras.splice(indiceAleatorio, 1)[0]
}
function removerAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
palavrasDisponiveis = palavrasDisponiveis.map(palavra => removerAcentos(palavra));

// Normaliza a palavra secreta
palavraSecreta = removerAcentos(palavraSecreta);

console.log(palavraSecreta);

function checkGuess() {
  const palpiteInput = document.getElementById("guessInput")
  const palpite = palpiteInput.value.toLowerCase()
  const feedback = document.getElementById("feedback")

  // Verifica se o palpite contém apenas letras
  if (/^[a-zA-Z]+$/.test(palpite)) {
    if (palpite === palavraSecreta) {
      displayFeedback("Parabéns! Você acertou!")
    } else {
      tentativasRestantes--

      if (tentativasRestantes > 0) {
        displayFeedback(
          `Tente novamente! Tentativas restantes: ${tentativasRestantes}`
        )
      } else {
        displayFeedback(`Game Over. A palavra era "${palavraSecreta}".`)
        palpiteInput.disabled = true
      }
    }

    updateColorGrids(palpite)
  } else {
    displayFeedback("Por favor, insira apenas letras.")
  }
}

function displayFeedback(mensagem) {
  document.getElementById("feedback").innerText = mensagem
}

function updateColorGrids(palpite) {
  const colorGridsContainer = document.getElementById("colorGrids")
  const colorGrid = document.createElement("div")
  colorGrid.classList.add("colorGrid")

  // Adiciona quadrados para cada letra com as devidas classes
  for (let i = 0; i < palpite.length; i++) {
    const letterSquare = document.createElement("div")
    letterSquare.classList.add("letterSquare")
    letterSquare.innerText = palpite[i]
    if (palpite[i] === palavraSecreta[i]) {
      letterSquare.classList.add("correctPosition")
    } else if (palavraSecreta.includes(palpite[i])) {
      letterSquare.classList.add("correctLetter")
    }
    colorGrid.appendChild(letterSquare)
  }

  colorGridsContainer.appendChild(colorGrid)
}

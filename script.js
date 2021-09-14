// Data initial

let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d1-right')
let numeros = document.querySelector('.d-1-3')
let tela = document.querySelector('.tela')

let etapaAtual = 0

let numero = ''

let votoBranco = false

let votos = []

// Events

comecarEtapa()

//funcion

function comecarEtapa() {
  let etapa = etapas[etapaAtual]

  let numeroHTML = ''
  numero = ''
  votoBranco = false

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHTML += '<div class="numero pisca"></div>'
    } else {
      numeroHTML += '<div class="numero"></div>'
    }
  }

  seuVotoPara.style.display = 'none'
  cargo.innerHTML = etapa.titulo
  descricao.innerHTML = ''
  aviso.style.display = 'none'
  lateral.innerHTML = ''
  numeros.innerHTML = numeroHTML
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual]
  let candidato = etapa.candidatos.filter(item => {
    if (item.numero === numero) {
      return true
    } else {
      return false
    }
  })

  if (candidato.length > 0) {
    candidato = candidato[0]

    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    descricao.innerHTML = `Nome: ${candidato.nome} <br />
    Partido: ${candidato.partido} <br />`

    let fotosHTML = ''

    for (let i in candidato.fotos) {
      fotosHTML += `<div class="d1-right">
      <div class="d-1-image">
        <img
          src="./assets/img/${candidato.fotos[i].url}"
          alt="Canditado(a) para ${candidato.fotos[i].legenda}"
        />
        <spa class="cargo"> ${candidato.fotos[i].legenda}</spa>
      </div>
    </div>`
    }

    lateral.innerHTML = fotosHTML
  } else {
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'

    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
  }
}

function clicou(n) {
  let elNumero = document.querySelector('.numero.pisca')
  if (elNumero !== null) {
    elNumero.innerHTML = n
    numero = `${numero}${n}`

    elNumero.classList.remove('pisca')

    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add('pisca')
    } else {
      atualizaInterface()
    }
  }
}

function branco() {
  numero = ''
  votoBranco = true
  seuVotoPara.style.display = 'block'
  aviso.style.display = 'block'
  numeros.innerHTML = ''
  descricao.innerHTML = '<div class="aviso--grande pisca">VOTO BRANCO</div>'
  lateral.innerHTML = ''
}

function corrige() {
  comecarEtapa()
}

function confirma() {
  let etapa = etapas[etapaAtual]
  let votoConfirmado = false
  if (votoBranco) {
    votoConfirmado = true
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'Branco'
    })
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero
    })
  }

  if (votoConfirmado) {
    etapaAtual++
    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa()
    } else {
      tela.innerHTML =
        '<div class="fim pisca"><h1>OBRIGADO POR VOTAR !</h1></div>'
      console.log(votos)
    }
  }
}

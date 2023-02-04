const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#productName')
const sDescription = document.querySelector('#productDescription')
const sDisponible = document.querySelector('#productAvailable')
const sValues = document.querySelector('#productValue')
const btnSalvar = document.querySelector('#btnSalvar')
const btnLimpar = document.querySelector('#btnLimpar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sDescription.value = itens[index].funcao
    sValues.value = itens[index].salario
    sDisponible.value = itens[index].disponible
    id = index
  } else {
    sNome.value = ''
    sDescription.value = ''
    sValues.value = ''
    sDisponible.value = ''
  }
}


function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td>${item.disponible}</td>

  `
  tbody.appendChild(tr)
}

sDisponible.onchange = e => {
    if (e.target.checked) {
        sDisponible.value = 'Sim'
    } else {
        sDisponible.value = 'Não'
    }
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sDescription.value == '' || sValues.value == '' || sDisponible.value === '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sDescription.value
    itens[id].salario = sValues.value
    itens[id].disponible = sDisponible.value
  } else {
    itens.push({'nome': sNome.value, 'funcao': sDescription.value, 'salario': sValues.value, 'disponible': sDisponible.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))


btnLimpar.onclick = e => {
    localStorage.clear();
    loadItens();
}

loadItens();

// javascript


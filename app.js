const form = document.querySelector('.todo-form')
const inputForm = document.querySelector('.form-input')
const container = document.querySelector('.todo-container')

//edit option
let editElement;
let editFlag = false

form.addEventListener('submit', addItem)


function addItem(event){
  event.preventDefault()
  let value = inputForm.value
  let id = new Date().getTime().toString()
    if(value != '' && !editFlag){
      const newArticle = document.createElement('article')
      newArticle.setAttribute('data-id' , id)
      newArticle.classList.add('todo-list')
      newArticle.innerHTML =
    // img check 2 
    // <button class="btn-check btn">
    //   <i class="fa-solid fa-circle-check"></i>
    // </button>
    `<div class="todo-check">
        <button class="btn-check btn">
          <i class="fa-solid fa-circle"></i>
        </button>
        <p class="todo-title">${value}</p>
      </div>

      <div class="todo-btn">
        <button class="edit btn-control">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete btn-control">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>`

    //event listeners
    const checkBtn = newArticle.querySelector('.btn-check')
    checkBtn.addEventListener('click', toogleCheckIcon)
    const deleteBtn = newArticle.querySelector('.delete')
    deleteBtn.addEventListener('click', deleteItem)
    const editBtn = newArticle.querySelector('.edit')
    editBtn.addEventListener('click', editItem)

    //append chield
    container.appendChild(newArticle)
    setBacktoDefault()
    }
    else if(value != '' && editFlag){
      editElement.innerHTML = value
      setBacktoDefault()
    } 
    else {
      console.log('Erro inesperado!')
    }
}

function toogleCheckIcon(e){
  const item = e.currentTarget.firstElementChild
  const isCircle = item.classList.contains('fa-circle')

  if(isCircle){
    item.classList.replace('fa-circle' , 'fa-circle-check')
  } else {
    item.classList.replace('fa-circle-check' , 'fa-circle')
  }
}

function deleteItem(e){
  const item = e.currentTarget.parentElement.parentElement
  const id = item.dataset.id
  container.removeChild(item)
}

function editItem(e){
  const element = e.currentTarget.parentElement.parentElement

  editElement = e.currentTarget.parentElement.previousElementSibling
  inputForm.value = editElement.innerText
  editFlag = true
}

// set back to default
function setBacktoDefault(){
  inputForm.value = ''
  editFlag = false
}
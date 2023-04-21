const form = document.querySelector('.todo-form')
const inputForm = document.querySelector('.form-input')
const container = document.querySelector('.todo-container')




form.addEventListener('submit', function(event){
  event.preventDefault()
  const value = inputForm.value
  const id = new Date().getTime().toString()
  const newArticle = document.createElement('article')
  newArticle.setAttribute('data-id' , id)
  newArticle.classList.add('todo-list')

    if(value != ''){
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

    container.appendChild(newArticle)
    setBacktoDefault()

    const deleteBtn = document.querySelector('.delete')
    const editBtn = document.querySelector('.edit')
    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)
    }
    else{
      console.log('Erro inesperado!')
    }
})


function deleteItem(e){
  const item = e.currentTarget.parentElement.parentElement
  const id = item.dataset.id

  container.removeChild(item)
  console.log('deletando!')
}

function editItem(e){
  console.log('editandp')
}

function setBacktoDefault(){
  inputForm.value = ''
}
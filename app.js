const form = document.querySelector('.todo-form')
const inputForm = document.querySelector('.form-input')
const container = document.querySelector('.todo-container')




form.addEventListener('submit', function(event){
  event.preventDefault()
  let value = inputForm.value
  let id = new Date().getTime().toString()

    if(value != ''){
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
    const deleteBtn = newArticle.querySelector('.delete')
    deleteBtn.addEventListener('click', deleteItem)

    const editBtn = newArticle.querySelector('.edit')
    editBtn.addEventListener('click', editItem)

    //append chield
    container.appendChild(newArticle)

    setBacktoDefault()
    }
    else{
      console.log('Erro inesperado!')
    }
})


function deleteItem(e){
  const item = e.currentTarget.parentElement.parentElement
  const id = item.dataset.id
  container.removeChild(item)
  console.log('deletando')
}

function editItem(e){
  const item = e.currentTarget.parentElement.previousElementSibling
  //inputForm.value =
  console.log(item.innerHTML) 
  
}

function setBacktoDefault(){
  inputForm.value = ''
}
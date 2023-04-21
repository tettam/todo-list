const form = document.querySelector('.todo-form')
const inputForm = document.querySelector('.form-input')
const container = document.querySelector('.todo-container')
const appearance = document.querySelector('.icon-config')

const sectionBottom = document.querySelector('.section-bottom')

//edit option
let editElement
let editFlag = false
let theme = 'white'
let editId = ''

appearance.addEventListener('click', appearanceTheme)
form.addEventListener('submit', addItem)
window.addEventListener('DOMContentLoaded', setupItems)


function addItem(event){
  event.preventDefault()
  let value = inputForm.value
  let id = new Date().getTime().toString()
    if(value != '' && !editFlag){
      const newArticle = document.createElement('article')
      newArticle.setAttribute('data-id' , id)
      newArticle.classList.add('todo-list')
      newArticle.innerHTML =

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
    
    appearanceThemeCreatedItem(newArticle)
    setBacktoDefault()
    checkEvent(newArticle, 'success')
    // local storage
    addToLocalStorage(id, value)
  
    }
    else if(value != '' && editFlag){
      const item = editElement.querySelector('.todo-title')
      const element = item.parentElement.parentElement
      item.innerHTML = value
      setBacktoDefault()
      editLocalStorage(editId , value)
      checkEvent(element , 'edit')
    } 
    else {
      const item = event.currentTarget
      checkEvent(item, 'error')
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

  removeLocalStorage(id)
  container.removeChild(item)  
}

function editItem(e){
  const element = e.currentTarget.parentElement.parentElement
  const id = element.dataset.id

  editElement = e.currentTarget.parentElement.previousElementSibling
  inputForm.value = editElement.innerText
  editFlag = true
  editId = id
}

function checkEvent(e, option){
  e.classList.add(`msg-${option}`)

  setTimeout(function(){
    e.classList.remove(`msg-${option}`)
  }, 1000)
}

// set back to default
function setBacktoDefault(){
  inputForm.value = ''
  editFlag = false
}

function appearanceTheme(e){
  const item = e.currentTarget.firstElementChild
  const obj = item.classList.contains('fa-sun')
  const containerItems = container.querySelectorAll('*')
  const APPEARANCE_WRITE = 'appearance-white'
  
  if(obj){
    // icon-img
    item.classList.replace('fa-sun', 'fa-moon')
    form.classList.add(APPEARANCE_WRITE)
    // section bottom
    sectionBottom.classList.add('appearance-section')
    // list(todo list)
    theme = 'dark'
    containerItems.forEach((element) => {
      element.classList.add(APPEARANCE_WRITE)
    })
  }
  else {
    item.classList.replace('fa-moon', 'fa-sun')
    form.classList.remove(APPEARANCE_WRITE)
    sectionBottom.classList.remove('appearance-section')
    theme = 'write'
    containerItems.forEach((element) => {
      element.classList.remove(APPEARANCE_WRITE)
    })
  }
}

function appearanceThemeCreatedItem(e){
  if(theme == 'dark'){
    e.classList.add('appearance-white')
  }
   
}

/* local storage */
function getLocalStorage(){
  if(localStorage.getItem('list')){
    return JSON.parse(localStorage.getItem('list'))
  } 
  return []
}
// add local storage
function addToLocalStorage(id, value){
  const toDo = {id , value}
  let items = getLocalStorage()
  items.push(toDo)
  localStorage.setItem('list', JSON.stringify(items))
}
// remove local storage
function removeLocalStorage(id){
  let items = getLocalStorage()
  items = items.filter(function(item){
    if(item.id !== id){
      return item
    }
  })

  localStorage.setItem('list', JSON.stringify(items))
}
// edit local storage
function editLocalStorage(id, value){
  let items = getLocalStorage()
  items = items.map(function(item){
    if(item.id == id){
      item.value = value
    }
    return item
  })
  localStorage.setItem('list', JSON.stringify(items))
}

function setupItems(){
  let items = getLocalStorage()
  if(items.length > 0){
    items.forEach(function(item){
      createListItem(item.id, item.value)
    })
  }
}

// list items local storage
function createListItem(id, value){
  let newArticle = document.createElement('article')
  newArticle.setAttribute('data-id', id)
  newArticle.classList.add('todo-list')

  newArticle.innerHTML = `<div class="todo-check">
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

  const checkBtn = newArticle.querySelector('.btn-check')
  checkBtn.addEventListener('click', toogleCheckIcon)
  const deleteBtn = newArticle.querySelector('.delete')
  deleteBtn.addEventListener('click', deleteItem)
  const editBtn = newArticle.querySelector('.edit')
  editBtn.addEventListener('click', editItem)
  //append chield
  container.appendChild(newArticle)
}
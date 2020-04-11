// const p = document.querySelector('p')
// p.remove()
'use strict'
let todos = getSavedTodos()
 
const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#form').addEventListener('submit',(e) => {
    const todoValue = e.target.elements.addTodo.value.trim()
    // console.log(todoValue.length)
    e.preventDefault()

    if(todoValue.length > 1) {
        todos.push({
            id: uuidv4(),
            content: todoValue,
            completed: false
        })
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.elements.addTodo.value = ""
    }  
})

document.querySelector('#hide-todos').addEventListener('change',(e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})
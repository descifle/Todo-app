// Get todos from local storage
'use strict'
const getSavedTodos = (todos) => {
    let todosJSON = localStorage.getItem('todos')
    return todosJSON ? JSON.parse(todosJSON) : []
}

// Save todos to local storage.
const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

// Renders application based on todo filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    let filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.content.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''

    
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))


    if(filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No to-dos to show'
        emptyMessage.classList.add('empty-message')
        todoEl.appendChild(emptyMessage)
    }
}

// Remove todo based on ID
const removeTodo =(id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
}

// Get the DOM elements for an individual note
const generateTodoDOM =(todo) => {
    const container = document.createElement('div')
    const todoEl = document.createElement('div')

    // Creates a input and changes its type to checkbox
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    checkBox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)

    })
    
    //setup container
    todoEl.classList.add('list-item')
    container.classList.add('list-item__container')
    todoEl.appendChild(container)

    // Creates a button and changes its text to an X
    const button = document.createElement('button')
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    button.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    // Creates a span element and changes its text to todo text
    const span = document.createElement('span')
    span.textContent = todo.content

        container.appendChild(checkBox)
        container.appendChild(span)
        todoEl.appendChild(button)
        return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    // summary.textContent = `you have ${incompleteTodos.length} todos left!`
    incompleteTodos.length === 1 ? summary.textContent = `You have ${incompleteTodos.length} todo left!` : summary.textContent = `You have ${incompleteTodos.length} todos left!`
    return summary
}
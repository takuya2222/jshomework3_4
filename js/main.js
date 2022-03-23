'use strict';

const inputTodo = document.getElementById('input-todo');
const addTaskTarget = document.getElementById('addTask-target');
const todos = [];

const onClickAdd = () => {
  const todo = {
    todoComment: inputTodo.value,
    status: '作業中',
   };

  todos.push(todo);

  createTodo(inputTodo);
  inputTodo.value = '';
  
  radioChange();
 };

const createTodo = (text) => {
  addTaskTarget.textContent = '';

  todos.forEach((todo,number) => {
    const todoRow = document.createElement('tr');
    addTaskTarget.appendChild(todoRow);
    
    const todoId = document.createElement('td');
    const todoComment = document.createElement('td');
    const todoStatus = document.createElement('td');
    const todoAction = document.createElement('td');
    
    todoId.textContent = number;
    todoComment.textContent = todo.todoComment;
    todoRow.appendChild(todoId);
    todoRow.appendChild(todoComment);
    todoRow.appendChild(todoStatus);
    todoRow.appendChild(todoAction);
    
    todoStatus.appendChild(createStatusButton(todo));
    todoAction.appendChild(createDeleteButton(todoRow));
    
    
  });
};

document
.getElementById('add-btn')
.addEventListener('click', () => onClickAdd());

const createStatusButton = (todo) => {
  const statusButton = document.createElement('button');
  statusButton.innerText = todo.status;
  statusButton.addEventListener('click', () => {
    todo.status ==='作業中'?todo.status = '完了':todo.status = '作業中';
    createTodo(todo);
  });
  return statusButton;
};

const createDeleteButton = (todoRow) => {
  const index = todoRow.rowIndex - 1;
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除';
  deleteButton.addEventListener('click', () => {
    todos.splice(index, 1);
    createTodo(todoRow);
    todos.reduce((Idnum, todo) => (todo.id = Idnum + 1), -1);
    createTodo(todos);
  });
  return deleteButton
};

const radioChange = () => {
  const radio1_1 = document.getElementById('radio-all-select');
  const radio1_2 = document.getElementById('radio-working-select');
  const radio1_3 = document.getElementById('radio-done-select');

  if (radio1_1.checked) {
    return createTodo(todos);
  } else if (radio1_2.checked) {
    const filterdoing = todos.filter((todo) => {
      return todo.status === '作業中';
    });
    return createTodo(filterdoing);
  } else if (radio1_3.checked) {
    const filterdone = todos.filter((todo) => {
      return todo.status === '完了';
    });
    return createTodo(filterdone);
  }

  console.log(radio1_1);
  // console.log(todos);

};

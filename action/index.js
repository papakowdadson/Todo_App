let Todos = [
  {
    id: 0,
    status: "completed",
    task: "My first todo",
  },
  {
    id: 1,
    status: "active",
    task: "My second todo",
  },
  {
    id: 2,
    status: "active",
    task: "My third todo",
  },
  {
    id: 3,
    status: "active",
    task: "My fourth todo",
  },
];

let indexPosition = Todos.length - 1;
let isLight = true;
var modeButton;
var modeIcon;
var allButton;
var clearButton;
var activeButton;
var completedButton;
var createButton;
var content;




window.onload = () => {
  console.log("document loaded");
  initialComponent();
  loadTodos();
};

function loadTodos() {
  console.log('--------------loading Todos------------')
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

document.querySelector('#todo-length').innerHTML=`${Todos.length} items left`;


let ul = document.createElement('ul');
  
 Todos.forEach((todo, index) => {
    console.log("todo", todo);
    console.log("index", index);

    var todoContainer = document.createElement("div");
    todoContainer.id = "todo-item";

    var iconButton = document.createElement("button");
    iconButton.className = "icon-btn";
    iconButton.id = "icon-btn";
    var iconImage = document.createElement("img");
    iconImage.id = "icon-img";

    var message = document.createElement("p");
    message.id = "todo-name";
    var cancelButton = document.createElement("button");
    cancelButton.id = "cancel-btn";
    cancelButton.className = "cancel-btn";
    var cancelImage = document.createElement("img");
    cancelImage.className = "cancel-icon";
    cancelImage.src='./images/icon-cross.svg'
    
    todoContainer.className = `${
      isLight ? "input-container-light" : "input-container-dark"
    } todo-item ${index == 0 ? "first-todo" : ""}`;

    iconImage.className = `${
      todo.status == "completed" ? "icon-active-icon" : "icon-inactive-icon"
    }`;
    iconImage.src = `${
      todo.status == "completed"
        ? "../images/icon-check.svg"
        : "../images/icon-circle.svg"
    }`;

    message.style.textDecoration = `${
      todo.status == "completed" ? "line-through" : ""
    }`;
    message.innerHTML = todo.task;

  
    iconButton.addEventListener('click',()=>completeTodo(todo.id));
    cancelButton.addEventListener('click',()=>deleteTodo(todo.id));

    iconButton.appendChild(iconImage);
    cancelButton.appendChild(cancelImage);

    todoContainer.appendChild(iconButton);
    todoContainer.appendChild(message);
    todoContainer.appendChild(cancelButton);


    console.log('------recentTodo:----',todoContainer)
    // ul.appendChild(todoContainer);
      content.appendChild(todoContainer);

  });
}

function changeTheme() {
  console.log('----------------Theme-----------------')
  let _isLight = !isLight;
  isLight = _isLight;

  document.body.style.backgroundColor = `${
    isLight ? "white" : "hsl(237, 14%, 26%)"
  }`;
  document.getElementById('input-container').style.backgroundColor = `${
    isLight ? "white" : "hsl(237, 14%, 26%)"
  }`;
  document.getElementById('footer-container').style.backgroundColor = `${
    isLight ? "white" : "hsl(237, 14%, 26%)"
  }`;
  document.getElementById('footer-middle-container').style.backgroundColor = `${
    isLight ? "white" : "hsl(237, 14%, 26%)"
  }`;
  // document.getElementById('todo-item').style.backgroundColor = `${
  //   isLight ? "white" : "hsl(237, 14%, 26%)"
  // }`;
  modeIcon.src=isLight?'./images/icon-moon.svg':'./images/icon-sun.svg'


  loadTodos()

}

function getCompleted() {
  console.log('-----------------getting completed---------')
  let _Todos = Todos.filter((todo) => todo.status != "active");
  Todos = _Todos;
  loadTodos();
}

function getActive() {
  console.log('-----------------Getting Active----------')
  let _Todos = Todos.filter((todo) => todo.status != "completed");
  Todos = _Todos;
  loadTodos();
}

function deleteTodo(id) {
  console.log('-------------------deleted---------------')
  let _Todos = Todos.filter((todo) => id != todo.id);
  Todos = _Todos;
  loadTodos();
}
function completeTodo(id) {
  console.log('--------------------setting to completed--------')
  let _Todos = Todos.map((todo) => {
    if (todo.id == id) {
      return { ...todo, status: "completed" };
    }
    return todo;
  });
  Todos = _Todos;
  loadTodos();
}

function createTodo() {
  console.log('-------------creating Todo---------')
  let _id = indexPosition+1
  let message = document.getElementById('create-name').value;
  console.log('message;',message)
  Todos.push({ id:_id, status: "active", task: message });
  loadTodos();
  document.getElementById('create-name').value ='';
  indexPosition=Todos.length-1
}

function clearTodos() {
  console.log('---------clearing Todo------------')
  Todos = [];
  loadTodos();
}

function filter(action) {
  switch (action) {
    case "active":
      getActive();
      break;

    case "completed":
      getCompleted();
      break;

    case "clear":
      clearTodos();
      break;

    case "all":
      loadTodos();
      break;

    default:
      break;
  }
}

function initialComponent() {
  content = document.querySelector(".content");
  modeButton = document.querySelector("#mode-btn");
  modeIcon = document.querySelector('#mode-icon');
  allButton = document.querySelector("#all-btn");
  clearButton = document.querySelector("#clear-btn");
  activeButton = document.querySelector("#active-btn");
  completedButton = document.querySelector("#completed-btn");
  createButton = document.querySelector('#submit-btn')
  modeButton.addEventListener("click", changeTheme);
  allButton.addEventListener("click",()=> filter("all"));
  clearButton.addEventListener("click",()=> filter("clear"));
  activeButton.addEventListener("click",()=> filter("active"));
  completedButton.addEventListener("click",()=> filter("completed"));
  createButton.addEventListener('click',()=>createTodo());

  modeIcon.src=isLight?'./images/icon-moon.svg':'./images/icon-sun.svg'

  console.log('--------------initiation----------------')
  console.log('content',content);
  console.log('modeButton',modeButton);
  console.log('allButton',allButton);
  console.log('clearButton',clearButton);
  console.log('active',activeButton);
  console.log('completedButton',completedButton)
}

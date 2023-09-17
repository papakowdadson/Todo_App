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
var allButton=document.querySelector("#all-btn");
var clearButton;
var activeButton=document.querySelector("#active-btn");
var completedButton=document.querySelector("#completed-btn");
var createButton;
var content;






window.onload = () => {
  console.log("document loaded");
  initialComponent();
  loadTodos(Todos);
};

const loadTodos = (todos) => {
  let _Todos=todos
  console.log('--------------loading Todos------------')
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

 document.querySelector('#todo-length').innerHTML=`${Todos.filter((todo)=>todo.status=='active').length} items left`;


 let ul = document.createElement('ul');
  
 _Todos.forEach((todo, index) => {
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
        ? "./images/icon-check.svg"
        : "./images/icon-circle.svg"
    }`;

    message.style.textDecoration = `${
      todo.status == "completed" ? "line-through" : ""
    }`;
    message.style.color = `${
      todo.status == "completed" ? "hsl(235, 19%, 35%)" : "black"
    }`;
    message.innerHTML = todo.task;

  
    iconButton.addEventListener('click',()=>completeTodo(todo.id));
    cancelButton.addEventListener('click',()=>deleteTodo(todo.id));

    iconButton.appendChild(iconImage);
    cancelButton.appendChild(cancelImage);

    todoContainer.appendChild(iconButton);
    todoContainer.appendChild(message);
    todoContainer.appendChild(cancelButton);
    todoContainer.draggable=true;
    todoContainer.addEventListener('dragstart',(e)=>drag(e));


    console.log('------recentTodo:----',todoContainer)
    // ul.appendChild(todoContainer);
      content.appendChild(todoContainer);

  });
}

const changeTheme = () => {
  console.log('----------------Theme-----------------')
  let _isLight = !isLight;
  isLight = _isLight;

  document.body.style.backgroundColor = `${
    isLight ? "white" : "hsl(235, 21%, 11%)"
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


  loadTodos(Todos)

}

const getCompleted = () => {
  console.log('-----------------getting completed---------')
  let _Todos = Todos.filter((todo) => todo.status != "active");
  
  loadTodos(_Todos);
}

const getActive = () => {
  console.log('-----------------Getting Active----------')
  let _Todos = Todos.filter((todo) => todo.status != "completed");
  loadTodos(_Todos);
}

const deleteTodo = (id) => {
  console.log('-------------------deleted---------------')
  let _Todos = Todos.filter((todo) => id != todo.id);
  Todos = _Todos;
  loadTodos(Todos);
}
const completeTodo = (id) => {
  console.log('--------------------setting to completed--------')
  let _Todos = Todos.map((todo) => {
    if (todo.id == id) {
      if(todo.status=='active'){      
        return { ...todo, status: "completed" };
        }
      else{
        return { ...todo, status: "active" };
      }
    }
    return todo;
  });
  Todos = _Todos;
  loadTodos(Todos);
}

const createTodo = () => {
  console.log('-------------creating Todo---------')
  let _id = indexPosition+1
  let message = document.getElementById('create-name').value;
  console.log('message;',message)
  Todos.push({ id:_id, status: "active", task: message });
  loadTodos(Todos);
  document.getElementById('create-name').value ='';
  indexPosition=Todos.length-1
}

const clearCompletedTodos = () => {
  console.log('---------clearing completed Todo------------')
  Todos = Todos.filter((todo)=>todo.status!='completed');
  loadTodos(Todos);
}

const filter=(action)=> {
  switch (action) {
    case "active":
      allButton.classList.remove('Active');
      activeButton.classList.add('Active');
      completedButton.classList.remove('Active');
      getActive();
      break;

    case "completed":
      allButton.classList.remove('Active');
      activeButton.classList.remove('Active');
      completedButton.classList.add('Active');
      getCompleted();
      break;

    case "clear":
      clearCompletedTodos();
      break;

    case "all":
      allButton.classList.add('Active');
      activeButton.classList.remove('Active');
      completedButton.classList.remove('Active');
      loadTodos(Todos);
      break;

    default:
      break;
  }
}


const allowDrop = (ev) => {
  ev.preventDefault();
  // content.style.border='1px solid black'
}

const drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
}

const drop = (ev) => {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  // ev.target.appendChild(document.getElementById(data));
  content.appendChild(document.getElementById(data));

}




const initialComponent = () => {
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
  content.addEventListener('drop',(e)=>drop(e));
  content.addEventListener('dragover',(e)=>allowDrop(e))

  modeIcon.src=isLight?'./images/icon-moon.svg':'./images/icon-sun.svg'

  console.log('--------------initiation----------------')
  console.log('content',content);
  console.log('modeButton',modeButton);
  console.log('allButton',allButton);
  console.log('clearButton',clearButton);
  console.log('active',activeButton);
  console.log('completedButton',completedButton)
}

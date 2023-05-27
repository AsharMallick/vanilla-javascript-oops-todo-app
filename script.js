// App Variables
let title = document.getElementById("titleVal");
let description = document.getElementById("descriptionVal");
let addTodoForm = document.getElementById("todoForm");
let todoCard = document.getElementById("todoCards");
let clearButton = document.getElementById("clearBtn");
let searchQuery = document.getElementById('search');


function deleted(item) {
  new Todo().deleted(item);
}

// Class that contains all methods related to todos
class Todo {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
  //Method for new todo in localStorage
  save() {
    let todos;
    let savedTodos = localStorage.getItem("todos");
    if (savedTodos == null) {
      todos = [];
    } else {
      todos = JSON.parse(savedTodos);
    }
    let newTodo = {
      title: this.title,
      description: this.description,
    };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    this.render();
  }

  //Method for deleting a todo
  deleted(item) {
    item = parseInt(item);
    let todos;
    let savedTodos = localStorage.getItem("todos");
    if (savedTodos == null) {
      todos = [];
    } else {
      todos = JSON.parse(savedTodos);
    }
    todos.splice(parseInt(item), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    this.render();
  }

  //Method for rendering todos in the DOM
  render() {
    let todos;
    let savedTodos = localStorage.getItem("todos");
    if (savedTodos == null) {
      todos = [];
    } else {
      todos = JSON.parse(savedTodos);
    }
    let string = "";
    todos.forEach((item, index) => {
      string =
        string +
        `
            <div class="card row mx-3 my-3" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${index + 1}. ${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <button class="btn btn-primary" id="${index}" onclick="deleted(this.id)">Delete Todo</button>
            </div>
            </div>
            `;
    });
    if (todos.length != 0) {
      todoCard.innerHTML = string;
      clearButton.removeAttribute("disabled", true);
    } else {
      todoCard.innerHTML = "<div class='container'>No todos to show</div>";
      clearButton.setAttribute("disabled", true);
    }
  }


  //Method for clearing all the todos
  clear() {
    localStorage.removeItem("todos");
    this.render();
  }

  //Method for filtering todos for search query
  filter(query){
    let todos;
    let savedTodos = localStorage.getItem("todos");
    if (savedTodos == null) {
      todos = [];
    } else {
      todos = JSON.parse(savedTodos);
    }
    let cards = document.getElementsByClassName('card');
    Array.from(cards).forEach((item)=>{
        let text = item.getElementsByTagName("p")[0].innerHTML;
        if(text.includes(query)){
            item.style.display = 'block';
        }else {
            item.style.display = 'none';
        }

    })
  }
}

window.addEventListener("load", () => {
  new Todo().render();
});

addTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let ins = new Todo(title.value, description.value);
  ins.save();
  title.value = "";
  description.value = "";
  ins.render();
});

clearButton.addEventListener("click", () => {
  let sure = confirm("Are you sure to want to delete all todos");
  if (sure) {
    let ins = new Todo();
    ins.clear();
  }
});

searchQuery.addEventListener("input", ()=>{
    let query = searchQuery.value;
    let ins = new Todo()
    ins.filter(query);
})
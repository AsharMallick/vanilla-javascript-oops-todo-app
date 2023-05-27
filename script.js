let title = document.getElementById("titleVal");
let description = document.getElementById("descriptionVal");
let addTodoForm = document.getElementById("todoForm");
let todoCard = document.getElementById("todoCards");
let clearButton = document.getElementById("clearBtn");
function deleted(item) {
  new Todo().deleted(item);
}
class Todo {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
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
  clear() {
    localStorage.removeItem("todos");
    this.render();
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

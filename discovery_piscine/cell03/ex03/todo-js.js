/* ******************** HANDLE COOKIE ******************** */
function setCookie(cname, cvalue, exdays) {
  const date = new Date();
  date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + date.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // console.log("Message- Set Cookies: ", document.cookie);
}

function getCookie(cname) {
  let name = cname + "=";
  let cookie_array = document.cookie.split(';');
  let i = 0;

  while (i < cookie_array.length) {
    let cookie = cookie_array[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      // console.log("Message- Get Cookies: ", cookie.substring(name.length, cookie.length));
      return (cookie.substring(name.length, cookie.length));
    }
    i++;
  }
  return "";
}

/* ********************   UI REFERENCES   ******************** */
const get_ft_list = document.getElementById('ft_list');
const get_button_new = document.getElementById('button-new');

/* ********************     SAVE TODOS     ******************** */
function save_todos() {
  const todos = [];
  let i = 0;
  while (i < get_ft_list.children.length) {
    todos.push(get_ft_list.children[i].textContent);
    i++;
  }
  setCookie('todos', JSON.stringify(todos), 365);
  // console.log("Saved todos:", todos);
}

/* ******************** CREATE TO-DO ITEMS ******************** */
function createTodo(text, prepend = true) {
  text = text.trim();
  if (text === "")
    return;
  const get_div = document.createElement('div');
  get_div.textContent = text;
  get_div.className = 'todo-item';

  get_div.addEventListener('click', function () {
    if (window.confirm("Remove this TO DO?")) {
      get_div.remove();
      // console.log('Removed TO DO: "' + text + '"');
      save_todos();
    }
  });

  if (prepend) {
    get_ft_list.prepend(get_div);
  } else {
    get_ft_list.appendChild(get_div);
  }
}


/* ********************   ADD NEW TO-DO   ******************** */
get_button_new.addEventListener('click', function () {
  var text = prompt("Enter a new TO DO:");
  if (text !== "" && text.trim() !== "") {
    createTodo(text);
    save_todos();
  }
});

/* ******************** LOAD SAVED TO-DO ******************** */
window.addEventListener('load', function () {
  var savedTodos = getCookie('todos');
  if (savedTodos) {
    var todos = JSON.parse(savedTodos);
    var i = 0;
    while (i < todos.length) {
      if (todos[i].trim() != "") {
        createTodo(todos[i], false);
      }
      i++;
    }
    // console.log("Saved Todos:", todos);
  }
});
// --- Cookie Helpers ---
function set_cookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}

function get_cookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  let i = 0;
  while (i < ca.length) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
    i++;
  }
  return "";
}

// --- Main ---
const get_ft_list     = document.getElementById('ft_list');
const get_button_new  = document.getElementById('button-new');

function todo_items() {
  const todos = [];
  let i = 0;
  while (i < get_ft_list.children.length) {
    todos.push(get_ft_list.children[i].textContent);
    i++;
  }
  set_cookie('todos', JSON.stringify(todos), 365);
}

function todo_create(text) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = 'todo-item';
  div.addEventListener('click', () => {
    if (confirm("Remove this TO DO?")) {
      div.remove();
      todo_items();
    }
  });
  get_ft_list.prepend(div);
}

get_button_new.addEventListener('click', () => {
  const pop_up_text = prompt("Create a new TO DO:");
  if (pop_up_text && pop_up_text.trim() !== "") {
    todo_create(pop_up_text.trim());
    todo_items();
  }
});

window.addEventListener('load', () => {
  const saved_todos = get_cookie('todos');
  if (saved_todos) {
    try {
      const todos = JSON.parse(saved_todos);
      let i = 0;
      while (i < todos.length) {
        todo_create(todos[i]);
        i++;
      }
    } catch (e) {
      console.error("Error parsing: saved_todos");
    }
  }
});

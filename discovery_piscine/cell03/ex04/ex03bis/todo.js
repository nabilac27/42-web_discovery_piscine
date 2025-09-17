$(document).ready(function() {
  const $ft_list = $('#ft_list');

  // --- Cookie Helpers ---
  function set_cookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
  }

  function get_cookie(name) {
    const cname = name + "=";
    const decoded = decodeURIComponent(document.cookie);
    const ca = decoded.split(';');
    for (let c of ca) {
      c = c.trim();
      if (c.indexOf(cname) === 0) return c.substring(cname.length);
    }
    return "";
  }

  // --- Save TODOs to cookie ---
  function save_todos() {
    const todos = [];
    $ft_list.children().each(function() {
      todos.push($(this).text());
    });
    set_cookie('todos', JSON.stringify(todos), 365);
  }

  // --- Create a TODO item ---
  function create_todo(text) {
    const $div = $('<div>').addClass('todo-item').text(text);
    $div.click(function() {
      if (confirm("Remove this TO DO?")) {
        $div.remove();
        save_todos();
      }
    });
    $ft_list.prepend($div);
  }

  // --- Button Click ---
  $('#button-new').click(function() {
    const text = prompt("Create a new TO DO:");
    if (text && text.trim() !== "") {
      create_todo(text.trim());
      save_todos();
    }
  });

  // --- Load saved TODOs ---
  const saved = get_cookie('todos');
  if (saved) {
    try {
      const todos = JSON.parse(saved);
      todos.forEach(todo => create_todo(todo));
    } catch (e) {
      console.error("Error parsing saved todos");
    }
  }
});

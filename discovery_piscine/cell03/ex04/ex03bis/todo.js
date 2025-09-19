$(document).ready(function () {

    /* ******************** HANDLE COOKIE ******************** */
    function setCookie(cname, cvalue, exdays) {
        const date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
                return cookie.substring(name.length, cookie.length);
            }
            i++;
        }
        return "";
    }

    /* ********************   UI REFERENCES   ******************** */
    const $ft_list = $("#ft_list");         // jQuery reference
    const $button_new = $("#button-new");   // jQuery reference

    /* ********************     SAVE TODOS     ******************** */
    function save_todos() {
        const todos = [];
        $ft_list.children().each(function () {      // replaces while loop
            todos.push($(this).text());           // replaces textContent
        });
        setCookie('todos', JSON.stringify(todos), 365);
    }

    /* ******************** CREATE TO-DO ITEMS ******************** */
    function createTodo(text, prepend = true) {
        text = text.trim();
        if (text === "") return;

        const $div = $("<div></div>").text(text).addClass("todo-item");

        $div.on("click", function () {
            if (window.confirm("Remove this TO DO?")) {
                $(this).remove();
                save_todos();
            }
        });

        if (prepend) $ft_list.prepend($div);
        else $ft_list.append($div);
    }

    /* ********************   ADD NEW TO-DO   ******************** */
    $button_new.on("click", function () {
        let text = prompt("Enter a new TO DO:");
        text = text ? text.trim() : "";
        if (text !== "") {
            createTodo(text);
            save_todos();
        }
    });

    /* ******************** LOAD SAVED TO-DO ******************** */
    let savedTodos = getCookie('todos');
    if (savedTodos) {
        let todos = JSON.parse(savedTodos);
        for (let todo of todos) {
            if (todo.trim() !== "") createTodo(todo, false);
        }
    }

});


/* 
             JS	                                    jQuery	                                      Notes
  ----------------------------------------------------------------------------------------------------------------------
  document.getElementById('ft_list')	         $("#ft_list")	                        $() selects element by ID with #
  .children + while loop	                    .children().each(function() {...})    	Iterates over children elements
  element.textContent	                        $(this).text()	                        Get/set text content in jQuery
  document.createElement('div') + className	  $("<div></div>").addClass("todo-item")	Creates div and adds class in one line
  .addEventListener('click', fn)	            .on("click", fn)	                      Event binding in jQuery
  .prepend() / .appendChild()	                .prepend($div) / .append($div)	        Adding elements to the DOM in jQuery
  window.addEventListener('load', fn)	        $(window).on("load", fn)	              Load event in jQuery


  * All DOM selections use $()
  * All event bindings use .on()
  * All element manipulation uses jQuery methods like .text(), .prepend(), .append(), .remove()

*/
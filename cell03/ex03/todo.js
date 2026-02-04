window.onload = function () {
    loadTodos();

    document.getElementById("new").onclick = function () {
        let text = prompt("New TO DO:");

        if (text && text.trim() !== "") {
            addTodo(text);
            saveTodos();
        }
    };
};

function addTodo(text) {
    let div = document.createElement("div");
    div.textContent = text;

    div.onclick = function () {
        if (confirm("Do you want to remove this TO DO?")) {
            div.remove();
            saveTodos();
        }
    };

    document.getElementById("ft_list").prepend(div);
}

function saveTodos() {
    let list = document.getElementById("ft_list");
    let todos = [];

    for (let i = 0; i < list.children.length; i++) {
        todos.push(list.children[i].textContent);
    }

    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos));
}

function loadTodos() {
    let cookies = document.cookie.split("; ");

    for (let c of cookies) {
        if (c.startsWith("todos=")) {
            let todos = JSON.parse(decodeURIComponent(c.substring(6)));

            for (let todo of todos.reverse()) {
                addTodo(todo);
            }
        }
    }
}

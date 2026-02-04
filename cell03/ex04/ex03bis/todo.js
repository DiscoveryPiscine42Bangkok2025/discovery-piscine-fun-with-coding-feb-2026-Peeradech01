$(function () {
    loadTodos();

    $("#new").on("click", function () {
        let text = prompt("New TO DO:");

        if (text && $.trim(text) !== "") {
            addTodo(text);
            saveTodos();
        }
    });
});

function addTodo(text) {
    let $div = $("<div></div>").text(text);

    $div.on("click", function () {
        if (confirm("Do you want to remove this TO DO?")) {
            $(this).remove();
            saveTodos();
        }
    });

    $("#ft_list").prepend($div);
}

function saveTodos() {
    let todos = [];

    $("#ft_list div").each(function () {
        todos.push($(this).text());
    });

    document.cookie =
        "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadTodos() {
    let cookies = document.cookie.split("; ");

    for (let c of cookies) {
        if (c.startsWith("todos=")) {
            let todos = JSON.parse(decodeURIComponent(c.substring(6)));

            $.each(todos.reverse(), function (_, todo) {
                addTodo(todo);
            });
        }
    }
}

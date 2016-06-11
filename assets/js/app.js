var app = app || {};

$(document).ready(function() {

    app.toDoItem = (function(element) {
        var self = this;
        this.toDoElement = $(element);
        this.isCompleted = false;
        this.isDeleted = false;
    });

    app.toDoItem.prototype.delete = function(elem) {
        this.isDeleted = !this.isDeleted;
        elem.fadeOut(function () {
            $(this).remove();
        });
    };

    app.toDoItem.prototype.complete = function(elem) {
        this.isCompleted = !this.isCompleted;
        elem.toggleClass('finished');
    };

    app.toDoList = (function() {
        var self = this;
        this.toDoListWrapper = $('ul.todos');
        this.todosElement = [];
        this.todosObject = [];

        this.addToDoItem = function(text) {
            console.log("add");
            var newElement = "<li class='todo'><span class='delete-button'><i class='fa fa-trash'></i></span>" + text + "</li>";
            self.toDoListWrapper.append(newElement);
            self.todosElement.push(newElement);
            self.todosObject.push(new app.toDoItem(newElement));
            console.log(self.todosObject);
        };

        var currentTodos = this.toDoListWrapper.find('.todo');
        for (var i = 0; i < currentTodos.length; i++) {
            this.todosElement.push(currentTodos[i]);
            this.todosObject.push(new app.toDoItem(currentTodos[i]));
        }

        $('.add-todo-input').on('keypress', function(event) {
            if (event.which === 13) {
                self.addToDoItem($(this).val());
                $(this).val("");
            }
        });

        this.toDoListWrapper.delegate("li.todo", "click", function() {
            var index = $('li.todo').index($(this));
            console.log(self.todosObject[index]);
            self.todosObject[index].complete($(this));
        });

        this.toDoListWrapper.delegate("li.todo span", "click", function($event) {
            $event.stopPropagation();
            var parent = $(this).parent();
            var index = $('li.todo').index(parent[0]);
            self.todosObject[index].delete(parent);
            self.todosElement.splice(index, 1);
            self.todosObject.splice(index, 1);
        });
    })();

    $('.fa-plus').on('click', function () {
        $('.add-todo-input').fadeToggle();
    })
});
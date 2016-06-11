$(document).ready(function() {

    var ToDoItem = function ToDoItem(element) {
        var self = this;
        this.jQueryElement = $(element);
        this.deleteButton = this.jQueryElement.find('.delete-button');
        this.isFinished = false;
        this.isDeleted = false;

        this.jQueryElement.on('click', function() {
            self.isFinished = !self.isFinished;
            $(this).toggleClass('finished');
        });

        this.deleteButton.on('click', function($event) {
            $event.stopPropagation();
            self.isDeleted = !self.isDeleted;
            $(this).parent().fadeOut(500, function() {
                $(this).remove();
            });
        });
    };

    var todos = $('.todo');
    for (var i = 0; i < todos.length; i++) {
        var todo = new ToDoItem(todos[i]);
    }

});
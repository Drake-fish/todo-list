//function to get the data that already exists in the server and manipulate that data
function getData() {
    var settings = {
        url: "http://tiny-za-server.herokuapp.com/collections/todolists",
        type: "GET",
        success: function(data, status, xhr) {
            data.forEach(function(list, i, arr) {
                var todo = $('.todo-container');
                var li = $('<li class="list">' + list.value + '<button class=complete><i class="fa fa-check" aria-hidden="true"></i></button><button class="delete"><i class="fa fa-trash" aria-hidden="true"></i></button></li>');
                todo.prepend(li);
                var id = list._id;
                var completedSection = $('.completed-container');
                var completeButton = $('.complete');
                li.find(completeButton).on('click', function(e) {
                    completedSection.append(li);
                    console.log(e);
                });
                var deleteButton = $('.delete');
                li.find(deleteButton).on('click', function(e) {
                    e.preventDefault();
                    var id = list._id;
                    var settings = {
                        url: "http://tiny-za-server.herokuapp.com/collections/todolists/" + id,

                        type: "DELETE",
                        success: function(list, status, xhr) {
                            li.hide();
                        },
                        error: function(list, status, xhr) {}
                    };
                    $.ajax(settings);

                });

            });

        },
        error: function(xhr, status, error) {
            console.log("There was an error on the ajax request " + error);
        }

    };

    $.ajax(settings);
}
getData();
//clicking on create button and manipulating that data
createButton = $('.create');
createButton.on('click', function(e, data) {
    e.preventDefault();
    var text = {
        value: $('.listText').val()
    };
    console.log(text);
    var settings = {
        url: "http://tiny-za-server.herokuapp.com/collections/todolists",
        type: "POST",
        success: function(list, status, xhr) {
            var todo = $('.todo-container');

            var li = $('<li class="list">' + list.value + '<button class=complete><i class="fa fa-check" aria-hidden="true"></i></button><button class="delete"><i class="fa fa-trash" aria-hidden="true"></i></button></li>');
            todo.prepend(li);
            var id = list._id;
            var completedSection = $('.completed-container');
            var completeButton = $('.complete');
            li.find(completeButton).on('click', function(e) {
                completedSection.append(li);
                console.log(e);
            });
            var deleteButton = $('.delete');
            li.find(deleteButton).on('click', function(e) {
                e.preventDefault();
                var id = list._id;
                var settings = {
                    url: "http://tiny-za-server.herokuapp.com/collections/todolists/" + id,
                    type: "DELETE",
                    success: function(list, status, xhr) {
                        li.hide();
                    },
                    error: function(list, status, xhr) {}
                };
                $.ajax(settings);
            });
        },
        error: function(status, error, xhr) {

        },
        contentType: "application/json",
        data: JSON.stringify(text)
    };
    $.ajax(settings);

});

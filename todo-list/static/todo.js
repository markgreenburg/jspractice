/**
 * Appends a given task's description to task list. Expects an object
 * with a "description" attribute. 
 */
let appendTask = (taskObj) => {
    const taskHtml = "<li id='" + taskObj.task_id + "'><input " +
        "class='check-done' type='checkbox'" + " name='is_done' />" + 
        taskObj.description + "</li>";
    $("ul#task-list").append(taskHtml);
}

/**
 * Submits GET request to /tasks endpoint, which returns list of all undeleted
 * tasks as response. Function appends each's description to the task list by 
 * calling append function.
 */
let appendAll = () => {
  $.get("/tasks", (response) => {
    console.log(response);
    response.forEach(appendTask);
  })
}

/**
 * Posts data to the add_task endpoint and, on success, appends the newly-added
 * task's description to the task list. If request fails, generates object 
 * literal with an error message as value for its "description" attribute.
 */
let postNewTask = (data) => {
  $.ajax({
      type: "POST",
      url: "/add_task",
      data: data,
      success: function(response) {
        appendTask(response);
      },
      error: function() {
        appendTask({description: "Sorry, I forgot that task!"});
      }
  });
}

/**
 * Serializes and passes a form's contents to AJAX POST function
 */
let addTask = (selector) => {
  $(selector).submit(function(event) {
    event.preventDefault();
    postNewTask($(selector).serialize());
  });
}

let updateTask = (selector) => {
  // Update the task in the db
    // Then change the strikethrough
}

/**
 * Main JQuery listener, waits for page ready
 */
$(() => {
  appendAll();
  addTask("form#form");
  $("input.check-done").click(function () {
    const is_done = $(this).prop('checked')
    console.log(is_done);
  });
});


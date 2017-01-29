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
    response.forEach(appendTask);
    response.forEach(toggleStrikethrough);
  })
}

/**
 * Posts data to the add_task endpoint and, on success, appends the newly-added
 * task's description to the task list. If request fails, generates object 
 * literal with an error message as value for its "description" attribute.
 */
let postNewTask = (data) => {
  console.log(data);
  $.ajax({
      type: "POST",
      url: "/add_task",
      data: data,
      success: function(response) {
        appendTask(response);
        $("form#form > input").val("");
      },
      error: function() {
        console.log("warning, task not saved!");
      }
  });
}

/**
 * Posts task updates and on success hands off to 
 * function that controls striking through list items
 */
let postTaskUpdate = (data) => {
  $.ajax({
    type: "POST",
    url: "/update_task",
    data: data,
    // success: toggleStrikethrough,
    success: toggleStrikethrough,
    error: () => console.log("Oops, something went wrong!")
  })
}

let hideDeleted = (response) => {
  response.forEach((task) => {
    $("li#" + task.task_id).remove();
  })
}

let setDelete = (idArray) => {
  console.log(idArray);
  $.ajax({
    type: "POST",
    url: "/delete_tasks",
    data: { "task_ids": idArray },
    success: hideDeleted,
    error: () => console.log("Oops, something went wrong!")
  })
}
/**
 * Checks whether task is completed and toggles strikethrough class accordingly
 */
let toggleStrikethrough = (response) => {
  const selector = "li#" + response.task_id.toString();
  if (response.is_done === "true" || response.is_done === true) { 
    $(selector).addClass("strikethrough");
    $(selector + " > input.check-done").prop("checked", true);
  } else if (response.is_done !== "true" || response.is_done === false) {
    $(selector).removeClass("strikethrough");
  }
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
  $(selector).on("click", "input.check-done", function () {
    const taskObj = {
        "is_done": $(this).prop('checked'),
        "task_id": Number($(this).parent().attr('id')),
        "description": $(this).parent().text()
    };
    postTaskUpdate(taskObj);
  });
}

/**
 * Main On Ready JQuery listener:
 * appendAll: Renders all non-deleted tasks on screen
 * addTask: Adds a task to the list and POSTs to DB on Enter keydown
 * updateTask: Updates a task's description and is_done on click of
 *             a task's checkbox. Crosses out marked tasks
 * removeDone: Removes all checked tasks from DB
 */
$(() => {
  appendAll();
  addTask("form#form");
  updateTask("ul#task-list");
  removeDone("button#remove-completed");
});

let getIds = (selector) => {
  return Number($(selector).attr('id'));
}

let removeDone = (selector) => {
  $(selector).on('click', () => {
    const selectorArray = Array.from($('li.strikethrough'));
    const task_ids = selectorArray.map(getIds);
    setDelete(task_ids);
  })
}


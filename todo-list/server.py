"""
Views, routes, and Flask app initization for To Do List
"""
from flask import Flask, jsonify, request, render_template
import models

APP = Flask('todo-list')

@APP.route('/')
def home():
    """
    To-Do Homepage
    """
    return render_template('index.html')

@APP.route('/list_tasks')
def list_tasks():
    """
    Gets all undeleted tasks from db
    """
    task_list = models.Task.get_tasks()
    return jsonify(task_list)

@APP.route('/delete_tasks', methods=["POST"])
def delete_tasks():
    """
    Endpoint that allows setting delete property of a list of tasks.
    Returns a list of task objects that were set to deleted.
    """
    tasks_to_delete = request.form.getlist("task_ids[]")
    deleted_tasks_list = []
    for task_id in tasks_to_delete:
        task_to_delete = models.Task(int(task_id))
        task_to_delete.delete()
        deleted_tasks_list.append(task_to_delete.serialize())
    return jsonify(deleted_tasks_list)

@APP.route('/add_task', methods=['POST'])
def add_task():
    """
    Saves a new task to the db and returns new task object.
    """
    description = request.form.get('task')
    new_task = models.Task()
    new_task.description = description
    new_task.save()
    return jsonify(new_task.serialize())

@APP.route('/update_task', methods=["POST"])
def update_task():
    """
    Updates a task's description and is_done attributes.
    Returns a JSON task object.
    """
    task_to_update = models.Task(request.form.get('task_id'))
    task_to_update.description = request.form.get('description')
    task_to_update.is_done = request.form.get('is_done')
    task_to_update.save()
    return jsonify(task_to_update.serialize())

if __name__ == '__main__':
    APP.run(debug=True)

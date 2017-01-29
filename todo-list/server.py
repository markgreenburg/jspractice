"""
Views, routes, and Flask app initization for To Do List
"""
from flask import Flask, jsonify, request, url_for
import models

app = Flask('todo-list')

@app.route('/')
def home():
    """
    To-Do Homepage
    """
    return app.send_static_file('index.html')

@app.route('/task')
def list_task():
    """
    Endpoint for returning one task's details
    """
    pass

@app.route('/tasks')
def list_tasks():
    """
    Gets all undeleted tasks from db
    """
    task_list = models.Task.get_tasks()
    return jsonify(task_list)

@app.route('/add_task', methods=['POST'])
def add_task():
    """
    Saves a new task to the db and returns new task object
    """
    print 'new task received!'
    description = request.form.get('task')
    new_task = models.Task()
    new_task.description = description
    new_task.save()
    return jsonify(new_task.serialize())

@app.route('/update_task', methods=["POST"])
def update_task():
    """
    Updates a task's properties, except 'deleted'
    """
    task_to_update = models.Task(request.form.get('task_id'))
    task_to_update.description = request.form.get('description')
    task_to_update.is_done = request.form.get('is_done')
    print task_to_update.is_done
    task_to_update.save()
    return jsonify(task_to_update.serialize())

@app.route('/delete_tasks', methods=["POST"])
def delete_tasks():
    """
    Endpoint that allows setting delete property of a list of tasks
    """
    tasks_to_delete = request.form.getlist("task_ids[]")
    deleted_tasks_list = []
    for task_id in tasks_to_delete:
        task_to_delete = models.Task(int(task_id))
        task_to_delete.delete()
        deleted_tasks_list.append(task_to_delete.serialize())
    # task_to_delete = models.Task(request.form.get('task_id'))
    # task_to_delete.is_deleted = request.form.get('is_deleted')
    # task_to_delete.save()
    return jsonify(deleted_tasks_list)

if __name__ == '__main__':
    app.run(debug=True)

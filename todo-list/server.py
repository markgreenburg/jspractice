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

@app.route('/update', methods=["POST"])
def update_task():
    """
    Updates a task's properties, except 'deleted'
    """
    task_to_update = models.Task(request.form.get('id'))
    task_to_update.description = request.form.get('description')
    task_to_update.is_done = request.form.get('is_done')
    task_to_update.save()
    return jsonify(task_to_update.serialize())



if __name__ == '__main__':
    app.run(debug=True)

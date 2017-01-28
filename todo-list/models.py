"""
DB interface and Object mapper
"""
import pg
import config

class Task(object):
    """
    Represents an individual task and all its attributes.
    """
    def __init__(self, task_id=0):
        """
        Task object initializer. Takes task_id as optional arg
        """
        sql = ("SELECT id, description, done, deleted FROM task WHERE id = $1"
               "LIMIT 1")
        task_object = DbConnect.get_named_results(sql, True, task_id)
        if task_object.id > 0:
            self.task_id = task_object.id
            self.description = task_object.description
            self.is_done = task_object.done
            self.is_deleted = task_object.deleted
        else:
            self.task_id = 0
            self.description = ''
            self.is_done = False
            self.is_deleted = False

    @staticmethod
    def get_tasks():
        """
        Gets all undeleted tasks from DB and returns them as a list of task
        dicts
        """
        sql = ("SELECT id FROM task WHERE NOT deleted")
        tasks_id_obj = DbConnect.get_named_results(sql, False)
        task_obj_list = []
        for task in tasks_id_obj:
            task_obj = Task(task.id).serialize()
            task_obj_list.append(task_obj)
        return task_obj_list

    def insert(self):
        """
        Inserts new tasks into db. Is called via the save(self) method
        """
        sql = ("INSERT INTO task (description, done) VALUES ($1, $2) RETURNING"
               " id")
        task_id_obj = DbConnect.get_named_results(sql, True, self.description,
                                                  self.is_done)
        self.task_id = task_id_obj.id
        return self.task_id

    def update(self):
        """
        Updates existing Tasks with new task info from the interface
        """
        sql = ("UPDATE task SET description = $1, done = $2 WHERE id = $3"
               " RETURNING id")
        task_id_obj = DbConnect.get_named_results(sql, True, self.description,
                                                  self.is_done,
                                                  self.task_id)
        return task_id_obj.id

    def save(self):
        """
        Checker that routes db write requests through either insert() or save()
        methods depending on whether a Task is already in the db.
        """
        if self.task_id > 0:
            self.update()
        else:
            self.insert()
        return self.task_id

    def delete(self, delete=True):
        """
        Soft-deletes a task by setting its 'deleted' attribute to 1. Optionally
        undeletes tasks as well if 'False' bool is passed in.
        """
        sql = ("UPDATE task SET deleted = $1 WHERE id = $2 RETURNING id")
        self.is_deleted = delete
        task_id_obj = DbConnect.get_named_results(sql, True, self.is_deleted,
                                                  self.task_id)
        return task_id_obj.id

    def serialize(self):
        """
        Dictifies the task object to allow conversion and sending through JSON
        """
        return {
            "task_id": self.task_id,
            "description": self.description,
            "is_done": self.is_done
        }

class DbConnect(object):
    """
    Collection of static methods that set up our DB connection and create
    generalized methods for running queries / establish and release
    connections in pSQL
    """
    @staticmethod
    def get_connection():
        """
        Sets up the postgreSQL connection by loading in db settings from config
        """
        return pg.DB(
            host=config.DBHOST,
            user=config.DBUSER,
            passwd=config.DBPASS,
            dbname=config.DBNAME
            )

    @staticmethod
    def escape(value):
        """
        Escapes apostrophes in SQL
        """
        return value.replace("'", "''")

    @staticmethod
    def get_named_results(sql, get_one, *args):
        """
        Opens a connection to the db, executes a query, gets results using
        pSQL's named_results, and then closes the connection.
        Args: query   - pSQL query as string
              get_one - Bool that determines whether list or first
                        result of list are returned (default = False)
              *args   - pass in as many parameters for the query as needed
        Returns: the fetchOne or fetchAll of the query. Returns empty object
        if get_one is True and no results found.
        """
        conx = DbConnect.get_connection()
        query = conx.query(sql, *args)
        results = query.namedresult()
        if get_one:
            if len(results) == 0:
                results = type('empty', (), {'id': 0})()
            else:
                results = results[0]
        conx.close()
        return results

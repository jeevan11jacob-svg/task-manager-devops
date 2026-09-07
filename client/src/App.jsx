import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
      });
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title: newTask,
          priority: "Medium",
          status: "To Do",
        }
      );

      setTasks([response.data, ...tasks]);
      setNewTask("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const editTask = (task) => {
    setNewTask(task.title);
    setEditingTask(task);
  };

  const updateTask = async () => {
    if (!newTask.trim() || !editingTask) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${editingTask._id}`,
        {
          title: newTask,
        }
      );

      setTasks(
        tasks.map((task) =>
          task._id === editingTask._id ? response.data : task
        )
      );

      setNewTask("");
      setEditingTask(null);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>DevOps Task Manager</h1>
        <p>Manage your development and DevOps tasks</p>
      </header>

      <section className="dashboard">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>
            {tasks.filter((task) => task.status === "In Progress").length}
          </p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>
            {tasks.filter((task) => task.status === "Completed").length}
          </p>
        </div>
      </section>

      <section className="add-task">
        <input
          type="text"
          placeholder={
            editingTask ? "Edit task..." : "Enter a new task..."
          }
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        {editingTask ? (
          <button onClick={updateTask}>Update Task</button>
        ) : (
          <button onClick={addTask}>+ Add Task</button>
        )}
      </section>

      <section className="tasks">
        <h2>My Tasks</h2>

        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <div>
              <h3>{task.title}</h3>

              <span>Priority: {task.priority}</span>

              <span>Status: {task.status}</span>
            </div>

            <div>
              <button onClick={() => editTask(task)}>Edit</button>

              <button onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;


import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");
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
          <p>{tasks.filter((task) => task.status === "In Progress").length}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{tasks.filter((task) => task.status === "Completed").length}</p>
        </div>
      </section>

      <section className="add-task">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button onClick={addTask}>+ Add Task</button>
      </section>

      <section className="tasks">
        <h2>My Tasks</h2>

        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <div>
              <h3>{task.title}</h3>

              <span>
                Priority: {task.priority}
              </span>

              <span>
                Status: {task.status}
              </span>
            </div>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
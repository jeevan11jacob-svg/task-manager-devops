import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn Docker",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Create Jenkins Pipeline",
      priority: "High",
      status: "To Do",
    },
    {
      id: 3,
      title: "Deploy Application to AWS",
      priority: "Medium",
      status: "To Do",
    },
    {
      id: 4,
      title: "Learn Git",
      priority: "Low",
      status: "Completed",
    },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      priority: "Medium",
      status: "To Do",
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
          <div className="task-card" key={task.id}>
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
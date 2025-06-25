import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ date: '', status: '' });

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3001/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const res = await axios.post('http://localhost:3001/tasks', task);
    setTasks([...tasks, res.data]);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (task) => {
    setEditingTask(task);
  };

  const updateTask = async (task) => {
    const res = await axios.put(`http://localhost:3001/tasks/${task.id}`, task);
    setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
    setEditingTask(null);
  };

  const handleFilter = (filter) => {
    setFilters(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchDate = filters.date ? task.date === filters.date : true;
    const matchStatus = filters.status ? task.status === filters.status : true;
    return matchDate && matchStatus;
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📅 Today Schedule App</h2>

      <TaskForm
        addTask={addTask}
        editingTask={editingTask}
        updateTask={updateTask}
      />

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        startEdit={startEdit}
        onFilter={handleFilter}
      />
    </div>
  );
};

export default App;

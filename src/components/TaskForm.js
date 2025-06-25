import React, { useEffect, useState } from 'react';

const TaskForm = ({ addTask, editingTask, updateTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    status: 'Pending',
  });

  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
    } else {
      setFormData({ title: '', date: '', status: 'Pending' });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(formData);
    } else {
      addTask(formData);
    }
    setFormData({ title: '', date: '', status: 'Pending' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md-4">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter task"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            name="date"
            className="form-control"
            required
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>Completed</option>
            <option>Forwarded</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {editingTask ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;

import React, { useState } from 'react';

const TaskList = ({ tasks, deleteTask, startEdit, onFilter }) => {
  const [filters, setFilters] = useState({ date: '', status: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <>
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <input
            type="date"
            name="date"
            className="form-control"
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-6">
          <select
            name="status"
            className="form-select"
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Forwarded</option>
          </select>
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Status</th>
            <th style={{ width: '180px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-muted">No tasks found</td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.date}</td>
                <td>{task.status}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => startEdit(task)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default TaskList;

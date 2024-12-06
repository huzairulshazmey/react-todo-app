import React, { useState } from 'react';
import './AddTaskForm.css';

const AddTaskForm = ({ onAddTask }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [task, setTask] = useState({
        text: '',
        status: 'PENDING',
        dueDate: '',
        priority: 'MEDIUM',
        createdAt: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            ...task,
            createdAt: new Date().toISOString(),
            id: Date.now() // temporary ID generation
        };
        onAddTask(newTask);
        setTask({
            text: '',
            status: 'PENDING',
            dueDate: '',
            priority: 'MEDIUM',
            createdAt: ''
        });
        setIsFormOpen(false);
    };

    return (
        <div className="add-task-container">
            {!isFormOpen ? (
                <button 
                    className="add-task-button"
                    onClick={() => setIsFormOpen(true)}
                >
                    + Add New Task
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="add-task-form">
                    <div className="form-group">
                        <label>Task Description</label>
                        <input
                            type="text"
                            value={task.text}
                            onChange={(e) => setTask({...task, text: e.target.value})}
                            placeholder="Enter task description"
                            required
                        />
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                value={task.status}
                                onChange={(e) => setTask({...task, status: e.target.value})}
                            >
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>Due Date</label>
                            <input
                                type="date"
                                value={task.dueDate}
                                onChange={(e) => setTask({...task, dueDate: e.target.value})}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Priority</label>
                            <select
                                value={task.priority}
                                onChange={(e) => setTask({...task, priority: e.target.value})}
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            Add Task
                        </button>
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={() => setIsFormOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddTaskForm; 
import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ data, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(data);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(editedTask);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <form onSubmit={handleSubmit} className="edit-task-form">
                <div className="form-group">
                    <input
                        type="text"
                        value={editedTask.text}
                        onChange={(e) => setEditedTask({...editedTask, text: e.target.value})}
                        placeholder="Task description"
                        required
                    />
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <select
                            value={editedTask.status}
                            onChange={(e) => setEditedTask({...editedTask, status: e.target.value})}
                        >
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <input
                            type="date"
                            value={editedTask.dueDate}
                            onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <select
                            value={editedTask.priority}
                            onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                </div>

                <div className="edit-actions">
                    <button type="submit" className="save-button">
                        Save
                    </button>
                    <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div className="todo-item" onClick={() => setIsEditing(true)}>
            <div className="todo-content">
                <span className="todo-text">{data.text}</span>
                <div className="todo-details">
                    <span className={`priority-tag priority-${data.priority.toLowerCase()}`}>
                        {data.priority}
                    </span>
                    <span className="date-tag">
                        <i className="far fa-calendar"></i> Due: {formatDate(data.dueDate)}
                    </span>
                </div>
            </div>
            <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(data.id); }}>Delete</button>
        </div>
    );
};

export default TodoItem;

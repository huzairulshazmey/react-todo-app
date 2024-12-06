import React from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TodoList.css';
import AddTaskForm from './AddTaskForm';

const COLUMNS = {
    PENDING: {
        id: 'PENDING',
        title: 'Pending',
        color: '#ff9f43'
    },
    IN_PROGRESS: {
        id: 'IN_PROGRESS',
        title: 'In Progress',
        color: '#54a0ff'
    },
    COMPLETED: {
        id: 'COMPLETED',
        title: 'Completed',
        color: '#10ac84'
    }
};

export default function TodoList(props) {
    const { list } = props.data;
    const { changeStatus, addNew, editTask, deleteTask } = props.actions;

    const getColumnItems = (status) => {
        return list.filter(item => item.status === status);
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Update the item's status based on which column it was dropped in
        changeStatus(parseInt(draggableId, 10), destination.droppableId);
    };

    const handleAddTask = (newTask) => {
        // Ensure the task has all required properties
        const task = {
            ...newTask,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };
        addNew(task);
    };

    return (
        <div className="kanban-container">
            <AddTaskForm onAddTask={handleAddTask} />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="kanban-board">
                    {Object.values(COLUMNS).map(column => (
                        <div key={column.id} className="kanban-column">
                            <div 
                                className="column-header" 
                                style={{ backgroundColor: column.color }}
                            >
                                <h2>{column.title}</h2>
                                <span className="task-count">
                                    {getColumnItems(column.id).length} tasks
                                </span>
                            </div>
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {getColumnItems(column.id).map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id.toString()}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
                                                    >
                                                        <TodoItem
                                                            data={item}
                                                            onEdit={editTask}
                                                            onDelete={deleteTask}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}

import React, { useState } from 'react';
import './ToDoItem.css';
import { format, parseISO } from 'date-fns';

const ToDoItem = ({ todo, updateTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleUpdate = () => {
        updateTodo({
            ...todo,
            text: newText
        });
        setIsEditing(false);
    };

    return (
        <li className={`todo-item ${todo.completed ? 'todo-item-completed' : ''}`}>
            {isEditing ? (
                <input 
                    type="text" 
                    value={newText} 
                    onChange={(e) => setNewText(e.target.value)} 
                />
            ) : (
                <>
                    <span>{todo.text}</span>
                    <span className="todo-item-date">{format(parseISO(todo.date), 'dd/MM/yyyy')}</span>
                </>
            )}
            <div className="todo-item-actions">
                <button onClick={() => updateTodo({ ...todo, completed: !todo.completed })}>
                    {todo.completed ? 'Desmarcar' : 'Marcar'}
                </button>
                <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Salvar' : 'Editar'}
                </button>
                <button className="delete" onClick={() => deleteTodo(todo.id)}>Deletar</button>
            </div>
        </li>
    );
};

export default ToDoItem;

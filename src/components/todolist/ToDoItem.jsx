import React, { useState } from 'react';
import './ToDoItem.css';
import { format, parseISO, isToday } from 'date-fns';

const ToDoItem = ({ todo, updateTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleUpdate = () => {
        if (newText.trim() === '') {
            return; // Não permite salvar uma tarefa com texto vazio
        }
        updateTodo({
            ...todo,
            text: newText
        });
        setIsEditing(false);
    };

    const isDueToday = isToday(parseISO(todo.date)); // Verifica se a data é hoje

    return (
        <li className={`todo-item ${todo.completed ? 'todo-item-completed' : ''} ${isDueToday ? 'todo-item-today' : ''}`}>
            {isEditing ? (
                <>
                    <input 
                        type="text" 
                        value={newText} 
                        onChange={(e) => setNewText(e.target.value)} 
                    />
                    <button onClick={handleUpdate}>Salvar</button>
                </>
            ) : (
                <>
                    <span>{todo.text}</span>
                    <span className="todo-item-date">{format(parseISO(todo.date), 'dd/MM/yyyy HH:mm')}</span> {/* Formato atualizado */}
                </>
            )}
            <div className="todo-item-actions">
                <button onClick={() => updateTodo({ ...todo, completed: !todo.completed })}>
                    {todo.completed ? 'Desmarcar' : 'Marcar'}
                </button>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)}>
                        Editar
                    </button>
                )}
                <button className="delete" onClick={() => deleteTodo(todo.id)}>Deletar</button>
            </div>
        </li>
    );
};

export default ToDoItem;

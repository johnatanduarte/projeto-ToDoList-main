import React, { useState, useEffect } from 'react';
import AddToDo from './AddToDo';
import ToDoItem from './ToDoItem';
import './ToDoList.css';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:3000/todos');
                const todos = await response.json();
                setTodos(ttodos);
            } catch (err) {
                console.error('Erro ao buscar tarefas:', err);
            }
        };

        fetchTodos();
    }, []);

    const addTodo = async (todo) => {
        try {
            const response = await fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo)
            });

            const newTodo = await response.json();
            setTodos([...todos, newTodo]);
        } catch (err) {
            console.error('Erro ao adicionar tarefa:', err);
        }
    };

    const updateTodo = async (updatedTodo) => {
        try {
            await fetch(`http://localhost:3000/todos/${updatedTodo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTodo)
            });

            setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
        } catch (err) {
            console.error('Erro ao atualizar tarefa:', err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:3000/todos/${id}`, {
                method: 'DELETE'
            });

            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error('Erro ao deletar tarefa:', err);
        }
    };

    return (
        <div className="todo-list">
            <h1>Lista de Tarefas</h1>
            <AddToDo addTodo={addTodo} />
            <ul>
                {todos.map(todo => (
                    <ToDoItem 
                        key={todo.id} 
                        todo={todo} 
                        updateTodo={updateTodo} 
                        deleteTodo={deleteTodo} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;

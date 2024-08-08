import React, { useState, useEffect } from 'react';
import AddToDo from './AddToDo';
import ToDoItem from './ToDoItem';
import './ToDoList.css';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const todos = await response.json();
                setTodos(todos);
            } catch (err) {
                console.error('Erro ao buscar tarefas:', err);
            }
        };

        fetchTodos();
    }, []);

    const addTodo = async (todo) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo)
            });

            const newTodo = await response.json();
            setTodos([newTodo, ...todos]);
        } catch (err) {
            console.error('Erro ao adicionar tarefa:', err);
        }
    };

    const updateTodo = async (updatedTodo) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, {
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
            await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            });

            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error('Erro ao deletar tarefa:', err);
        }
    };

    return (
        <div className="container-principal">
            <div className="container-tarefas">
                <h1>Lista de Tarefas</h1>
                <AddToDo addTodo={addTodo} />
            </div>
            <div className="container-list">
                <div className="todo-list">
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
            </div>
        </div>
    );
};

export default ToDoList;

import React, { useState, useEffect } from 'react';
import AddToDo from './AddToDo';
import ToDoItem from './ToDoItem';
import './ToDoList.css';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchTodos = async () => {
            if (!userId) {
                return; // Prevenindo a busca se o usuário não estiver logado
            }

            try {
                const response = await fetch(`http://localhost:3001/todos/${userId}`);
                if (!response.ok) {
                    throw new Error('Falha ao buscar tarefas');
                }
                const fetchedTodos = await response.json();
                setTodos(fetchedTodos);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
                // Exibir uma mensagem de erro ao usuário (opcional)
            }
        };

        fetchTodos();
    }, [userId]);


    const addTodo = async (todo) => {
        try {
            const response = await fetch('http://localhost:3001/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo)
            });

            const newTodo = await response.json();
            newTodo.id = Date.now(); // Gera um id único baseado no timestamp
            setTodos([newTodo, ...todos]);
        } catch (err) {
            console.error('Erro ao adicionar tarefa:', err);
        }
    };

    const updateTodo = async (updatedTodo) => {
        try {
            await fetch(`http://localhost:3001/todos/${updatedTodo.id}`, {
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
            const response = await fetch(`http://localhost:3001/todos/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar tarefa');
              }

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

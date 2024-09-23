import React, { useState, useEffect } from 'react';
import AddToDo from './AddToDo';
import ToDoItem from './ToDoItem';
import './ToDoList.css';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);
    const [completedTasksByMonth, setCompletedTasksByMonth] = useState([]);
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
                // Agrupa tarefas completadas logo após carregá-las
                groupTasksByMonth(fetchedTodos);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
                // Exibir uma mensagem de erro ao usuário (opcional)
            }
        };

        fetchTodos();
    }, [userId]);


const addTodo = async (todo) => {
    try {
        const formattedDate = new Date(todo.date).toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:MM:SS

        const response = await fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: todo.user_id,
                text: todo.text,
                date: formattedDate,
                completed: todo.completed
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar tarefa');
        }

        const newTodo = await response.json();
        const updatedTodos = [newTodo, ...todos];
        setTodos(updatedTodos);
        groupTasksByMonth(updatedTodos); // Atualiza a tabela ao adicionar nova tarefa
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

            const updatedTodos = todos.map(todo =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            );
            setTodos(updatedTodos);
            groupTasksByMonth(updatedTodos); // Atualiza a tabela ao atualizar uma tarefa

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

            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);
            groupTasksByMonth(updatedTodos); // Atualiza a tabela ao deletar uma tarefa
        } catch (err) {
            console.error('Erro ao deletar tarefa:', err);
        }
    };

    // Função para agrupar tarefas completadas por mês
    const groupTasksByMonth = () => {
        const completedTasks = todos.filter(todo => todo.completed === true);

        const tasksByMonth = completedTasks.reduce((acc, task) => {
            const month = task.date.slice(0,7); //Formato YYYY-MM
            acc[month] = (acc[month] || 0) + 1; //Conta a quantidade de tarefas
            return acc;
        }, {});

        // Convertendo o objeto em array para facilitar a renderização
        const formattedData = Object.keys(tasksByMonth).map(month => ({
            month,
            count: tasksByMonth[month],
        }));

        setCompletedTasksByMonth(formattedData);
    };

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
                // Agrupa tarefas completadas logo após carregá-las
                groupTasksByMonth(fetchedTodos);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
            }
        };

        fetchTodos();
    }, [userId]); // Carregar tarefas ao carregar o componente


    return (
        <div className="container-principal">
            <div className="container-tarefas">
                <h1>Lista de Tarefas</h1>
                <AddToDo addTodo={addTodo} />
                <button className="tarefas-button" onClick={() => setShowCompleted(!showCompleted)}>
                    {showCompleted ? 'Todas as Tarefas' : 'Tarefas Completadas'}
                </button>
            </div>
            {/* Exibição condicional: Lista de tarefas ou tabela de tarefas completadas*/}
            {!showCompleted ? (
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
            ) : (
                <div className="container-tabela">
                    <h3>Tarefas Completadas por Mês</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Mês</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedTasksByMonth.map(({month, count}) => (
                                <tr key ={month}>
                                    <td>{month}</td>
                                    <td>{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ToDoList;

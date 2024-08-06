import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddToDo.css';

const AddToDo = ({ addTodo }) => {
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (text.trim() === '') {
            setError('Por favor, insira uma tarefa.');
            return;
        }

        addTodo({
            userId: 1, // Valor fictício para o exemplo
            title: text,
            date: date.toISOString(),
            completed: false
        });
        setText('');
        setDate(new Date()); // Resetar a data para a atual
        setError(''); // Limpa a mensagem de erro após adicionar a tarefa com sucesso
    };

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <input 
                className="add-todo-input"
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Adicionar nova tarefa" 
            />
            <DatePicker 
                selected={date} 
                onChange={(date) => setDate(date)} 
                className="add-todo-datepicker"
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm"
                timeFormat="HH:mm"
                timeIntervals={15}
                placeholderText="Selecione a data e hora"
            />
            <button className="add-todo-button" type="submit">Adicionar</button>
            {error && <p className="error-message">{error}</p>} {/* Exibir mensagem de erro se houver */}
        </form>
    );
};

export default AddToDo;

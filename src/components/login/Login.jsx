import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Mantendo as importações
import logo from "../../assets/Todo List.svg";
import feito from "../../assets/feito.png";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate para navegação

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Requisição para validar o login
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const user = await response.json();
                
                // Armazenar userId no localStorage
                localStorage.setItem('userId', user.id);
                
                // Redirecionar para a lista de tarefas com o userId
                navigate('/todolist', { state: { userId: user.id } });
            } else {
                alert('Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao verificar usuário:', error);
        }
    };

    return (
        <div className="container-login">
            <header className="header">
                <img src={logo} alt="ToDoList" />
                <span>To Do List</span>
            </header>

            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="inputContainer">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <a href="">Esqueci minha senha</a>

                <button className="button" type="submit">Entrar <img src={feito} alt="ícone feito" /> </button>

                <div className="footer">
                    <p>Não possui uma conta? </p>
                    <Link to="/cadastrar">Criar uma conta!</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;

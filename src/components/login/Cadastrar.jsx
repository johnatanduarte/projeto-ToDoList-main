import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Todo List.svg"; 
import feito from "../../assets/feito.png"; 
import "./login.css";

const Cadastrar = () => {
    // State para armazenar os valores dos campos de entrada
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [confirmarEmail, setConfirmarEmail] = useState(''); // Novo estado para o e-mail de confirmação
    const [password, setPassword] = useState('');

    // Função para lidar com o envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email !== confirmarEmail) {
            alert('Os e-mails não coincidem.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: nome,
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                // Redirecionar para o login após o cadastro
                window.location.href = '/login';
            } else {
                alert('Erro ao cadastrar. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };

    return (
        <div className="container-login">
            <header className="header">
                <img src={logo} alt="ToDoList" /> 
                <span>Cadastrar</span>
            </header>

            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        id="nome"
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
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
                    <label htmlFor="confirmarEmail">Confirmar E-mail:</label> {/* Campo de confirmação de e-mail */}
                    <input
                        type="text"
                        name="confirmarEmail"
                        id="confirmarEmail"
                        placeholder="Confirme seu e-mail"
                        value={confirmarEmail}
                        onChange={(e) => setConfirmarEmail(e.target.value)}
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

                <button className="button">Cadastrar <img src={feito} alt="feito" /></button>

                <div className="footer">
                    <p>Já possui uma conta? </p>
                    <Link to="/login">Login!</Link>
                </div>
            </form>
        </div>
    );
};
 
export default Cadastrar;

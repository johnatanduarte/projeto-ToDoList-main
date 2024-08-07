import React, { useState } from "react";
import logo from '../assets/Todo List.svg';
import feito from '../assets/feito.png';
import '../global.css'

const Login = () => {
    // State para armazenar os valores dos campos de entrada
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Função para lidar com o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log('E-mail:', email, 'Senha:', password);
        
    };

    return ( 
        <div className="container">
            <header className="header">
                <img src={logo} alt="ToDoList" /> 
                <span>To Do List</span>
            </header>

            <form>
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

                <button className="button">Entrar <img src={feito} /> </button>

                <div className="footer">
                    <p>Não possui uma conta? </p>
                    <a href="#">Criar uma conta!</a>
                </div>
            </form>
        </div>
     );
};
 
export default Login;

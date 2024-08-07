import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Todo List.svg"; 
import "./Home.css"; // Importe o arquivo CSS para aplicar os estilos

const Home = () => {
  return (
    <div className="container-fundo">
      <div className="heading-container">
      <header className="header">
        <img src={logo} alt="ToDoList" /> 
        <h2>To Do List</h2>
      </header>

        <div className="buttons-position">
          <Link to="/Login" className="link">
            <button className="button" type="submit">Login</button>
          </Link>
          <Link to="/Cadastrar" className="link">
            <button className="button" type="submit">Cadastrar</button>
          </Link>
        </div>

      </div>
      <div className="links-container">

        <Link to="/Login" className="link">Login</Link>
        <Link to="/Cadastrar" className="link">Cadastrar</Link>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import "./firstComponent.css"; // Importe o arquivo CSS para aplicar os estilos

const FirstComponent = () => {
  return (
    <div className="container-fundo">
      <div className="heading-container">
        <h1>Bem-vindo</h1>
        <h2>TODOList</h2>
      </div>
      <div className="links-container">
        <Link to="/Login" className="link">Login</Link>
        <Link to="/Cadastrar" className="link">Cadastrar</Link>
      </div>
    </div>
  );
};

export default FirstComponent;

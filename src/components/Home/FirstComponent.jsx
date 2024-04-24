import React from "react";
import { Link } from "react-router-dom";
import "./firstComponent.css"; // Importe o arquivo CSS para aplicar os estilos

const FirstComponent = () => {
  return (
    <div className="container">
      <h1>Meu primeiro componente</h1>
      <div className="links-container"> {/* Envolve os links em uma div */}
        <Link to="/Login" className="link">Login</Link> {/* Adiciona a classe 'link' para aplicar estilos */}
        <Link to="/Cadastrar" className="link">Cadastrar</Link> {/* Adiciona a classe 'link' para aplicar estilos */}
      </div>
    </div>
  );
};

export default FirstComponent;

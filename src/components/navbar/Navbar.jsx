import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <nav>
          <a href="/Home" >Home</a>
          <a href="/Login" >Login</a>
          <a href="/cadastrar" >Cadastro</a>
      </nav>
  );
};

export default Navbar;
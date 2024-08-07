import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <Link to="/Home" >Home</Link>
        <Link to="/Login" >Login</Link>
    </nav>
  );
};

export default Navbar;
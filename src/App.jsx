import { useState } from 'react'
import './App.css'
import './global.css';
import { Outlet } from 'react-router-dom' //Reaproveitamento de estrutura
import Navbar from './components/navbar/Navbar' //Navegar entre lnks
import Footer from './components/footer/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App

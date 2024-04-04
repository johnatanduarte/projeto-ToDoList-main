import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FirstComponent from './components/FirstComponent'
import TemplateExpressions from './components/TemplateExpressions'
import MyComponent from './components/MyComponent'
import Events from './components/Events'
import cr7Image from './assets/cr7.jpg' 
import ListRender from './components/ListRender'
import CondicionalRender from './components/CondicionalRender'
import ShowUserName from './components/ShowUserName'
import './App.css'
import CarDetails from './components/CarDetails'
import './global.css';
import { Outlet } from 'react-router-dom' //Reaproveitamento de estrutura
import Navbar from './components/Navbar' //Navegar entre lnks
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  const cars = [
    { id: 1, brand: "Ferrari", color: "Amarelo", km: 0 },
    { id: 2, brand: "KIA", color: "Branco", km: 200000 },
    { id: 1, brand: "Renault", color: "Azul", km: 32000 },
  ];

  function showMessage(){
    console.log("Evento do componente pai");
}

  return (
    <>
    {/* <div>
        <img src={cr7Image} alt="Cristiano Ronaldo" title='CR7' /> 
      </div>
      <div>
        <img src="/JPG-Alta-Qualidade.jpg" alt="Descrição da imagem" />
      </div> 
    */} 
      <Navbar />
      <Outlet />
      {/*
      <FirstComponent />
      <TemplateExpressions />
      <MyComponent />
      <Events />
      <ListRender />
      <CondicionalRender />
      <ShowUserName name="Johnatan" />
      <CarDetails brand="VW" km={100000} color="Azul" />
      {cars.map((car) => (
        <CarDetails
        key={car.id}
        brand={car.brand}
        color={car.color}
        km={car.km}
        />
      ))}
      
      */}
      <Footer />
    </>
  )
}

export default App

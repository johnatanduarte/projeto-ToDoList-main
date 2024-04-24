import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// configurando router -> navegação de paginas 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './components/login/Login.jsx';
import Cadastrar from './components/login/Cadastrar.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import FirstComponent from './components/Home/FirstComponent.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, //Pag de erro
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "Cadastrar",
        element: <Cadastrar />,
      },
      {
        path: "FirstComponent",
        element: <FirstComponent />,
      }, 
    ],
  },
]);//array com as rotas de navegação 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

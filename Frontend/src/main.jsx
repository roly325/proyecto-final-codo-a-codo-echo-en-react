import React from 'react'
import ReactDOM from 'react-dom/client'
import { NavBar } from './assets/Componentes/NavBar'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './assets/estilos/mainEstilos.css'
import { Administrador } from './assets/Componentes/Administrador';
import { Altas } from './assets/Componentes/Altas';
import { PruebaAnidadas } from './assets/Componentes/PruebaAnidadas';
import { ListadoProductos } from './assets/Componentes/ListadoProductos';
import {ModificarProducto} from './assets/Componentes/ModificarProducto';
import { EliminarProductos } from './assets/Componentes/EliminarProductos';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
   <BrowserRouter>
   <NavBar/>
   <Routes>
      
      
        <Route path="/" element={<Administrador />}/>
        
        <Route path="altas" element={<Altas />}/>

        <Route path="listado" element={<ListadoProductos />}/>

        <Route path="modificaciones" element={<ModificarProducto/>}/>

        <Route path="eliminar" element={<EliminarProductos/>}/>

      
      </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)

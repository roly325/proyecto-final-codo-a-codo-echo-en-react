import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Titulo } from '../estilos/EstilosGenerales';
import { BotonContenedor, LinkBoton } from './../estilos/EstilosGenerales';
import { Buscador } from './Buscador';

// const URL = "http://127.0.0.1:5000/";
   const URL = "https://Roli325.pythonanywhere.com/";


//Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
//const URL = "https://USUARIO.pythonanywhere.com/";

export const EliminarProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = () => {
    fetch(URL + 'productos')
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Error al obtener los productos.');
      })
      .then(data => setProductos(data))
      .catch(error => {
        console.error('Error:', error);
        alert('Error al obtener los productos.');
      });
  };
  const buscarProductos = async (nombre) => {
    if (!nombre) { // Si no hay nombre de producto, cargar todos los productos
      obtenerProductos();
      return;
    }
  
    try {
      const response = await fetch(`${URL}productos/buscar?nombre=${nombre}`);
      if (!response.ok) {
        throw new Error('Error al buscar los productos. Código de error: ' + response.status);
      }
      const data = await response.json();
      setProductos(data); // Actualizar la lista de productos con los resultados de búsqueda
    } catch (error) {
      console.error('Error al buscar los productos:', error);
      alert('Error al buscar los productos. Verifica la consola para más detalles.');
    }
  };
  
  const eliminarProducto = (codigo) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      fetch(URL + `productos/${codigo}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            obtenerProductos();
            alert('Producto eliminado correctamente.');
          } else {
            throw new Error('Error al eliminar el producto.');
          }
        })
        .catch(error => {
          alert(error.message);
        });
    }
  };

  return (
    <Container>
      <Titulo>Eliminar Productos</Titulo>
      <Buscador onBuscar={buscarProductos}/>
      <ProductTable>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.codigo}>
              <td>{producto.codigo}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.precio}</td>
              <td>
                <DeleteButton onClick={() => eliminarProducto(producto.codigo)}>Eliminar</DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <BotonContenedor>
        <LinkBoton to="/admin">ADMINISTRADOR</LinkBoton>
      </BotonContenedor>
    </Container>
  );
};


const ProductTable = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    background-color: rgba(54, 54, 52, 0.8);
    color:white;
  }

  th {
    background-color: rgba(54, 54, 52, 0.8);
    text-align: left;
    color:white;
  }

  td {
    text-align: right;
  }
`;

const DeleteButton = styled.button`
  flex: 1; /* Ocupa el espacio disponible */
  padding: 8px;
  background-color:  #a41717;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  
  &:hover {
    background-color:#a41717;
    color: #0b0b0b;
  }
`;

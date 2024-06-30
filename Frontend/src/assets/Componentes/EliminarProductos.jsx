import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const URL = "http://127.0.0.1:5000/";

//Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
//const URL = "https://USUARIO.pythonanywhere.com/";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #edece3;
  position: relative;
`;

const LogoCentrado = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Header = styled.header`
  width: 100%;
  background-color: #333;
  padding: 10px 0;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
`;

const LogoNav = styled.img`
  height: 40px;
`;

const MainTitle = styled.h1`
  margin: 20px 0;
`;

const ProductTable = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
  }

  td {
    text-align: right;
  }
`;

const CenteredContainer = styled.div`
  margin: 20px 0;
`;

const DeleteButton = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

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
      <Header>
        <NavBar>
          <LogoNav src="./static/imagenes/logos-nav.webp" alt="logo agencia de aprendizaje" />
        </NavBar>
      </Header>
      <LogoCentrado>
        <img src="./static/imagenes/logo_Codo.jpg" alt="logo" />
      </LogoCentrado>
      <MainTitle>Eliminar Productos del Inventario</MainTitle>
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
      <CenteredContainer>
        <a href="index.html">Menu principal</a>
      </CenteredContainer>
    </Container>
  );
};



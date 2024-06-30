import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from './../estilos/EstilosGenerales';
import { Link } from 'react-router-dom';

export const ListadoProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const URL = "http://127.0.0.1:5000/";

        // Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
        //const URL = "https://USUARIO.pythonanywhere.com/";

        fetch(URL + 'productos')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener los productos.');
                }
            })
            .then(data => setProductos(data))
            .catch(error => alert('Error al obtener los productos.'));
    }, []);

    return (
        <Container>
            <Header>
                <Nav>
                    <LogoNav src="./static/imagenes/logos-nav.webp" alt="logo agencia de aprendizaje" />
                </Nav>
            </Header>

            <LogoCentrado>
                <LogoCodo src="./static/imagenes/logo_Codo.jpg" alt="logo" />
            </LogoCentrado>
            <h1>Listado de Productos del Inventario</h1><br />

            <ProductosContainer>
                {productos.map(producto => (
                    <ProductoCard key={producto.codigo}>
                        <ProductoImagen 
                            src={`http://127.0.0.1:5000/static/imagenes/${producto.imagen_url}`} 
                            alt="Imagen del producto" 
                        />
                        <ProductoDetalle>
                            <strong>Código:</strong> {producto.codigo}<br />
                            <strong>Descripción:</strong> {producto.descripcion}<br />
                            <strong>Cantidad:</strong> {producto.cantidad}<br />
                            <strong>Precio:</strong> {producto.precio}<br />
                            <strong>Proveedor:</strong> {producto.proveedor}
                        </ProductoDetalle>
                    </ProductoCard>
                ))}
            </ProductosContainer><br />

            <ContenedorCentrado>
                <StyledLink to="/admin">Administrador</StyledLink>
            </ContenedorCentrado>
        </Container>
    );
};

// Estilos específicos para ListadoProductos
const Header = styled.header`
  width: 100%;
  background-color: #333;
  padding: 1rem 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoNav = styled.img`
  max-width: 150px;
`;

const LogoCentrado = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

const LogoCodo = styled.img`
  max-width: 200px;
`;

const ProductosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductoCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProductoImagen = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
`;

const ProductoDetalle = styled.div`
  margin-top: 1rem;
`;

const ContenedorCentrado = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
  }
`;

import React, { useState, useEffect } from 'react';
import { Container, Titulo, BotonContenedor, LinkBoton } from './../estilos/EstilosGenerales';
import { Buscador } from './Buscador';
import styled from 'styled-components';

export const ListadoProductos = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    const URL = "https://Roli325.pythonanywhere.com/"; // <--- Agregado: URL ahora está fuera de las funciones para evitar repetición

    const obtenerProductos = async () => {
        try {
            const response = await fetch(URL + 'productos');
            if (!response.ok) {
                throw new Error('Error al obtener los productos. Código de error: ' + response.status);
            }
            const data = await response.json();
            setProductos(data);
            setError(null);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            setError('Error al obtener los productos. Verifica la consola para más detalles.');
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    const buscarProductos = async (nombre) => {
        if (!nombre) { // <--- Modificación: Si el nombre está vacío, se llama a obtenerProductos
            obtenerProductos();
            return;
        }

        try {
            const response = await fetch(`${URL}productos/buscar?nombre=${nombre}`);
            if (!response.ok) {
                throw new Error('Error al buscar los productos. Código de error: ' + response.status);
            }
            const data = await response.json();
            setProductos(data);
            setError(null);
        } catch (error) {
            console.error('Error al buscar los productos:', error);
            setError('Error al buscar los productos. Verifica la consola para más detalles.');
        }
    };

    return (
        <Container>
            <Titulo>Listado de Productos</Titulo><br />
          
            <Buscador onBuscar={buscarProductos} />

            <ProductosContainer>
                {error ? (
                    <MensajeError>{error}</MensajeError>
                ) : (
                    productos.map(producto => (
                        <ProductoCard key={producto.codigo}>
                            <ProductoImagen 
                                src={`https://www.pythonanywhere.com/user/Roli325/files/home/Roli325/mysite/static/imagenes/${producto.imagen_url}`} 
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
                    ))
                )}
            </ProductosContainer><br />

            <BotonContenedor>
                <LinkBoton to="/admin">Administrador</LinkBoton>
            </BotonContenedor>
        </Container>
    );
};


// Estilos específicos para ListadoProductos
const ProductosContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
`;

const ProductoCard = styled.div`
    border: 1px solid #ddd;
    padding: 1rem;
    background-color: rgba(54, 54, 52, 0.8);
    color: white;
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

const MensajeError = styled.p`
    color: red;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
`;

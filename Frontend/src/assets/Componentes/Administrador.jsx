import React from 'react';
import styled from 'styled-components';
import { Container } from '../estilos/EstilosGenerales';
import { Link, Outlet } from 'react-router-dom'; // Importa Link desde react-router-dom


export const Administrador = () => {
  return (
    <Container>
      <h1>Administrador</h1><br />

      <StyledTable>
        <tbody>
          <tr>
            <td className="contenedor-centrado">
              <LinkButton to="/altas">Alta de productos</LinkButton>
            </td>
          </tr>
          <tr>
            <td className="contenedor-centrado">
              <LinkButton to="/listado">Listado de productos</LinkButton>
            </td>
          </tr>
          <tr>
            <td className="contenedor-centrado">
              <LinkButton to="/modificaciones">Modificar datos de productos</LinkButton>
            </td>
          </tr>
          <tr>
            <td className="contenedor-centrado">
              <LinkButton to="/eliminar">Eliminar productos</LinkButton>
            </td>
          </tr>
        </tbody>
      </StyledTable>
  
    </Container>
  );
};

const StyledTable = styled.table`
  max-width: 90%;
  margin: 0 auto;
  padding: 20px;
  background-color: #232225;
  border: 1px solid lightslategray;
  border-radius: 5px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);

  tbody {
    /* Estilos adicionales para el cuerpo de la tabla si es necesario */
  }

  td.contenedor-centrado {
    display: flex;
    justify-content: center;
  }
`;

const LinkButton = styled(Link)`
  display: block;
  padding: 15px 30px; /* Ajuste el padding según sea necesario */
  margin: 10px; /* Ajuste el margin según sea necesario */
  background-color: #fdab13;
  color: #1d1a39;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  font-weight: 800;

  &:hover {
    background-color: #1d1a39;
    color: #fdab13;
  }

  @media (max-width: 768px) {
    padding: 12px 24px; /* Ajuste de padding para pantallas más pequeñas */
    font-size: 14px; /* Ajuste de tamaño de fuente para pantallas más pequeñas */
  }
`;

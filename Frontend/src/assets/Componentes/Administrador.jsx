import React from 'react';
import styled from 'styled-components';
import { Container, Titulo } from '../estilos/EstilosGenerales';
import { Link} from 'react-router-dom'; 


export const Administrador = () => {
  return (
    <Container>
      <Titulo>Administrador</Titulo><br />

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
  background-color:rgba(54, 54, 52, 0.8);
  border: 1px solid lightslategray;
  border-radius: 5px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);

  tbody {
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
  background-color: #1B2631;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  font-weight: 800;

  &:hover {
    background-color: white;
    color:black;
  }

  @media (max-width: 768px) {
    padding: 12px 24px; /* Ajuste de padding para pantallas más pequeñas */
    font-size: 14px; /* Ajuste de tamaño de fuente para pantallas más pequeñas */
  }
`;

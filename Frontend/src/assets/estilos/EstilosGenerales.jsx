import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh ;
  background-color: #C0C0C0;
  position: relative;


`;
export const Titulo=styled.h1`

  margin: 1.5rem 0;
  color: #1B2631;

`;
export const BotonContenedor = styled.div`
  display: flex;
  justify-content: space-between; /* Espacio uniforme entre los botones */
  gap: 1%; 
`;

export const SubmitBoton = styled.button`
  flex: 1; /* Ocupa el espacio disponible */
  padding: 12px;
  background-color:  #1B2631;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  
  &:hover {
    background-color:white;
    color: black;
  }
`;

export const LinkBoton = styled(Link)`
  flex: 1; /* Ocupa el espacio disponible */
  padding: 12px;
  background-color:  #1B2631;
  color: #fff;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background-color:white;
    color:black;
  }
`;

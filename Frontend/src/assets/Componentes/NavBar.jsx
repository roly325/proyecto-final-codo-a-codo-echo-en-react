import styled from 'styled-components';
import { BotonHamburguesa } from './BotonHamburguesa';
import { useState } from 'react';
import logonav  from '../imagenes/logo.png'
import { Link } from 'react-router-dom';


export const NavBar = () => {

  const [clicked, setClicked] = useState(false);
  console.log(clicked)// probando si cambian los estados en consola..

  const handleClick = () => {
    //cuando esta true lo pasa a false y viceversa 
    setClicked(!clicked)
  }

  const cerrarMenu = () => {
    setClicked(false)
  }

  return (
    <NavContainer>
      <img src={logonav} alt="As" className="logo" />
      
      <div className={`Links ${clicked ? 'active' : ''}`}>
        <Link onClick={cerrarMenu} to="/">prueba</Link>  
        <Link onClick={cerrarMenu} to="/admin">Administrador</Link>  
      </div>
    
      <div className='burguer'>
        <BotonHamburguesa clicked={clicked} handleClick={handleClick} />
      </div>
      
      <BgDiv className={`initial ${clicked ? 'active' : ''}`}></BgDiv>
    </NavContainer>

  )
};

///estilos del nav 

const NavContainer = styled.nav`
  padding: 0.4rem;
  background-color: #263238;

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 12vh;

  @media (max-width: 768px) {
    height: 10vw;
  }

  .logo {
    width: 10%;
    height: auto;
    margin-right: 2%;
    margin-left: 4%;
    z-index: 2;
  }

  a {
    color: #ffffff;
    text-decoration: none;
    margin-right: 1rem;
  }

  .Links {
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all 0.3s ease;
    z-index: 2;

    a {
      color: #90a4ae;
      font-size: 2rem;
      display: block;
    }

    a:hover {
      font-weight: bold;
    }

    @media (min-width: 768px) {
      position: initial;
      margin: 0;

      a {
        font-size: 1.2rem;
        color: white;
        display: inline;
      }
    }
  }

  .Links.active {
    z-index: 2;
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 15%;
    left: 0;
    right: 0;
    text-align: center;

    a {
      font-size: 2rem;
      margin-top: 1rem;
      color: #ffffff;
    }

    a:hover {
      font-weight: bold;
    }
  }

  .burguer {
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const BgDiv = styled.div`
  background-color: rgba(54, 54, 52, 0.8);
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: all 0.6s ease;

  &.active {
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 85%;
    z-index: 1;
  }
`;
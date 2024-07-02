import React from 'react';
import styled from 'styled-components';
import { Container, Titulo,BotonContenedor,LinkBoton,SubmitBoton } from '../estilos/EstilosGenerales';

export const Altas = () => {
  // const URL = "http://127.0.0.1:5000/";
  const URL = "https://Roli325.pythonanywhere.com/";


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch(URL + 'productos', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al agregar el producto.');
      }
    })
    .then(data => {
      alert('Producto agregado correctamente.');
      // Limpiar campos del formulario
      event.target.reset();
    })
    .catch(error => {
      console.error('Error al agregar el producto:', error);
      alert('Error al agregar el producto. Verifica la consola para más detalles.');
    });
    
  };

  return (
    <Container>
      <Titulo>Cargar Productos</Titulo>
      <FormWrapper>
        <form id="formulario" onSubmit={handleSubmit} encType="multipart/form-data">
          <Label htmlFor="descripcion">Descripción:</Label>
          <Input type="text" id="descripcion" name="descripcion" required />

          <Label htmlFor="cantidad">Cantidad:</Label>
          <Input type="number" id="cantidad" name="cantidad" required />

          <Label htmlFor="precio">Precio:</Label>
          <Input type="number" step="0.01" id="precio" name="precio" required />

          <Label htmlFor="imagenProducto">Imagen del producto:</Label>
          <Input type="file" id="imagenProducto" name="imagen" />

          <Label htmlFor="proveedorProducto">Proveedor:</Label>
          <Input type="text" id="proveedorProducto" name="proveedor" />

          <BotonContenedor>
            <SubmitBoton type="submit">Agregar Producto</SubmitBoton>
            <LinkBoton to="/admin">ADMINISTRADOR</LinkBoton>
          </BotonContenedor>
        </form>
      </FormWrapper>
    </Container>
  );
};


const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(54, 54, 52, 0.8);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: white;
`;

const Input = styled.input`
  width: calc(100% - 20px); /* Resta 20px del padding para compensar el margen del botón */
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;




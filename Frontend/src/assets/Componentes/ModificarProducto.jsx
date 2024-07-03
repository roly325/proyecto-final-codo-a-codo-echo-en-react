import React, { useState } from 'react';
import { Container, SubmitBoton, Titulo, LinkBoton, BotonContenedor } from './../estilos/EstilosGenerales';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  background: rgba(54, 54, 52, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 0.25rem;
  font-weight: bold;
  color: white;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #999;
  border-radius: 5px;
  width: 85%;
  max-width: 300px;
`;
const ProductData = styled.div`
  text-align: center;
  margin:auto;
  width: 100%;
  max-width: 500px;
;

`;

const Image = styled.img`
  max-width: 210px;
  display: block;
  margin: 1.5rem 0;
`;
``


export const ModificarProducto = () => {
  const URL = "https://Roli325.pythonanywhere.com/";
  // const URL = "http://127.0.0.1:5000/";


  // Variables de estado para controlar la visibilidad y los datos del formulario
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [imagenUrlTemp, setImagenUrlTemp] = useState(null);
  const [mostrarDatosProducto, setMostrarDatosProducto] = useState(false);

  const obtenerProducto = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}productos/${codigo}`);
      if (!response.ok) throw new Error('Error al obtener los datos del producto.');

      const data = await response.json();
      setDescripcion(data.descripcion);
      setCantidad(data.cantidad);
      setPrecio(data.precio);
      setProveedor(data.proveedor);
      setImagenUrl(data.imagen_url);
      setMostrarDatosProducto(true);
    } catch (error) {
      alert('Código no encontrado.');
    }
  };

  const seleccionarImagen = (event) => {
    const file = event.target.files[0];
    setImagenSeleccionada(file);
    setImagenUrlTemp(URL.createObjectURL(file));
  };

  const guardarCambios = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('codigo', codigo);
    formData.append('descripcion', descripcion);
    formData.append('cantidad', cantidad);
    formData.append('proveedor', proveedor);
    formData.append('precio', precio);

    if (imagenSeleccionada) {
      formData.append('imagen', imagenSeleccionada, imagenSeleccionada.name);
    }

    try {
      const response = await fetch(`${URL}productos/${codigo}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Error al guardar los cambios del producto.');

      await response.json();
      alert('Producto actualizado correctamente.');
      limpiarFormulario();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el producto.');
    }
  };

  const limpiarFormulario = () => {
    setCodigo('');
    setDescripcion('');
    setCantidad('');
    setPrecio('');
    setProveedor('');
    setImagenUrl('');
    setImagenSeleccionada(null);
    setImagenUrlTemp(null);
    setMostrarDatosProducto(false);
  };

  return (
    <Container>
      <Titulo>Modificar Productos</Titulo><br />

      <div id="app">
        <Form id="form-obtener-producto" onSubmit={obtenerProducto}>
          <Label htmlFor="codigo">Código:</Label>
          <Input
            type="text"
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          /><br />

          <BotonContenedor>
            <SubmitBoton type="submit">MODIFICAR PRODUCTO</SubmitBoton>
            <LinkBoton to="/">ADMINISTRADOR</LinkBoton>
          </BotonContenedor>
        </Form>

        {mostrarDatosProducto && (

          <ProductData id="datos-producto">
            <Titulo>Datos del Producto</Titulo>
            <Form id="form-guardar-cambios" onSubmit={guardarCambios}>
              <Label htmlFor="descripcionModificar">Descripción:</Label>
              <Input
                type="text"
                id="descripcionModificar"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              /><br />

              <Label htmlFor="cantidadModificar">Cantidad:</Label>
              <Input
                type="number"
                id="cantidadModificar"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              /><br />

              <Label htmlFor="precioModificar">Precio:</Label>
              <Input
                type="number"
                step="0.01"
                id="precioModificar"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              /><br />

              <Image
                id="imagen-actual"
                // src={imagenUrl && !imagenSeleccionada ? `http://127.0.0.1:5000/static/imagenes/${imagenUrl}` : ''}
                src={imagenUrl && !imagenSeleccionada ? `https://www.pythonanywhere.com/user/Roli325/files/home/Roli325/mysite/static/imagenes/${imagenUrl}` : ''}

                style={{ display: imagenUrl && !imagenSeleccionada ? 'block' : 'none' }}
                alt="Imagen actual del producto"
              />

              <Image
                id="imagen-vista-previa"
                src={imagenUrlTemp || ''}
                style={{ display: imagenUrlTemp ? 'block' : 'none' }}
                alt="Vista previa de la nueva imagen"
              />

              <Label htmlFor="nuevaImagen">Nueva Imagen:</Label>
              <Input type="file" id="nuevaImagen" onChange={seleccionarImagen} /><br />

              <Label htmlFor="proveModificar">Proveedor:</Label>
              <Input
                type="number"
                id="proveModificar"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
                required
              /><br />
              <BotonContenedor>

                <SubmitBoton type="submit">GUARDAR CAMBIOS</SubmitBoton>
                <LinkBoton to="/">CANCELAR</LinkBoton>

              </BotonContenedor>
            </Form>
          </ProductData>
        )}
      </div>
    </Container>
  );
};

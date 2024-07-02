import React, { useState } from 'react';
import styled from 'styled-components';

export const Buscador = ({ onBuscar }) => {
    const [nombre, setNombre] = useState('');

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setNombre(newValue);
        onBuscar(newValue); // Llamar a la función onBuscar cada vez que se actualiza el valor del input
    };

    return (
        <FormWrapper>
            <Label htmlFor="nombre">Buscar Producto:</Label>
            <Input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={handleInputChange}
            />
        </FormWrapper>
    );
};

const FormWrapper = styled.div`
    max-width: 600px;
    margin: 0 auto;
    background-color: rgba(54, 54, 52, 0.8);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
    margin-bottom: 20px;
`;

const Label = styled.label`
    text-align: center;
    display: block;
    margin-bottom: 8px;
    color: white;
`;

const Input = styled.input`
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

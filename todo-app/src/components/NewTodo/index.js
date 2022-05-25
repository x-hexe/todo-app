import React from 'react';
import {Container} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import Form from '../Form'

const NewTodo = ({ handleFunction }) => {
    const navigate = useNavigate();

    const handleForm = (data) => {
        handleFunction(data)
        navigate('/');
    }

    return (
        <Container className="mt-4 mb-4">
            <h1>Agregar nueva nota</h1>
            <Form
                handleForm={handleForm}
            />
        </Container>
    );
};

export default NewTodo;
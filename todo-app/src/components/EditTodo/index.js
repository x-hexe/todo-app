import React, {useContext} from 'react';
import {Container} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";
import TodoContext from "../../contexts/TodoContext";
import Form from "../Form"

const EditTodo = ({ handleFunction }) => {
    const todos = useContext(TodoContext);
    const navigate = useNavigate();
    const { todoId } = useParams();

    const handleForm = (data) => {
        handleFunction(todoId, data)
        navigate('/');
    }

    return (
        <Container className="mt-4 mb-4">
            <h1>Editar nota N° {todoId}
            </h1>
            <Form
                initialValues={todos[ todoId ]}
                handleForm={handleForm}
            />
        </Container>
    );
};

export default EditTodo;
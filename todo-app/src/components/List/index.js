import { useState, useContext } from 'react';
import {Button, Container, Row, Col, Form, Stack} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import useForceRender from '../../hooks/useForceRenderHook';
import TodoContext from '../../contexts/TodoContext';
import {
    PRIORITY_HIGH_ID,
    PRIORITY_MEDIUM_ID,
    PRIORITY_LOW_ID,
    PRIORITY_HIGH_TEXT,
    PRIORITY_MEDIUM_TEXT,
    PRIORITY_LOW_TEXT,
    STATUS_TO_DO_ID,
    STATUS_TO_DO_TEXT,
    STATUS_IN_PROGRESS_ID,
    STATUS_IN_PROGRESS_TEXT,
    STATUS_DONE_ID,
    STATUS_DONE_TEXT
} from '../../constants/todoConstants';

const Filter = ({ filtersChange }) => {
    const [filters, setFilters] = useState({});

    const changeFilter = (type, value) => {
        filters[ type ] = value;
        setFilters(filters);
        filtersChange(filters);
    };

    const resetFilter = () => {
        setFilters({});
        filtersChange({});
    };

    return (
        <>
            <h5 className="mt-4">Filtrar por</h5>
            <Row>
                <Col>
                    <Form.Label>
                        Prioridad
                    </Form.Label>
                    <Form.Select
                        value={filters?.priority ?? ''}
                        onChange={(event) => changeFilter('priority', event.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value={PRIORITY_HIGH_ID}>{PRIORITY_HIGH_TEXT}</option>
                        <option value={PRIORITY_MEDIUM_ID}>{PRIORITY_MEDIUM_TEXT}</option>
                        <option value={PRIORITY_LOW_ID}>{PRIORITY_LOW_TEXT}</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Label>
                        Estado
                    </Form.Label>
                    <Form.Select
                        value={filters?.status ?? ''}
                        onChange={(event) => changeFilter('status', event.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value={STATUS_TO_DO_ID}>{STATUS_TO_DO_TEXT}</option>
                        <option value={STATUS_IN_PROGRESS_ID}>{STATUS_IN_PROGRESS_TEXT}</option>
                        <option value={STATUS_DONE_ID}>{STATUS_DONE_TEXT}</option>
                    </Form.Select>
                </Col>
            </Row>

            <div className="mb-5">
                <Button
                    className="btn btn-danger btn-sm mt-3"
                    onClick={resetFilter}
                >
                    Resetear filtros
                </Button>
            </div>
        </>
    );
};

const Item = ({ id, title, status, priority, description, handleDelete }) => {
    const navigate = useNavigate();

    const translatePriority = (id) => {
        if (id === PRIORITY_HIGH_ID) {
            return PRIORITY_HIGH_TEXT;
        } else if (id === PRIORITY_MEDIUM_ID) {
            return PRIORITY_MEDIUM_TEXT;
        } else if (id === PRIORITY_LOW_ID) {
            return PRIORITY_LOW_TEXT;
        }
    };

    const translateStatus = (id) => {
        if (id === STATUS_TO_DO_ID) {
            return STATUS_TO_DO_TEXT;
        } else if (id === STATUS_IN_PROGRESS_ID) {
            return STATUS_IN_PROGRESS_TEXT;
        } else if (id === STATUS_DONE_ID) {
            return STATUS_DONE_TEXT;
        }
    };

    return (
        <div className="card margin-bottom mt-4">
            <h5 className="card-header">
                <div className="card-header-flex">
                    <span className="id">{`#${id}`}</span>
                </div>
            </h5>
            <div className="card-body">
                <div className="card-text">
                    <div className="card-body-flex">
                        <p>{`Título: ${title}`}</p>
                        <p>{`Estado : ${translateStatus(status)}`}</p>
                        <p>{`Prioridad: ${translatePriority(priority)}`}</p>
                        <p>{`Descripción: ${description}`}</p>
                    </div>
                </div>
                <div className="mt-3">
                    <Stack direction="horizontal" gap={2}>
                        <Button
                            className="ml-5"
                            variant="outline-primary"
                            onClick={() => navigate(`/edit-todo/${id}`)}
                        >
                            Editar
                        </Button>
                        <Button
                            className="ml-5"
                            variant="outline-danger"
                            onClick={() => handleDelete(id)}
                        >
                            Eliminar
                        </Button>
                    </Stack>
                </div>
            </div>
        </div>
    );
};

const List = ({ handleFunction }) => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({});
    const forceRender = useForceRender();
    let todos = useContext(TodoContext);

    const handleFilter = (values) => {
        setFilters(values);
        forceRender();
    }

    const handleDelete = (id) => {
        handleFunction(id);
        forceRender();
    }

    if (filters.priority || filters.status) {
        todos = todos.filter((todo) => {
            if (filters.priority && filters.status) {
                return todo.priority.includes(filters.priority) &&
                    todo.status.includes(filters.status)
            } else if (filters.priority) {
                return todo.priority.includes(filters.priority)
            } else {
                return todo.status.includes(filters.status)
            }
        });
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="mt-4 mb-4">Listado de tareas</h1>
                </Col>
                <Col md={{ span: 4, offset: 4 }}>
                    <Button className="mt-4 mb-4" variant="primary" onClick={() => navigate('/new-todo')}>
                        Crear nueva tarea
                    </Button>
                </Col>
            </Row>

            <Filter filtersChange={handleFilter} />

            {
                todos.map((todo, index) => (
                    <Item
                        key={index}
                        id={index}
                        handleDelete={handleDelete}
                        {...todo}
                    />
                ))
            }

        </Container>
    );
}

export default List;
import React from 'react';
import {Form as FormBootstrap, Button, Row, Col} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from "yup";
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

const Form = ({ handleForm, initialValues = {} }) => {

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'El texto debe contener más de 2 caracteréres')
            .max(50, 'El texto debe contener menos de 50 caracteréres')
            .required('Ingrese un título válido'),

        status: Yup.string()
            .required('Seleccione un valor'),

        priority: Yup.string()
            .required('Seleccione un valor'),

        description: Yup.string()
            .min(10, 'El texto debe contener más de 10 caracteréres')
            .max(800, 'El texto debe contener menos de 800 caracteréres')
            .required('Ingrese una descripción válida'),
        });

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleForm}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <FormBootstrap onSubmit={handleSubmit}>
                    <Row>
                        <Col md={4} xs={12}>
                            <FormBootstrap.Group className="mb-3">
                                <FormBootstrap.Label>Título</FormBootstrap.Label>
                                <FormBootstrap.Control
                                    name="title"
                                    type="text"
                                    placeholder="Ingrese un título"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.title && !errors.title}
                                />
                            </FormBootstrap.Group>
                            <p className="text-danger">{errors.title}</p>
                        </Col>
                        <Col md={4} xs={12}>
                            <FormBootstrap.Label>Prioridad</FormBootstrap.Label>
                            <FormBootstrap.Select
                                name="priority"
                                className="mb-3"
                                value={values.priority}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.priority && !errors.priority}
                            >
                                <option value="">Selecciona uno</option>
                                <option value={PRIORITY_HIGH_ID}>{PRIORITY_HIGH_TEXT}</option>
                                <option value={PRIORITY_MEDIUM_ID}>{PRIORITY_MEDIUM_TEXT}</option>
                                <option value={PRIORITY_LOW_ID}>{PRIORITY_LOW_TEXT}</option>
                            </FormBootstrap.Select>
                            <p className="text-danger">{errors.priority}</p>
                        </Col>
                        <Col md={4} xs={12}>
                            <FormBootstrap.Label>Estado</FormBootstrap.Label>
                            <FormBootstrap.Select
                                name="status"
                                className="mb-3"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.status && !errors.status}
                            >
                                <option value="">Selecciona uno</option>
                                <option value={STATUS_TO_DO_ID}>{STATUS_TO_DO_TEXT}</option>
                                <option value={STATUS_IN_PROGRESS_ID}>{STATUS_IN_PROGRESS_TEXT}</option>
                                <option value={STATUS_DONE_ID}>{STATUS_DONE_TEXT}</option>
                            </FormBootstrap.Select>
                            <p className="text-danger">{errors.status}</p>
                        </Col>
                    </Row>
                    <FormBootstrap.Group className="mb-3">
                        <FormBootstrap.Label>Descripción</FormBootstrap.Label>
                        <FormBootstrap.Control
                            name="description"
                            as="textarea"
                            rows={6}
                            placeholder="Ingrese una descripción"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.description && !errors.description}
                        />
                    </FormBootstrap.Group>
                    <p className="text-danger">{errors.description}</p>

                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Button
                                className="mb-3"
                                variant="primary"
                                type="submit"
                                disabled={!isValid}
                            >
                                Guardar
                            </Button>
                        </Col>
                    </Row>
                </FormBootstrap>
            )}
        </Formik>
    );
};

export default Form;
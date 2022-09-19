import React, { } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Input, FormGroup, Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addReply } from '../../../services/tweets-service';

const validationSchema = Yup.object().shape({
    text: Yup.string()
        .max(144, 'No more than 144 characters!')
        .required('Required'),
    tag: Yup.string()
        .max(50, 'No more than 50 characters'),
});

export default function CreateReplyForm({ tweetId }) {
    const userName = useSelector((state) => state.auth.userName);

    const dispatch = useDispatch();

    const onSubmit = async (values, actions) => {        
        dispatch(addReply(
            values,
            userName,
            tweetId,
            () => {
                actions.resetForm({
                    values: {
                        text: '',
                        tag: '',
                    },
                });
            })
        );
    }

    return (
        <Card>
            <CardBody>
                <CardSubtitle
                    className="mb-2"
                >
                    Add reply
                </CardSubtitle>
                <Formik
                    initialValues={{
                        text: '',
                        tag: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ }) => (
                        <Form>
                            <FormGroup>
                                <Field
                                    name="text">
                                    {({ field }) => (
                                        <Input {...field} type="textarea" placeholder="text" />
                                    )}
                                </Field>
                                <ErrorMessage name="text" component="div" />
                            </FormGroup>
                            <FormGroup>
                                <Field
                                    type="text"
                                    name="tag">
                                    {({ field }) => (
                                        <Input {...field} type="text" placeholder="tag" />
                                    )}
                                </Field>
                                <ErrorMessage name="tag" component="div" />
                            </FormGroup>
                            <Button
                                type="submit"
                                color="primary"
                                outline
                            >
                                Add
                            </Button>
                            <Button
                                type="reset"
                                color="primary"
                                className="ms-3"
                                outline
                            >
                                Cancel
                            </Button>
                        </Form>
                    )}
                </Formik>
            </CardBody>
        </Card>
    );
}

CreateReplyForm.propTypes = {
    tweetId: PropTypes.string
};
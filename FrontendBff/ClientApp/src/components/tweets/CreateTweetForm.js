import React, { } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Input, FormGroup, Button } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createTweet } from '../../services/tweets-service';

const validationSchema = Yup.object().shape({
    text: Yup.string()
        .max(144, 'No more than 144 characters!')
        .required('Required'),
    tag: Yup.string()
        .max(50, 'No more than 50 characters'),
});

export default function CreateTweetForm({ onCreateComplete }) {
    const userName = useSelector((state) => state.auth.userName);

    const dispatch = useDispatch();

    const onSubmit = async (values, actions) => {
        dispatch(createTweet(
            values,
            userName,
            () => {
                actions.resetForm({
                    values: {
                        text: '',
                        tag: '',
                    },
                });
                onCreateComplete();
            })
        );
    }

    return (
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
    );
}

CreateTweetForm.defaultProps = {
    onCreateComplete: () => { }
};

CreateTweetForm.propTypes = {
    onCreateComplete: PropTypes.func,
};

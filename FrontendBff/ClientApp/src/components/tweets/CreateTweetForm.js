import React, { } from 'react';
import PropTypes from 'prop-types';

import { Input, FormGroup, Button } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthUser } from '../../services/authService';

const validationSchema = Yup.object().shape({
    text: Yup.string()
        .max(144, 'No more than 144 characters!')
        .required('Required'),
    tag: Yup.string()
        .max(50, 'No more than 50 characters'),
});

export default function CreateTweetForm({ onCreateComplete }) {
    const { username } = useAuthUser();

    const onSubmit = async (values, actions) => {
        console.log(values);

        var req = new Request(`write/api/v1.0/tweets/${username}/add`, {
            method: 'POST',
            body: JSON.stringify({
                text: values.text,
                tag: values.tag
            }),
            headers: new Headers({
                "X-CSRF": "1",
                'Content-Type': 'application/json',
            }),
        });

        try {
            var resp = await fetch(req);

            if (resp.ok) {
                await resp.json();

                actions.resetForm({
                    values: {
                        text: '',
                        tag: '',
                    },
                });

                onCreateComplete();
            }
        } catch (e) {
            console.log("error calling remote API");
        }
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

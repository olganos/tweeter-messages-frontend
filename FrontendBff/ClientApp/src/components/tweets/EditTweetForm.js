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
});

export default function EditTweetForm({ onEditComplete, tweet }) {
    const { username } = useAuthUser();

    const initFormValues = {
        text: tweet.text,
    };

    const onSubmit = async (values, actions) => {
        var req = new Request(`write/api/v1.0/tweets/${username}/update/${tweet.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                text: values.text
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
                    values: initFormValues,
                });

                onEditComplete();
            }
        } catch (e) {
            console.log("error calling remote API");
        }
    }

    return (
        <Formik
            initialValues={initFormValues}
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
                    <Button
                        type="submit"
                        color="primary"
                        outline
                    >
                        Save
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

EditTweetForm.defaultProps = {
    onEditComplete: () => { }
};

EditTweetForm.propTypes = {
    onEditComplete: PropTypes.func,
    tweet: PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string
    }),
};

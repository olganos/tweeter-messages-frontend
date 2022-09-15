import React, { } from 'react';
import { Input, FormGroup, Button, Card, CardHeader, CardBody, CardSubtitle } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthUser } from '../../../services/authService';

const validationSchema = Yup.object().shape({
    text: Yup.string()
        .max(144, 'No more than 144 characters!')
        .required('Required'),
    tag: Yup.string()
        .max(50, 'No more than 50 characters'),
});

export default function CreateReplyForm({ tweetId }) {
    const { username } = useAuthUser();

    const onSubmit = async (values, actions) => {
        console.log(values);
        var req = new Request(`write/api/v1.0/tweets/${username}/reply/${tweetId}`, {
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

            let data;
            if (resp.ok) {
                data = await resp.json();
            }
            actions.resetForm({
                values: {
                    text: '',
                    tag: '',
                },
            });
        } catch (e) {
            console.log("error calling remote API");
        }
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
                                //disabled={isSubmitting}
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

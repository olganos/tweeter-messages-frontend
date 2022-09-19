import React, { } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Input, FormGroup, Button } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { editTweet } from '../../services/tweets-service';

const validationSchema = Yup.object().shape({
    text: Yup.string()
        .max(144, 'No more than 144 characters!')
        .required('Required'),
});

export default function EditTweetForm({ onEditComplete, tweet }) {
    const userName = useSelector((state) => state.auth.userName);

    const dispatch = useDispatch();

    const initFormValues = {
        text: tweet.text,
    };

    const onSubmit = async (values) => {
        dispatch(editTweet(
            values,
            userName,
            tweet.id,            
            () => {
                onEditComplete();
            })
        );
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

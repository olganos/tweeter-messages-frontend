import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { TrashIcon } from '@primer/octicons-react'
import { Button, Modal, ModalFooter, ModalBody } from 'reactstrap';
import { deleteTweet } from '../../services/tweets-service';

export default function DeleteTweet({ tweetId, userName }) {
    const dispatch = useDispatch();

    const [confirmationOpen, setIsConfirmationOpen] = useState(false);

    const toggleConfirmation = () => setIsConfirmationOpen(!confirmationOpen);

    const onDeleteTweet = async () => {
        dispatch(deleteTweet(
            userName,
            tweetId,
            () => {
                toggleConfirmation();
            }));
    }

    return (
        <>
            <Button
                color="primary"
                outline
                size="sm"
                className="me-1"
                onClick={toggleConfirmation}
            >
                <TrashIcon size={16} />
            </Button>
            <Modal
                isOpen={confirmationOpen}
                toggle={toggleConfirmation}
            >
                <ModalBody>
                    Are you sure?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onDeleteTweet}>
                        Yes
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleConfirmation}>
                        No
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

DeleteTweet.propTypes = {
    tweetId: PropTypes.string,
    userName: PropTypes.string,
};
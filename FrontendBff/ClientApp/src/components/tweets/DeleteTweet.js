import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TrashIcon } from '@primer/octicons-react'
import { Button, Modal, ModalFooter, ModalBody } from 'reactstrap';

export default function DeleteTweet({ tweetId, userName }) {
    const [confirmationOpen, setIsConfirmationOpen] = useState(false);

    const toggleConfirmation = () => setIsConfirmationOpen(!confirmationOpen);

    const deleteTweet = async () => {
        var req = new Request(`write/api/v1.0/tweets/${userName}/delete/${tweetId}`, {
            method: 'DELETE',
            headers: new Headers({
                "X-CSRF": "1",
            }),
        });

        try {
            var resp = await fetch(req);

            if (resp.ok) {
                //await resp.json();
                toggleConfirmation();
            }
        } catch (e) {
            console.log("error calling remote API");
        }
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
                    <Button color="primary" onClick={deleteTweet}>
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
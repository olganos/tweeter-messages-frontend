import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { PencilIcon } from '@primer/octicons-react'
import EditTweetForm from '../tweets/EditTweetForm';

// todo: there is an error. This is because of library
export default function EditTweetModal({ tweet }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Button
                color="primary"
                outline
                size="sm"
                className="me-1"
                onClick={toggle}
            >
                <PencilIcon size={16} />
            </Button>
            <Modal
                isOpen={isOpen}
                toggle={toggle}
                backdrop="static"
            >
                <ModalHeader toggle={toggle}>Edit tweet</ModalHeader>
                <ModalBody>
                    <EditTweetForm
                        onCreateComplete={toggle}
                        tweet={tweet}
                    />
                </ModalBody>
            </Modal>
        </>
    );
}

EditTweetModal.propTypes = {
    tweet: PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string
    }),
};

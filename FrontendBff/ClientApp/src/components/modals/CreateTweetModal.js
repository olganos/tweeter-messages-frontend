import { useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { CommentIcon } from '@primer/octicons-react'
import CreateTweetForm from '../tweets/CreateTweetForm';

// todo: there is an error. This is because of library
export default function CreateTweetModal() {
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
                <CommentIcon size={16} />
            </Button>
            <Modal
                isOpen={isOpen}
                toggle={toggle}
                backdrop="static"
            >
                <ModalHeader toggle={toggle}>Add tweet</ModalHeader>
                <ModalBody>
                    <CreateTweetForm
                        onCreateComplete={toggle}
                    />
                </ModalBody>
            </Modal>
        </>
    );
}

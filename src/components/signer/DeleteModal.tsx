import { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import SignerAPI from '../../api/Signer';

interface IProps {
    id: string;
    toastSuccessFunc: () => void;
    toastErrorFunc: () => void;
    refreshFunc: () => void;
}

function SignerDeleteModal(props: IProps): JSX.Element {
    const [show, setShow] = useState<Boolean>(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [loading, setLoading] = useState<Boolean>(false);
    
    const deleteButton = <Button variant="danger" size="sm" onClick={handleShow}><i className="fa fa-trash-o"></i> DELETE</Button>;

    function deleteSigner() {
        console.log("On delete signer: ", props.id);

        setLoading(true);
        SignerAPI.delete(props.id)
            .then((response) => {
                console.log("On success add signer: ", response);
                setLoading(false);
                setShow(false);
                props.toastSuccessFunc();
                props.refreshFunc();
            }, (error) => {
                console.log("On error add signer: ", error);
                setLoading(false);
                setShow(false);
                props.toastErrorFunc();
            });
    };
    
    return (
        <>
            {deleteButton}

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Hapus Penandatangan SPT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center">Apakah anda yakin?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="" onClick={handleClose}>
                        BATAL
                    </Button>
                    <Button variant="danger" type="submit" disabled={loading ? true : false} onClick={deleteSigner}>
                        {loading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                        /> : <span>HAPUS</span>}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SignerDeleteModal;
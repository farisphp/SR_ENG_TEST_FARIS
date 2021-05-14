import { useState, useEffect } from 'react';
import { Button, Modal, Container, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import SignerAPI from '../../api/Signer';
import { formatNPWP } from '../../utils/FormatNPWP';

interface ISignerData {
    id: string;
    npwp: string;
    name: string;
    signatory: string;
    statusTaxpayer: string;
    defaultSignatory: boolean;
}

interface IProps {
    signerData? : ISignerData;
    toastSuccessFunc: () => void;
    toastErrorFunc: () => void;
    refreshFunc: () => void;
}

function SignerModal(props: IProps): JSX.Element {
    const [show, setShow] = useState<Boolean>(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [loading, setLoading] = useState<Boolean>(false);
    
    const addButton = <Button variant="danger" size="sm" onClick={handleShow}><i className="fa fa-plus"></i> TAMBAH</Button>;
    const editButton = <Button variant="danger" size="sm" onClick={handleShow}><i className="fa fa-edit"></i> EDIT</Button>;

    const initialState: ISignerData = {
        id: props.signerData ? props.signerData.id : "",
        npwp: props.signerData ? props.signerData.npwp : "",
        name: props.signerData ? props.signerData.name : "",
        signatory: props.signerData ? props.signerData.signatory : "",
        statusTaxpayer: props.signerData ? props.signerData.statusTaxpayer : "",
        defaultSignatory: props.signerData ? props.signerData.defaultSignatory : false
    };

    const { onChangeNPWP, onChange, onCheck, onSubmit, values } = useForm(
        submitSignerCallback,
        initialState
    );

    async function submitSignerCallback() {
        let submitValue = values;
        submitValue.npwp = values.npwp.split(/[\.-]/).join("");

        setLoading(true);
        if (props.signerData){
            SignerAPI.update(props.signerData.id, submitValue)
                .then((response) => {
                    console.log("On success update signer: ", response);
                    setLoading(false);
                    setShow(false);
                    props.toastSuccessFunc();
                    props.refreshFunc();
                }, (error) => {
                    console.log("On error update signer: ", error);
                    setLoading(false);
                    setShow(false);
                    props.toastErrorFunc();
                });
            console.log("On submit edit: ", submitValue);
        } else {
            SignerAPI.create(submitValue)
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
            console.log("On submit signer: ", submitValue);
        }
    };

    useEffect(() => {
        if (show && props.signerData) {
            console.log("On signer modal: ", props.signerData);
        }
    }, [show]);
    
    return (
        <>
            {props.signerData ? editButton : addButton}

            <Modal size="lg" show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Tambah Penandatangan SPT</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Container>
                            <p style={{fontStyle: 'italic'}}>* Field wajib diisi</p>
                            
                                <Form.Group as={Row} controlId="formNPWP" className="pb-3">
                                    <Form.Label column sm="4"> NPWP * </Form.Label>
                                    <Col sm="8">
                                        <Form.Control 
                                            type="text" placeholder="__.___.___._-___.___" minLength={20}
                                            maxLength={20} value={formatNPWP(values.npwp)} name="npwp" 
                                            onChange={onChangeNPWP} required
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formName" className="pb-3">
                                    <Form.Label column sm="4"> Nama Penandatangan SPT * </Form.Label>
                                    <Col sm="8">
                                        <Form.Control 
                                            type="text" placeholder="Nama Penandatangan SPT" 
                                            name="name" value={values.name} onChange={onChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formSignatory" className="pb-3">
                                    <Form.Label column sm="4"> Bertindak sebagai * </Form.Label>
                                    <Col sm="8">
                                        <Form.Check 
                                            inline label="Wajib Pajak" name="signatory" type="radio" 
                                            id="formSignatory-1" value="TAXPAYER" 
                                            checked={values.signatory === "TAXPAYER" ? true : false} onChange={onChange}
                                            required
                                        />
                                        <Form.Check 
                                            inline label="Kuasa" name="signatory" type="radio" 
                                            id="formSignatory-2" value="AUTHORIZED_REPRESENTATIVE" 
                                            checked={values.signatory === "AUTHORIZED_REPRESENTATIVE" ? true : false} onChange={onChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formStatusTax" className="pb-3">
                                    <Form.Label column sm="4"> Status Wajib Pajak * </Form.Label>
                                    <Col sm="8">
                                        <Form.Check 
                                            inline label="Aktif" name="statusTaxpayer" 
                                            type="radio" id="formStatusTax-1" value="ACTIVE" 
                                            checked={values.statusTaxpayer === "ACTIVE" ? true : false} onChange={onChange}
                                            required
                                        />
                                        <Form.Check 
                                            inline label="Tidak Aktif" name="statusTaxpayer" 
                                            type="radio" id="formStatusTax-2" value="NOT_ACTIVE" 
                                            checked={values.statusTaxpayer === "NOT_ACTIVE" ? true : false} onChange={onChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formDefault" className="pb-3">
                                    <Col>
                                        <Form.Check type="checkbox" label="Jadikan sebagai default *" name="defaultSignatory" checked={values.defaultSignatory} onChange={onCheck}/>
                                    </Col>
                                </Form.Group>
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            BATAL
                        </Button>
                        <Button variant="danger" type="submit">
                            {loading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                            /> : <span>SIMPAN</span>}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default SignerModal;
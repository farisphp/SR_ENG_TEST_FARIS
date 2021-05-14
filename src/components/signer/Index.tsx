import * as React from 'react';
import './Signer.css';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Card, Table, Spinner } from 'react-bootstrap';
import SignerModal from './Modal';
import SignerDeleteModal from './DeleteModal';
import SignerAPI from '../../api/Signer';
import { formatNPWP } from '../../utils/FormatNPWP';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ISigner {
    id : string;
    npwp: string;
    name: string;
    signatory: string;
    statusTaxpayer: string;
    defaultSignatory: boolean;
}

interface IState {
    signers: ISigner[];
    loading: boolean;
}

class Index extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { 
            signers: [],
            loading: false
        }
    }

    public componentDidMount(): void {
        this.getSigners();
    }

    getSigners(): void {
        this.setState({ loading: true });
        SignerAPI.get()
            .then((response) => {
                console.log("On success get signer: ", response);
                this.setState({
                    loading: false,
                    signers: response.data.data
                })
            }, (error) => {
                console.log("On error get signer: ", error);
                this.setState({
                    loading: false
                })
                this.setToast("error", "Gagal terhubung ke server");
            });
    }

    setToast(type: string, message: string): void {
        if (type === "success"){
            toast.success(message, {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if (type === "error"){
            toast.error(message, {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    public render() {
        const signers = this.state.signers;
        const loading = this.state.loading;
        return (
            <Container className="p-3">
                <h2 className="header">Penandatangan SPT</h2>
                <Card>
                    <Card.Body>
                        <Card.Text className="d-flex justify-content-between align-items-center">
                            Tambah dan edit daftar Penandatangan SPT Anda
                            <SignerModal 
                                toastSuccessFunc={this.setToast.bind(this, "success", "Berhasil menambahkan")}
                                toastErrorFunc={this.setToast.bind(this, "error", "Gagal menambahkan")}
                                refreshFunc={this.getSigners.bind(this)}
                            />
                        </Card.Text>
                        
                        <Table bordered hover responsive>
                            <thead className="table-head">
                                <tr>
                                    <th>NPWP</th>
                                    <th>Nama</th>
                                    <th>Sebagai</th>
                                    <th>Status</th>
                                    <th>Default</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {signers && signers.map((signer: ISigner ) => (
                                <tr key={signer.npwp}>
                                    <td>{formatNPWP(signer.npwp)}</td>
                                    <td>{signer.name}</td>
                                    <td>{signer.signatory === "TAXPAYER" ? "Wajib Pajak" : "Kuasa"}</td>
                                    <td>{signer.statusTaxpayer  === "ACTIVE" ? "Aktif" : "Tidak Aktif"}</td>
                                    <td>{signer.defaultSignatory ? "Ya" : "Tidak"} </td>
                                    <td>
                                        <SignerModal 
                                            signerData={signer} 
                                            toastSuccessFunc={this.setToast.bind(this, "success", "Berhasil memperbarui")}
                                            toastErrorFunc={this.setToast.bind(this, "error", "Gagal memperbarui")}
                                            refreshFunc={this.getSigners.bind(this)}
                                        />{" "}
                                        <SignerDeleteModal 
                                            id={signer.id} 
                                            toastSuccessFunc={this.setToast.bind(this, "success", "Berhasil menghapus")}
                                            toastErrorFunc={this.setToast.bind(this, "error", "Gagal menghapus")}
                                            refreshFunc={this.getSigners.bind(this)}
                                        />
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>

                        {loading ? 
                            <div className="text-center">
                                <Spinner animation="grow" size="sm" />
                                {" "}<span>Loading</span>
                            </div>
                        : ""}

                    </Card.Body>
                </Card>

                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Container>
        )
    }
}

export default Index;
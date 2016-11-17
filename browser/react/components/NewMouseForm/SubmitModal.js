import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

export default class EuthanizeModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: true
        }
        this.close = this.close.bind(this);
    }

    close() {
        this.props.changeEuth();
        this.setState({ showModal: false });
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Euthanize Alert</Modal.Title>
                    </Modal.Header>
                    <Image src="http://www.i2symbol.com/images/symbols/signs/skull_and_crossbones_u2620_icon_128x128.png" />
                    <Modal.Body>
                        <h4>Unable to enroll mouse</h4>
                        <p>There are currently no experimental arms that require animals of this genotype. You may prune this mouse from the colony.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
};

import React, { Component } from 'react';
import { Button, Popover, OverlayTrigger, Col } from 'react-bootstrap';
import SingleMouseDetail from './SingleMouseDetail';

export default class SingleMouse extends Component {
    render () {
        const {mouse, reportDeath} = this.props
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Animal death">
                <strong>Are you sure?</strong> This action cannot be undone.
            </Popover>
        )

        return (
            <div>
                {mouse.arm ? <h4> Mouse is enrolled in the following experimental arm: {mouse.arm.genotype} + {mouse.arm.treatment} </h4> : ''}
                <SingleMouseDetail mouse={mouse} />
                <Col xs={4}>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
                        <Button
                            bsSize='small'
                            className="btn btn-primary"
                            onClick={() => reportDeath(mouse.id)}>
                            Report death
                        </Button>
                    </OverlayTrigger>
                </Col>
            </div>
        )
    }
}

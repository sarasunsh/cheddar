import React, { Component } from 'react';
import { Col, Button, ListGroupItem, ListGroup} from 'react-bootstrap';
import moment from 'moment';

export default class SingleMouse extends Component {

  render () {
    const {mouse } = this.props
    return (
        <div className="card">
          <img className="card-img-top" src='http://www-tc.pbs.org/wgbh/nova/assets/img/genes-behavior/image-03-small.jpg' alt="Card image cap"/>
          <Col xs={4} className="card-block">
            <h4 className="card-title">ID#{ mouse.id }</h4>
              <ListGroup className="card-text">
                <ListGroupItem>Genotype: { mouse.genotype }</ListGroupItem>
                <ListGroupItem>Gender: { mouse.gender }</ListGroupItem>
                <ListGroupItem>DOB: {moment(mouse.birthdate).format("MM/DD/ YYYY")}</ListGroupItem>
              </ListGroup>
          </Col>
        </div>
    )
  }
}

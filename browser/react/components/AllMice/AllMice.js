import React from 'react';
import moment from "moment";
import { Link } from 'react-router';
import { Well, Button, Table, Col } from 'react-bootstrap';

export default class AllMice extends React.Component {
  render() {
    return (
        <div>
        <Col xs={6} xsPull={4} xsPush={2}>
          <h3>Current colony</h3>
          <Table striped bordered condensed hover >
            <thead>
              <tr>
                <th>ID</th>
                <th>Genotype</th>
                <th>Gender</th>
                <th>DOB</th>
              </tr>
            </thead>
            <tbody>
              {this.props.mice.map(mouse => (
                  <tr key={mouse.id}>
                    <td>
                        <Link to={`/mice/${mouse.id}`}>
                            #{ mouse.id }
                        </Link>
                    </td>
                    <td>{mouse.genotype}</td>
                    <td>{mouse.gender}</td>
                    <td>{moment(mouse.birthdate).format("MM/DD/ YYYY")}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
          </Col>
        </div>
    )
  }
}

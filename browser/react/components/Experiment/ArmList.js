import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Well, Button, Glyphicon, Table, Col } from 'react-bootstrap';
import { removeArm } from '../../ducks/experiment';


class ArmList extends Component {

  render() {

    const cssBrandOrange = {
        background: '#f2e3d7'
    }

    return (
      <Well className="clearfix">
        <div>
          <h3>Experimental Design</h3>
          <h4> Myostatin Inhibition in Combination with SMN Upregulation </h4>
          <Col xs={6} >
          <Table striped bordered condensed hover style={cssBrandOrange}>
            <thead>
              <tr>
                <th>Study Arm</th>
                <th>Genotype</th>
                <th>Treatment</th>
                <th>Enrollment Target</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {this.props.exptArms.map( (arm, idx) => (
                  <tr key={arm.id}>
                    <td> {idx+1} </td>
                    <td>{arm.genotype}</td>
                    <td>{arm.treatment}</td>
                    <td>{arm.goal}</td>
                    <td>
                      <Button
                        bsSize="xsmall"
                        bsStyle="danger"
                        className="btn btn-default"
                        className="glyphicon glyphicon-remove"
                        onClick={() => this.props.deleteArm(arm.id)}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
          </Col>
        </div>
      </Well>
    )
  }
}

const mapStateToProps = function(state) {
    return {
        exptArms: state.exptArms
    }
}

const mapDispatchToProps = function(dispatch) {
  return {
    deleteArm: function(deletedArmID) {
        const action = removeArm(deletedArmID);
        dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArmList);


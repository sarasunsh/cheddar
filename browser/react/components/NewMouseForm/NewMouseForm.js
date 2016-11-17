import React from 'react';
import SubmitModalContainer from './SubmitModalContainer';
import {Col} from 'react-bootstrap';

export default function (props) {
  return (
    <Col xs={8}>
    <div className="well">
      <form className="form-horizontal" onSubmit={props.handleSubmit}>
        <fieldset>
          <legend>New Mouse</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label" >Gender</label>
            <div className="col-xs-10">
              <input
                className="form-control"
                type="radio"
                checked={props.genderText==='male'}
                value='male'
                onChange={props.handleGenderChange}
              /> Male
            <input
                className="form-control"
                type="radio"
                onChange={props.handleGenderChange}
                checked={props.genderText==='female'}
                value='female'
              /> Female
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-2 control-label">Genotype</label>
            <div className="col-xs-10">
              <input
                className="form-control"
                type="text"
                onChange={props.handleGenotypeChange}
                value={props.genotypeText}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-2 control-label">Date of Birth</label>
            <div className="col-xs-10">
              <input
                className="form-control"
                type="date"
                value={props.dob}
                readOnly
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button
                type="submit"
                className="btn btn-success"
                disabled={props.invalid}>
                Create Mouse
            </button>
            {props.euth ? <SubmitModalContainer genotype={props.genotypeText}/> : ''}
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    </Col>
  );
}

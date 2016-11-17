import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from'react-redux';
import SubmitModal from './SubmitModal';

import { toggleEuthanize } from '../../ducks/euthanize';

const mapStateToProps = function(state){
    return {
        euthanize: state.euthanize
    }
}

const mapDispatchToProps = function (dispatch) {
  return {
    changeEuth: function() {
        const action = toggleEuthanize();
        dispatch(action);
    }
  }
};

const SubmitModalContainer = connect(null, mapDispatchToProps)(SubmitModal);
export default SubmitModalContainer;

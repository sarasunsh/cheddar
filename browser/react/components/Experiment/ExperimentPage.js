import React, { Component } from 'react';
import ExperimentFormContainer from './ExperimentFormContainer';
import ArmListContainer from './ArmList';
import {Row, Col} from 'react-bootstrap';


export default function ExperimentPage() {
    return (
        <div>
            <ArmListContainer />
            <ExperimentFormContainer />
        </div>
    )
}




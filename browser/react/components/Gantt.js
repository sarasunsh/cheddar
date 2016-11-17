/* global ga */

import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


// const data = [
//       {name: 'SMA+Vehicle', Enrolled: 3, Remaining: 2},
//       {name: 'SMA+Drug', Enrolled: 2, Remaining: 3},
//       {name: 'WT+Vehicle', Enrolled: 1, Remaining: 4},
//       {name: 'WT+Drug', Enrolled: 2, Remaining: 3}
// ];

const data = [
      {name: 'Arm1', Enrolled: 3, Remaining: 2},
      {name: 'Arm2', Enrolled: 2, Remaining: 3},
      {name: 'Arm3', Enrolled: 1, Remaining: 4},
      {name: 'Arm4', Enrolled: 2, Remaining: 3}
];

export default class Gantt extends Component {

    render() {
        return (
          <Col xs={8} xsPull={2} xsPush={2}>
              <h4 className='text-center'>Enrollment Progress</h4>
              <BarChart layout="vertical" width={600} height={300} data={data}
                margin={{top: 20, right: 100, left: 20, bottom: 5}}>
                <XAxis  type="number" label="# of mice"/>
                <YAxis dataKey="name" type="category"/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="Remaining" stackId="a" fill="#8884d8" />
                <Bar dataKey="Enrolled" stackId="a" fill="#82ca9d" />
              </BarChart>
          </Col>
        )
    }
}
